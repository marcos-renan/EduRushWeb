<?php

namespace App\Services;

use App\Models\Badge;
use App\Models\Lesson;
use App\Models\MissionTemplate;
use App\Models\StudentDailyActivity;
use App\Models\StudentLessonProgress;
use App\Models\StudentMission;
use App\Models\StudentProfile;
use App\Models\StudentQuestionError;
use Carbon\CarbonInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class GamificationService
{
    public function __construct(
        private readonly StudentEnergyService $energyService,
    ) {
    }

    public function markLessonInProgress(StudentProfile $student, Lesson $lesson): StudentLessonProgress
    {
        return DB::transaction(function () use ($student, $lesson): StudentLessonProgress {
            /** @var StudentLessonProgress $progress */
            $progress = StudentLessonProgress::query()->firstOrNew([
                'student_profile_id' => $student->id,
                'lesson_id' => $lesson->id,
            ]);

            if (! $progress->exists) {
                $progress->status = 'in_progress';
                $progress->score = 0;
                $progress->xp_earned = 0;
            }

            $progress->last_accessed_at = now();
            $progress->save();

            return $progress;
        });
    }

    /**
     * @return Collection<int, StudentMission>
     */
    public function ensureActiveMissions(StudentProfile $student): Collection
    {
        return DB::transaction(function () use ($student): Collection {
            return $this->prepareActiveMissions($student->id);
        });
    }

    /**
     * @return array{
     *     progress: StudentLessonProgress,
     *     earned_xp: int,
     *     already_completed: bool,
     *     completed_missions: array<int, array{title: string, reward_xp: int, mission_type: string}>,
     *     unlocked_badges: array<int, array{name: string, icon: string, color_hex: string}>
     * }
     */
    public function completeLesson(
        StudentProfile $student,
        Lesson $lesson,
        int $score,
        int $questionXpEarned
    ): array {
        return DB::transaction(function () use ($student, $lesson, $score, $questionXpEarned): array {
            $lockedStudent = $this->lockStudent($student->id);

            /** @var StudentLessonProgress $progress */
            $progress = StudentLessonProgress::query()->firstOrNew([
                'student_profile_id' => $lockedStudent->id,
                'lesson_id' => $lesson->id,
            ]);

            $alreadyCompleted = $progress->exists && $progress->status === 'completed';
            $earnedXp = 0;

            if (! $alreadyCompleted) {
                $earnedXp = $lesson->xp_reward + max(0, $questionXpEarned);
            }

            $progress->status = 'completed';
            $progress->score = max(0, min(100, $score));
            $progress->xp_earned = max((int) $progress->xp_earned, $earnedXp);
            $progress->last_accessed_at = now();
            $progress->completed_at ??= now();
            $progress->save();

            $completedMissions = [];

            if ($earnedXp > 0) {
                $this->applyXpGain($lockedStudent, $earnedXp, true);
            }

            if (! $alreadyCompleted) {
                $completedMissions = array_merge(
                    $this->incrementMissionMetric($lockedStudent, 'lessons_completed', 1),
                    $this->incrementMissionMetric($lockedStudent, 'xp_earned', $earnedXp)
                );
            }

            $newBadges = $this->unlockEligibleBadges($lockedStudent);

            return [
                'progress' => $progress,
                'earned_xp' => $earnedXp,
                'already_completed' => $alreadyCompleted,
                'completed_missions' => $completedMissions,
                'unlocked_badges' => $newBadges,
            ];
        });
    }

    /**
     * @return array{
     *     progress: StudentLessonProgress,
     *     earned_xp: int,
     *     already_completed: bool,
     *     completed_missions: array<int, array{title: string, reward_xp: int, mission_type: string}>,
     *     unlocked_badges: array<int, array{name: string, icon: string, color_hex: string}>
     * }
     */
    public function failLesson(StudentProfile $student, Lesson $lesson, int $score): array
    {
        return DB::transaction(function () use ($student, $lesson, $score): array {
            $lockedStudent = $this->lockStudent($student->id);

            /** @var StudentLessonProgress $progress */
            $progress = StudentLessonProgress::query()->firstOrNew([
                'student_profile_id' => $lockedStudent->id,
                'lesson_id' => $lesson->id,
            ]);

            $alreadyCompleted = $progress->exists && $progress->status === 'completed';

            if (! $alreadyCompleted) {
                $progress->status = 'failed';
            }

            $progress->score = max(0, min(100, $score));
            $progress->xp_earned = $alreadyCompleted ? (int) $progress->xp_earned : 0;
            $progress->last_accessed_at = now();
            $progress->save();

            return [
                'progress' => $progress,
                'earned_xp' => 0,
                'already_completed' => $alreadyCompleted,
                'completed_missions' => [],
                'unlocked_badges' => [],
            ];
        });
    }

    public function recordQuestionError(
        StudentProfile $student,
        Lesson $lesson,
        int $questionId,
        int $selectedOption,
        int $correctOption
    ): void {
        DB::transaction(function () use ($student, $lesson, $questionId, $selectedOption, $correctOption): void {
            $lockedStudent = $this->lockStudent($student->id);

            /** @var StudentQuestionError $error */
            $error = StudentQuestionError::query()->firstOrNew([
                'student_profile_id' => $lockedStudent->id,
                'question_id' => $questionId,
            ]);

            $error->lesson_id = $lesson->id;
            $error->attempts = $error->exists ? $error->attempts + 1 : 1;
            $error->last_selected_option = $selectedOption;
            $error->last_correct_option = $correctOption;
            $error->last_answered_at = now();
            $error->resolved_at = null;
            $error->save();
        });
    }

    /**
     * @return array{resolved: bool, completed_missions: array<int, array{title: string, reward_xp: int, mission_type: string}>, unlocked_badges: array<int, array{name: string, icon: string, color_hex: string}>}
     */
    public function resolveQuestionError(StudentProfile $student, int $questionId): array
    {
        return DB::transaction(function () use ($student, $questionId): array {
            $lockedStudent = $this->lockStudent($student->id);

            $error = StudentQuestionError::query()
                ->where('student_profile_id', $lockedStudent->id)
                ->where('question_id', $questionId)
                ->first();

            if (! $error || $error->resolved_at !== null) {
                return [
                    'resolved' => false,
                    'completed_missions' => [],
                    'unlocked_badges' => [],
                ];
            }

            $error->resolved_at = now();
            $error->last_answered_at = now();
            $error->save();

            $completedMissions = $this->incrementMissionMetric($lockedStudent, 'errors_resolved', 1);
            $newBadges = $this->unlockEligibleBadges($lockedStudent);

            return [
                'resolved' => true,
                'completed_missions' => $completedMissions,
                'unlocked_badges' => $newBadges,
            ];
        });
    }

    private function lockStudent(int $studentId): StudentProfile
    {
        /** @var StudentProfile $student */
        $student = StudentProfile::query()
            ->lockForUpdate()
            ->findOrFail($studentId);

        return $student;
    }

    private function updateStreak(StudentProfile $student): void
    {
        $today = now()->toDateString();
        $yesterday = now()->subDay()->toDateString();
        $lastActivity = optional($student->last_activity_date)?->toDateString();

        if ($lastActivity !== $today) {
            if ($lastActivity === $yesterday) {
                $student->current_streak += 1;
            } else {
                $student->current_streak = 1;
            }
        }

        $student->longest_streak = max($student->longest_streak, $student->current_streak);
        $student->last_activity_date = $today;
    }

    private function applyXpGain(StudentProfile $student, int $xp, bool $incrementLessonCount): void
    {
        if ($xp <= 0) {
            return;
        }

        $previousLevel = (int) $student->level;
        $this->updateStreak($student);
        $student->total_xp += $xp;
        $student->level = intdiv($student->total_xp, 100) + 1;
        $student->save();

        $newLevel = (int) $student->level;

        if ($newLevel > $previousLevel) {
            $this->energyService->grantLevelUpBonus($student, $newLevel - $previousLevel);
        }

        $today = now()->toDateString();

        /** @var StudentDailyActivity|null $activity */
        $activity = StudentDailyActivity::query()
            ->where('student_profile_id', $student->id)
            ->whereDate('activity_date', $today)
            ->first();

        if (! $activity) {
            $activity = StudentDailyActivity::query()->create([
                'student_profile_id' => $student->id,
                'activity_date' => $today,
                'xp_earned' => 0,
                'lessons_completed' => 0,
            ]);
        }

        $activity->xp_earned += $xp;

        if ($incrementLessonCount) {
            $activity->lessons_completed += 1;
        }

        $activity->save();
    }

    /**
     * @return Collection<int, StudentMission>
     */
    private function prepareActiveMissions(int $studentId): Collection
    {
        $today = now()->startOfDay();

        foreach ($this->missionBlueprints($today) as $blueprint) {
            StudentMission::query()->updateOrCreate(
                [
                    'student_profile_id' => $studentId,
                    'mission_key' => $blueprint['mission_key'],
                    'starts_on' => $blueprint['starts_on'],
                ],
                [
                    'mission_type' => $blueprint['mission_type'],
                    'title' => $blueprint['title'],
                    'description' => $blueprint['description'],
                    'metric' => $blueprint['metric'],
                    'target' => $blueprint['target'],
                    'reward_xp' => $blueprint['reward_xp'],
                    'ends_on' => $blueprint['ends_on'],
                ]
            );
        }

        return StudentMission::query()
            ->where('student_profile_id', $studentId)
            ->whereDate('starts_on', '<=', $today->toDateString())
            ->whereDate('ends_on', '>=', $today->toDateString())
            ->orderBy('mission_type')
            ->orderBy('title')
            ->get();
    }

    /**
     * @return array<int, array{title: string, reward_xp: int, mission_type: string}>
     */
    private function incrementMissionMetric(StudentProfile $student, string $metric, int $amount): array
    {
        if ($amount <= 0) {
            return [];
        }

        $missions = $this->prepareActiveMissions($student->id)
            ->where('metric', $metric)
            ->values();

        $completed = [];

        foreach ($missions as $mission) {
            $previous = (int) $mission->progress;
            $next = min((int) $mission->target, $previous + $amount);

            if ($next !== $previous) {
                $mission->progress = $next;
                $mission->save();
            }

            if ($mission->completed_at === null && $next >= (int) $mission->target) {
                $mission->completed_at = now();
                $mission->claimed_at = now();
                $mission->save();

                if ((int) $mission->reward_xp > 0) {
                    $this->applyXpGain($student, (int) $mission->reward_xp, false);
                }

                if ((string) $mission->mission_type === 'daily') {
                    $this->energyService->grantDailyGoalBonus($student);
                }

                $completed[] = [
                    'title' => $mission->title,
                    'reward_xp' => (int) $mission->reward_xp,
                    'mission_type' => (string) $mission->mission_type,
                ];
            }
        }

        return $completed;
    }

    /**
     * @return array<int, array{name: string, icon: string, color_hex: string}>
     */
    private function unlockEligibleBadges(StudentProfile $student): array
    {
        $badges = Badge::query()
            ->where('is_active', true)
            ->whereNotNull('unlock_metric')
            ->get();

        if ($badges->isEmpty()) {
            return [];
        }

        $completedLessons = StudentLessonProgress::query()
            ->where('student_profile_id', $student->id)
            ->where('status', 'completed')
            ->count();

        $resolvedErrors = StudentQuestionError::query()
            ->where('student_profile_id', $student->id)
            ->whereNotNull('resolved_at')
            ->count();

        $completedWeeklyMissions = StudentMission::query()
            ->where('student_profile_id', $student->id)
            ->where('mission_type', 'weekly')
            ->whereNotNull('claimed_at')
            ->count();

        $metrics = [
            'lessons_completed' => $completedLessons,
            'current_streak' => (int) $student->current_streak,
            'total_xp' => (int) $student->total_xp,
            'errors_resolved' => $resolvedErrors,
            'weekly_missions_completed' => $completedWeeklyMissions,
        ];

        $unlockedIds = $student->badges()->pluck('badges.id')->all();
        $newBadges = [];

        foreach ($badges as $badge) {
            $metric = (string) $badge->unlock_metric;
            $target = max(1, (int) $badge->unlock_target);

            if (! array_key_exists($metric, $metrics) || $metrics[$metric] < $target) {
                continue;
            }

            if (in_array($badge->id, $unlockedIds, true)) {
                continue;
            }

            $student->badges()->attach($badge->id, [
                'unlocked_at' => now(),
            ]);

            $unlockedIds[] = $badge->id;

            $newBadges[] = [
                'name' => (string) $badge->name,
                'icon' => (string) ($badge->icon ?? 'award'),
                'color_hex' => (string) $badge->color_hex,
            ];
        }

        return $newBadges;
    }

    /**
     * @return array<int, array{
     *     mission_key: string,
     *     mission_type: string,
     *     title: string,
     *     description: string,
     *     metric: string,
     *     target: int,
     *     reward_xp: int,
     *     starts_on: string,
     *     ends_on: string
     * }>
     */
    private function missionBlueprints(CarbonInterface $now): array
    {
        $templates = MissionTemplate::query()
            ->where('is_active', true)
            ->orderBy('mission_type')
            ->orderBy('title')
            ->get();

        if ($templates->isEmpty()) {
            $templates = collect($this->defaultMissionTemplates());
        }

        $dailyStart = $now->copy()->startOfDay();
        $dailyEnd = $now->copy()->endOfDay();
        $weeklyStart = $now->copy()->startOfWeek();
        $weeklyEnd = $now->copy()->endOfWeek();

        return $templates
            ->map(function ($template) use ($dailyStart, $dailyEnd, $weeklyStart, $weeklyEnd): ?array {
                $data = $template instanceof MissionTemplate ? $template->toArray() : $template;
                $missionType = (string) ($data['mission_type'] ?? '');

                if (! in_array($missionType, ['daily', 'weekly'], true)) {
                    return null;
                }

                $isDaily = $missionType === 'daily';

                return [
                    'mission_key' => (string) ($data['mission_key'] ?? ''),
                    'mission_type' => $missionType,
                    'title' => (string) ($data['title'] ?? ''),
                    'description' => (string) ($data['description'] ?? ''),
                    'metric' => (string) ($data['metric'] ?? ''),
                    'target' => max(1, (int) ($data['target'] ?? 1)),
                    'reward_xp' => max(0, (int) ($data['reward_xp'] ?? 0)),
                    'starts_on' => ($isDaily ? $dailyStart : $weeklyStart)->toDateString(),
                    'ends_on' => ($isDaily ? $dailyEnd : $weeklyEnd)->toDateString(),
                ];
            })
            ->filter(fn (?array $mission): bool => ! empty($mission['mission_key']))
            ->values()
            ->all();
    }

    /**
     * @return array<int, array{
     *     mission_key: string,
     *     mission_type: string,
     *     title: string,
     *     description: string,
     *     metric: string,
     *     target: int,
     *     reward_xp: int
     * }>
     */
    private function defaultMissionTemplates(): array
    {
        return [
            [
                'mission_key' => 'daily-lesson',
                'mission_type' => 'daily',
                'title' => 'Missao diaria: aquecimento',
                'description' => 'Conclua 1 licao hoje.',
                'metric' => 'lessons_completed',
                'target' => 1,
                'reward_xp' => 20,
            ],
            [
                'mission_key' => 'daily-xp',
                'mission_type' => 'daily',
                'title' => 'Missao diaria: energia',
                'description' => 'Ganhe 80 XP no dia.',
                'metric' => 'xp_earned',
                'target' => 80,
                'reward_xp' => 30,
            ],
            [
                'mission_key' => 'weekly-lessons',
                'mission_type' => 'weekly',
                'title' => 'Missao semanal: consistencia',
                'description' => 'Conclua 5 licoes na semana.',
                'metric' => 'lessons_completed',
                'target' => 5,
                'reward_xp' => 100,
            ],
            [
                'mission_key' => 'weekly-xp',
                'mission_type' => 'weekly',
                'title' => 'Missao semanal: turbo XP',
                'description' => 'Acumule 500 XP na semana.',
                'metric' => 'xp_earned',
                'target' => 500,
                'reward_xp' => 120,
            ],
            [
                'mission_key' => 'weekly-review',
                'mission_type' => 'weekly',
                'title' => 'Missao semanal: revisao',
                'description' => 'Resolva 3 erros pendentes.',
                'metric' => 'errors_resolved',
                'target' => 3,
                'reward_xp' => 80,
            ],
        ];
    }
}
