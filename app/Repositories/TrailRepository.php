<?php

namespace App\Repositories;

use App\Models\Trail;
use App\Repositories\Contracts\TrailRepositoryInterface;
use Illuminate\Support\Collection;

class TrailRepository implements TrailRepositoryInterface
{
    public function getActiveWithSubjectAndLessons(): Collection
    {
        return Trail::query()
            ->where('is_active', true)
            ->with([
                'subject:id,external_id,name,slug',
                'lessons' => fn ($query) => $query
                    ->where('is_active', true)
                    ->with('prerequisiteLesson:id,external_id')
                    ->orderBy('position'),
            ])
            ->orderBy('subject_id')
            ->orderBy('position')
            ->get();
    }

    public function findActiveBySlug(string $slug): ?Trail
    {
        return Trail::query()
            ->where('is_active', true)
            ->where('slug', $slug)
            ->with([
                'subject:id,external_id,name,slug',
                'lessons' => fn ($query) => $query
                    ->where('is_active', true)
                    ->with('prerequisiteLesson:id,external_id')
                    ->orderBy('position'),
            ])
            ->first();
    }

    public function getActiveByGradeWithSubjectAndLessons(int $gradeYear): Collection
    {
        return Trail::query()
            ->where('is_active', true)
            ->where('grade_year', $gradeYear)
            ->with([
                'subject:id,external_id,name,slug',
                'lessons' => fn ($query) => $query
                    ->where('is_active', true)
                    ->with('prerequisiteLesson:id,external_id')
                    ->orderBy('position'),
            ])
            ->orderBy('subject_id')
            ->orderBy('position')
            ->get();
    }

    public function getActiveBySubjectAndGradeWithLessons(int $subjectId, int $gradeYear): Collection
    {
        return Trail::query()
            ->where('is_active', true)
            ->where('subject_id', $subjectId)
            ->where('grade_year', $gradeYear)
            ->with([
                'subject:id,external_id,name,slug',
                'lessons' => fn ($query) => $query
                    ->where('is_active', true)
                    ->with('prerequisiteLesson:id,external_id')
                    ->orderBy('position'),
            ])
            ->orderBy('position')
            ->get();
    }
}
