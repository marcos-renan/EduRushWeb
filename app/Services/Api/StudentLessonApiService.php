<?php

namespace App\Services\Api;

use App\Exceptions\InsufficientEnergyException;
use App\Models\Trail;
use App\Models\User;
use App\Repositories\Contracts\LessonProgressRepositoryInterface;
use App\Repositories\Contracts\QuestionRepositoryInterface;
use App\Repositories\Contracts\StudentProfileRepositoryInterface;
use App\Repositories\Contracts\TrailRepositoryInterface;
use App\Services\GamificationService;
use App\Services\StudentEnergyService;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StudentLessonApiService
{
    private const PASS_SCORE = 50;

    public function __construct(
        private readonly QuestionRepositoryInterface $questions,
        private readonly StudentProfileRepositoryInterface $profiles,
        private readonly TrailRepositoryInterface $trails,
        private readonly LessonProgressRepositoryInterface $lessonProgress,
        private readonly GamificationService $gamificationService,
        private readonly StudentEnergyService $energyService,
    ) {
    }

    /**
     * @param  array<int, array{question_external_id: string, selected_option: int}>  $answers
     * @return array{
     *     data: array{
     *         lesson: array<string, mixed>,
     *         quiz: array<string, int>,
     *         progress: array<string, mixed>,
     *         student_profile: array<string, mixed>,
     *         completed_missions: array<int, array<string, mixed>>,
     *         unlocked_badges: array<int, array<string, mixed>>
     *     }
     * }
     */
    public function submitAttempt(User $user, string $lessonSlug, array $answers): array
    {
        $lesson = $this->questions->findActiveLessonWithQuestionsBySlug($lessonSlug);

        if (! $lesson || ! $lesson->trail?->is_active) {
            throw new ModelNotFoundException('Licao nao encontrada.');
        }

        $student = $this->profiles->forUser($user);

        if ((int) $lesson->trail->grade_year !== (int) $student->grade_year) {
            throw new ModelNotFoundException('Licao nao encontrada.');
        }

        $this->ensureTrailUnlockedForStudent($lesson->trail, (int) $student->id);

        if (! $this->energyService->hasEnergyToStartLesson($student)) {
            $nextRechargeAt = $this->energyService->payload($student)['energy_next_recharge_at'] ?? null;

            throw new InsufficientEnergyException(
                'Energia insuficiente. Aguarde a recarga para iniciar esta licao.',
                $nextRechargeAt
            );
        }

        $this->gamificationService->markLessonInProgress($student, $lesson);

        $answerMap = collect($answers)
            ->mapWithKeys(fn (array $answer): array => [
                (string) $answer['question_external_id'] => (int) $answer['selected_option'],
            ])
            ->all();

        $missionHighlights = [];
        $badgeHighlights = [];
        $correctAnswers = 0;
        $answeredQuestions = 0;
        $questionXpEarned = 0;

        foreach ($lesson->questions as $question) {
            $selectedOption = $answerMap[$question->external_id] ?? null;

            if ($selectedOption === null) {
                continue;
            }

            $optionsCount = is_array($question->options) ? count($question->options) : 0;

            if ($selectedOption < 0 || $selectedOption >= $optionsCount) {
                continue;
            }

            $answeredQuestions++;
            $correctOption = (int) $question->correct_option;

            if ($selectedOption === $correctOption) {
                $correctAnswers++;
                $questionXpEarned += (int) $question->xp_reward;

                $resolution = $this->gamificationService->resolveQuestionError($student, (int) $question->id);
                $missionHighlights = $this->mergeMissionHighlights(
                    $missionHighlights,
                    $resolution['completed_missions'] ?? []
                );
                $badgeHighlights = $this->mergeBadgeHighlights(
                    $badgeHighlights,
                    $resolution['unlocked_badges'] ?? []
                );

                continue;
            }

            $this->gamificationService->recordQuestionError(
                $student,
                $lesson,
                (int) $question->id,
                $selectedOption,
                $correctOption
            );
        }

        $totalQuestions = $lesson->questions->count();
        $score = $totalQuestions > 0
            ? (int) round(($correctAnswers / $totalQuestions) * 100)
            : 100;

        $passed = $score >= self::PASS_SCORE;
        $result = $passed
            ? $this->gamificationService->completeLesson($student, $lesson, $score, $questionXpEarned)
            : $this->gamificationService->failLesson($student, $lesson, $score);
        $alreadyCompleted = (bool) ($result['already_completed'] ?? false);
        $freshStudent = $student->fresh() ?? $student;
        $energyDelta = $alreadyCompleted
            ? 0
            : $this->energyService->applyLessonOutcome($freshStudent, $passed);

        $missionHighlights = $this->mergeMissionHighlights($missionHighlights, $result['completed_missions'] ?? []);
        $badgeHighlights = $this->mergeBadgeHighlights($badgeHighlights, $result['unlocked_badges'] ?? []);

        $updatedStudent = $freshStudent->fresh() ?? $freshStudent;

        return [
            'data' => [
                'lesson' => [
                    'external_id' => $lesson->external_id,
                    'slug' => $lesson->slug,
                    'title' => $lesson->title,
                    'difficulty' => $lesson->difficulty,
                    'trail_grade_year' => (int) ($lesson->trail?->grade_year ?? 1),
                ],
                'quiz' => [
                    'total_questions' => $totalQuestions,
                    'answered_questions' => $answeredQuestions,
                    'correct_answers' => $correctAnswers,
                    'score' => $score,
                ],
                'progress' => [
                    'passed' => $passed,
                    'already_completed' => $alreadyCompleted,
                    'earned_xp' => (int) ($result['earned_xp'] ?? 0),
                    'energy_delta' => $energyDelta,
                ],
                'student_profile' => [
                    'external_id' => $updatedStudent->external_id,
                    'grade_year' => (int) $updatedStudent->grade_year,
                    'level' => (int) $updatedStudent->level,
                    'total_xp' => (int) $updatedStudent->total_xp,
                    'current_streak' => (int) $updatedStudent->current_streak,
                    ...$this->energyService->payload($updatedStudent),
                ],
                'completed_missions' => $missionHighlights,
                'unlocked_badges' => $badgeHighlights,
            ],
        ];
    }

    /**
     * @param  array<int, array<string, mixed>>  $current
     * @param  array<int, array<string, mixed>>  $incoming
     * @return array<int, array<string, mixed>>
     */
    private function mergeMissionHighlights(array $current, array $incoming): array
    {
        foreach ($incoming as $mission) {
            $title = (string) ($mission['title'] ?? '');

            if ($title === '') {
                continue;
            }

            $alreadyListed = collect($current)
                ->contains(fn (array $item): bool => ($item['title'] ?? null) === $title);

            if (! $alreadyListed) {
                $current[] = $mission;
            }
        }

        return $current;
    }

    /**
     * @param  array<int, array<string, mixed>>  $current
     * @param  array<int, array<string, mixed>>  $incoming
     * @return array<int, array<string, mixed>>
     */
    private function mergeBadgeHighlights(array $current, array $incoming): array
    {
        foreach ($incoming as $badge) {
            $name = (string) ($badge['name'] ?? '');

            if ($name === '') {
                continue;
            }

            $alreadyListed = collect($current)
                ->contains(fn (array $item): bool => ($item['name'] ?? null) === $name);

            if (! $alreadyListed) {
                $current[] = $badge;
            }
        }

        return $current;
    }

    private function ensureTrailUnlockedForStudent(Trail $trail, int $studentProfileId): void
    {
        $subjectTrails = $this->trails->getActiveBySubjectAndGradeWithLessons(
            (int) $trail->subject_id,
            (int) $trail->grade_year
        );
        $completedLessonIds = $this->lessonProgress->completedLessonIdsByStudentProfileId($studentProfileId);
        $completedLookup = array_fill_keys($completedLessonIds, true);
        $previousTrailCompleted = true;

        foreach ($subjectTrails as $subjectTrail) {
            $isUnlocked = $previousTrailCompleted;

            $lessonIds = $subjectTrail->lessons
                ->pluck('id')
                ->map(fn ($id): int => (int) $id)
                ->all();

            if (empty($lessonIds)) {
                $previousTrailCompleted = true;
            } else {
                $completedCount = 0;

                foreach ($lessonIds as $lessonId) {
                    if (isset($completedLookup[$lessonId])) {
                        $completedCount++;
                    }
                }

                $previousTrailCompleted = $completedCount === count($lessonIds);
            }

            if ((int) $subjectTrail->id === (int) $trail->id) {
                if (! $isUnlocked) {
                    throw new ModelNotFoundException('Licao nao encontrada.');
                }

                return;
            }
        }

        throw new ModelNotFoundException('Licao nao encontrada.');
    }
}
