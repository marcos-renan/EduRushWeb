<?php

namespace App\Services\Api;

use App\Models\User;
use App\Repositories\Contracts\StudentProfileRepositoryInterface;
use App\Services\GamificationService;

class StudentMissionApiService
{
    public function __construct(
        private readonly StudentProfileRepositoryInterface $profiles,
        private readonly GamificationService $gamificationService,
    ) {
    }

    /**
     * @return array{
     *     data: array<int, array<string, mixed>>,
     *     meta: array{
     *         total_missions: int,
     *         completed_missions: int,
     *         daily_missions: array<int, array<string, mixed>>,
     *         weekly_missions: array<int, array<string, mixed>>
     *     }
     * }
     */
    public function listForUser(User $user): array
    {
        $student = $this->profiles->forUser($user);
        $missions = $this->gamificationService->ensureActiveMissions($student);

        $data = $missions
            ->map(function ($mission): array {
                $target = max(1, (int) $mission->target);
                $progress = min($target, (int) $mission->progress);

                return [
                    'external_id' => $mission->external_id,
                    'mission_key' => $mission->mission_key,
                    'mission_type' => $mission->mission_type,
                    'title' => $mission->title,
                    'description' => $mission->description,
                    'metric' => $mission->metric,
                    'target' => $target,
                    'progress' => $progress,
                    'progress_percent' => (int) round(($progress / $target) * 100),
                    'reward_xp' => (int) $mission->reward_xp,
                    'starts_on' => $mission->starts_on,
                    'ends_on' => $mission->ends_on,
                    'is_completed' => $mission->completed_at !== null,
                ];
            })
            ->values();

        return [
            'data' => $data->all(),
            'meta' => [
                'total_missions' => $data->count(),
                'completed_missions' => $data->where('is_completed', true)->count(),
                'daily_missions' => $data->where('mission_type', 'daily')->values()->all(),
                'weekly_missions' => $data->where('mission_type', 'weekly')->values()->all(),
            ],
        ];
    }
}
