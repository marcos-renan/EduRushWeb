<?php

namespace App\Services\Api;

use App\Exceptions\InsufficientEnergyException;
use App\Models\Trail;
use App\Models\StudentProfile;
use App\Models\User;
use App\Repositories\Contracts\LessonProgressRepositoryInterface;
use App\Repositories\Contracts\QuestionRepositoryInterface;
use App\Repositories\Contracts\StudentProfileRepositoryInterface;
use App\Repositories\Contracts\TrailRepositoryInterface;
use App\Services\StudentEnergyService;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StudentQuestionApiService
{
    public function __construct(
        private readonly QuestionRepositoryInterface $questions,
        private readonly StudentProfileRepositoryInterface $profiles,
        private readonly TrailRepositoryInterface $trails,
        private readonly LessonProgressRepositoryInterface $lessonProgress,
        private readonly StudentEnergyService $energyService,
    ) {
    }

    /**
     * @return array{
     *     data: array{
     *         lesson: array<string, mixed>,
     *         questions: array<int, array<string, mixed>>
     *     },
     *     meta: array{total_questions: int}
     * }
     */
    public function listByLessonSlugForUser(User $user, string $lessonSlug): array
    {
        $lesson = $this->questions->findActiveLessonWithQuestionsBySlug($lessonSlug);
        $student = $this->profiles->forUser($user);

        if (
            ! $lesson
            || ! $lesson->trail?->is_active
            || (int) $lesson->trail->grade_year !== (int) $student->grade_year
        ) {
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

        $questions = $lesson->questions
            ->map(fn ($question): array => [
                'external_id' => $question->external_id,
                'position' => $question->position,
                'prompt' => $question->prompt,
                'options' => $question->options,
                'correct_option' => (int) $question->correct_option,
                'explanation' => $question->explanation,
                'xp_reward' => $question->xp_reward,
            ])
            ->values();

        return [
            'data' => [
                'lesson' => [
                    'external_id' => $lesson->external_id,
                    'title' => $lesson->title,
                    'slug' => $lesson->slug,
                    'objective' => $lesson->objective,
                    'difficulty' => $lesson->difficulty,
                    'trail' => [
                        'external_id' => $lesson->trail?->external_id,
                        'title' => $lesson->trail?->title,
                        'slug' => $lesson->trail?->slug,
                        'grade_year' => (int) ($lesson->trail?->grade_year ?? 1),
                    ],
                ],
                'questions' => $questions->all(),
                'student_profile' => $this->studentProfilePayload($student),
            ],
            'meta' => [
                'total_questions' => $questions->count(),
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function studentProfilePayload(StudentProfile $profile): array
    {
        $this->energyService->refresh($profile);

        return [
            'external_id' => $profile->external_id,
            'grade_year' => (int) $profile->grade_year,
            'level' => (int) $profile->level,
            'total_xp' => (int) $profile->total_xp,
            'current_streak' => (int) $profile->current_streak,
            ...$this->energyService->payload($profile),
        ];
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
