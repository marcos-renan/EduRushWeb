<?php

namespace App\Repositories;

use App\Models\Lesson;
use App\Repositories\Contracts\QuestionRepositoryInterface;

class QuestionRepository implements QuestionRepositoryInterface
{
    public function findActiveLessonWithQuestionsBySlug(string $slug): ?Lesson
    {
        return Lesson::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->with([
                'trail:id,subject_id,external_id,title,slug,is_active,grade_year',
                'questions' => fn ($query) => $query
                    ->where('is_active', true)
                    ->orderBy('position'),
            ])
            ->first();
    }
}
