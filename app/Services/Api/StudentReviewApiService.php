<?php

namespace App\Services\Api;

use App\Models\StudentQuestionError;
use App\Models\User;
use App\Repositories\Contracts\StudentProfileRepositoryInterface;

class StudentReviewApiService
{
    public function __construct(
        private readonly StudentProfileRepositoryInterface $profiles,
    ) {
    }

    /**
     * @return array{
     *     data: array{
     *         pending_errors: array<int, array<string, mixed>>,
     *         resolved_errors: array<int, array<string, mixed>>
     *     },
     *     meta: array<string, int>
     * }
     */
    public function listForUser(User $user): array
    {
        $student = $this->profiles->forUser($user);

        $pending = StudentQuestionError::query()
            ->with(['question:id,external_id,prompt', 'lesson:id,title,slug,trail_id', 'lesson.trail:id,title,subject_id', 'lesson.trail.subject:id,name'])
            ->where('student_profile_id', $student->id)
            ->whereNull('resolved_at')
            ->orderByDesc('attempts')
            ->orderByDesc('last_answered_at')
            ->get();

        $resolved = StudentQuestionError::query()
            ->with(['question:id,external_id,prompt', 'lesson:id,title,slug,trail_id', 'lesson.trail:id,title,subject_id', 'lesson.trail.subject:id,name'])
            ->where('student_profile_id', $student->id)
            ->whereNotNull('resolved_at')
            ->orderByDesc('resolved_at')
            ->limit(10)
            ->get();

        return [
            'data' => [
                'pending_errors' => $pending->map(fn (StudentQuestionError $error): array => $this->errorPayload($error))->values()->all(),
                'resolved_errors' => $resolved->map(fn (StudentQuestionError $error): array => $this->errorPayload($error))->values()->all(),
            ],
            'meta' => [
                'pending_count' => $pending->count(),
                'resolved_count' => $resolved->count(),
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function errorPayload(StudentQuestionError $error): array
    {
        return [
            'question_external_id' => $error->question?->external_id,
            'question_prompt' => $error->question?->prompt,
            'lesson' => [
                'title' => $error->lesson?->title,
                'slug' => $error->lesson?->slug,
                'trail_title' => $error->lesson?->trail?->title,
                'subject_name' => $error->lesson?->trail?->subject?->name,
            ],
            'attempts' => (int) $error->attempts,
            'last_selected_option' => $error->last_selected_option,
            'last_correct_option' => $error->last_correct_option,
            'last_answered_at' => optional($error->last_answered_at)?->toIso8601String(),
            'resolved_at' => optional($error->resolved_at)?->toIso8601String(),
            'is_resolved' => $error->resolved_at !== null,
        ];
    }
}
