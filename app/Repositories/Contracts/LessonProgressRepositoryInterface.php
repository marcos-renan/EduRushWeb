<?php

namespace App\Repositories\Contracts;

interface LessonProgressRepositoryInterface
{
    /**
     * @return array<int, int>
     */
    public function completedLessonIdsByStudentProfileId(int $studentProfileId): array;
}
