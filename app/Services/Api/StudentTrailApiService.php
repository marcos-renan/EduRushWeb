<?php

namespace App\Services\Api;

use App\Models\Trail;
use App\Models\User;
use App\Repositories\Contracts\LessonProgressRepositoryInterface;
use App\Repositories\Contracts\StudentProfileRepositoryInterface;
use App\Repositories\Contracts\TrailRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StudentTrailApiService
{
    public function __construct(
        private readonly TrailRepositoryInterface $trails,
        private readonly StudentProfileRepositoryInterface $profiles,
        private readonly LessonProgressRepositoryInterface $lessonProgress,
    ) {
    }

    /**
     * @return array{data: array<int, array<string, mixed>>, meta: array<string, int>}
     */
    public function listForUser(User $user): array
    {
        $student = $this->profiles->forUser($user);
        $studentGradeYear = (int) $student->grade_year;
        $completedLessonIds = $this->lessonProgress->completedLessonIdsByStudentProfileId($student->id);

        $trails = $this->trails->getActiveByGradeWithSubjectAndLessons($studentGradeYear)
            ->values();
        $trailUnlockMap = $this->trailUnlockMap($trails, $completedLessonIds);

        $data = $trails
            ->map(fn (Trail $trail): array => $this->trailPayload($trail, $completedLessonIds, $trailUnlockMap))
            ->values()
            ->all();

        return [
            'data' => $data,
            'meta' => [
                'total_trails' => count($data),
            ],
        ];
    }

    /**
     * @return array{data: array<string, mixed>}
     */
    public function showForUser(User $user, string $trailSlug): array
    {
        $trail = $this->trails->findActiveBySlug($trailSlug);
        $student = $this->profiles->forUser($user);

        if (! $trail || (int) $trail->grade_year !== (int) $student->grade_year) {
            throw new ModelNotFoundException('Trilha nao encontrada.');
        }

        $completedLessonIds = $this->lessonProgress->completedLessonIdsByStudentProfileId($student->id);
        $subjectTrails = $this->trails->getActiveBySubjectAndGradeWithLessons((int) $trail->subject_id, (int) $trail->grade_year);
        $trailUnlockMap = $this->trailUnlockMap($subjectTrails, $completedLessonIds);
        $isUnlocked = (bool) ($trailUnlockMap[$trail->id] ?? false);

        if (! $isUnlocked) {
            throw new ModelNotFoundException('Trilha nao encontrada.');
        }

        return [
            'data' => $this->trailPayload($trail, $completedLessonIds, $trailUnlockMap),
        ];
    }

    /**
     * @param  array<int, int>  $completedLessonIds
     * @param  array<int, bool>  $trailUnlockMap
     * @return array<string, mixed>
     */
    private function trailPayload(Trail $trail, array $completedLessonIds, array $trailUnlockMap): array
    {
        $lessons = $trail->lessons
            ->map(function ($lesson) use ($completedLessonIds): array {
                $isCompleted = in_array($lesson->id, $completedLessonIds, true);
                $isLocked = $lesson->prerequisite_lesson_id !== null
                    && ! in_array((int) $lesson->prerequisite_lesson_id, $completedLessonIds, true);

                return [
                    'external_id' => $lesson->external_id,
                    'title' => $lesson->title,
                    'slug' => $lesson->slug,
                    'position' => $lesson->position,
                    'objective' => $lesson->objective,
                    'xp_reward' => $lesson->xp_reward,
                    'difficulty' => $lesson->difficulty,
                    'prerequisite_lesson_external_id' => $lesson->prerequisiteLesson?->external_id,
                    'is_completed' => $isCompleted,
                    'is_locked' => $isLocked,
                ];
            })
            ->values();
        $completedLessonsCount = $lessons->where('is_completed', true)->count();
        $lessonsCount = $lessons->count();
        $isCompleted = $lessonsCount > 0 && $completedLessonsCount === $lessonsCount;

        return [
            'external_id' => $trail->external_id,
            'title' => $trail->title,
            'slug' => $trail->slug,
            'description' => $trail->description,
            'grade_year' => (int) $trail->grade_year,
            'subject' => [
                'external_id' => $trail->subject?->external_id,
                'name' => $trail->subject?->name,
                'slug' => $trail->subject?->slug,
            ],
            'lessons_count' => $lessonsCount,
            'completed_lessons_count' => $completedLessonsCount,
            'is_completed' => $isCompleted,
            'is_locked' => ! (bool) ($trailUnlockMap[$trail->id] ?? false),
            'lessons' => $lessons,
        ];
    }

    /**
     * @param  Collection<int, Trail>  $trails
     * @param  array<int, int>  $completedLessonIds
     * @return array<int, bool>
     */
    private function trailUnlockMap(Collection $trails, array $completedLessonIds): array
    {
        $map = [];
        $completedLessonLookup = array_fill_keys($completedLessonIds, true);
        $groupedBySubject = $trails
            ->groupBy(fn (Trail $trail): int => (int) $trail->subject_id);

        foreach ($groupedBySubject as $subjectTrails) {
            $previousTrailCompleted = true;

            foreach ($subjectTrails->sortBy('position')->values() as $trail) {
                $isUnlocked = $previousTrailCompleted;
                $map[(int) $trail->id] = $isUnlocked;

                $lessonIds = $trail->lessons
                    ->pluck('id')
                    ->map(fn ($id): int => (int) $id)
                    ->all();

                if (empty($lessonIds)) {
                    $previousTrailCompleted = true;
                    continue;
                }

                $completedCount = 0;

                foreach ($lessonIds as $lessonId) {
                    if (isset($completedLessonLookup[$lessonId])) {
                        $completedCount++;
                    }
                }

                $previousTrailCompleted = $completedCount === count($lessonIds);
            }
        }

        return $map;
    }
}
