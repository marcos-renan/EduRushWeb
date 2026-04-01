<?php

namespace App\Repositories\Contracts;

use App\Models\Trail;
use Illuminate\Support\Collection;

interface TrailRepositoryInterface
{
    /**
     * @return Collection<int, Trail>
     */
    public function getActiveWithSubjectAndLessons(): Collection;

    /**
     * @return Collection<int, Trail>
     */
    public function getActiveByGradeWithSubjectAndLessons(int $gradeYear): Collection;

    /**
     * @return Collection<int, Trail>
     */
    public function getActiveBySubjectAndGradeWithLessons(int $subjectId, int $gradeYear): Collection;

    public function findActiveBySlug(string $slug): ?Trail;
}
