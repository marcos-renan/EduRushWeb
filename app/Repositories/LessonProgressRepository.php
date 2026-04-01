<?php

namespace App\Repositories;

use App\Models\StudentLessonProgress;
use App\Repositories\Contracts\LessonProgressRepositoryInterface;

class LessonProgressRepository implements LessonProgressRepositoryInterface
{
    public function completedLessonIdsByStudentProfileId(int $studentProfileId): array
    {
        return StudentLessonProgress::query()
            ->where('student_profile_id', $studentProfileId)
            ->where('status', 'completed')
            ->pluck('lesson_id')
            ->all();
    }
}
