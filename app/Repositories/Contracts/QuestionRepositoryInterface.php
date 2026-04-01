<?php

namespace App\Repositories\Contracts;

use App\Models\Lesson;

interface QuestionRepositoryInterface
{
    public function findActiveLessonWithQuestionsBySlug(string $slug): ?Lesson;
}
