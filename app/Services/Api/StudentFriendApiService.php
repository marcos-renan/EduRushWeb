<?php

namespace App\Services\Api;

use App\Models\StudentDailyActivity;
use App\Models\StudentProfile;
use App\Models\User;
use App\Repositories\Contracts\FriendRequestRepositoryInterface;
use App\Repositories\Contracts\FriendshipRepositoryInterface;
use App\Repositories\Contracts\StudentProfileRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class StudentFriendApiService
{
    public function __construct(
        private readonly UserRepositoryInterface $users,
        private readonly StudentProfileRepositoryInterface $profiles,
        private readonly FriendRequestRepositoryInterface $friendRequests,
        private readonly FriendshipRepositoryInterface $friendships,
    ) {
    }

    /**
     * @return array{data: array<int, array<string, mixed>>, meta: array<string, int|string>}
     */
    public function search(User $user, string $query): array
    {
        $normalized = $this->normalizeUsername($query, false);

        if (strlen($normalized) < 2) {
            return [
                'data' => [],
                'meta' => [
                    'query' => $normalized,
                    'total_results' => 0,
                ],
            ];
        }

        $candidates = $this->users->searchStudentsByUsernameOrName($normalized, (int) $user->id);

        $data = $candidates
            ->map(function (User $candidate) use ($user): array {
                $isFriend = $this->friendships->existsBetweenUsers((int) $user->id, (int) $candidate->id);
                $outgoingPending = $this->friendRequests->findPendingByDirection((int) $user->id, (int) $candidate->id);
                $incomingPending = $this->friendRequests->findPendingByDirection((int) $candidate->id, (int) $user->id);

                return [
                    ...$this->memberPayload($candidate),
                    'is_friend' => $isFriend,
                    'request_status' => $isFriend
                        ? 'friends'
                        : ($outgoingPending ? 'sent' : ($incomingPending ? 'received' : 'none')),
                ];
            })
            ->values()
            ->all();

        return [
            'data' => $data,
            'meta' => [
                'query' => $normalized,
                'total_results' => count($data),
            ],
        ];
    }

    /**
     * @return array{data: array{incoming: array<int, array<string, mixed>>, outgoing: array<int, array<string, mixed>>}, meta: array<string, int>}
     */
    public function listRequests(User $user): array
    {
        $incoming = $this->friendRequests->listPendingIncomingForUser((int) $user->id);
        $outgoing = $this->friendRequests->listPendingOutgoingForUser((int) $user->id);

        return [
            'data' => [
                'incoming' => $incoming
                    ->map(fn ($request): array => [
                        'external_id' => $request->external_id,
                        'created_at' => optional($request->created_at)?->toIso8601String(),
                        'member' => $this->memberPayload($request->sender),
                    ])
                    ->values()
                    ->all(),
                'outgoing' => $outgoing
                    ->map(fn ($request): array => [
                        'external_id' => $request->external_id,
                        'created_at' => optional($request->created_at)?->toIso8601String(),
                        'member' => $this->memberPayload($request->receiver),
                    ])
                    ->values()
                    ->all(),
            ],
            'meta' => [
                'incoming_total' => $incoming->count(),
                'outgoing_total' => $outgoing->count(),
            ],
        ];
    }

    /**
     * @return array{data: array<string, mixed>}
     */
    public function sendRequest(User $user, string $username): array
    {
        $normalized = $this->normalizeUsername($username);
        $target = $this->users->findByUsername($normalized);

        if (! $target || ! $target->isStudent()) {
            throw (new ModelNotFoundException())->setModel(User::class);
        }

        if ((int) $target->id === (int) $user->id) {
            throw ValidationException::withMessages([
                'username' => 'Voce nao pode enviar convite para voce mesmo.',
            ]);
        }

        if ($this->friendships->existsBetweenUsers((int) $user->id, (int) $target->id)) {
            throw ValidationException::withMessages([
                'username' => 'Este usuario ja esta na sua lista de amigos.',
            ]);
        }

        $outgoingPending = $this->friendRequests->findPendingByDirection((int) $user->id, (int) $target->id);

        if ($outgoingPending) {
            throw ValidationException::withMessages([
                'username' => 'Voce ja enviou um pedido para este usuario.',
            ]);
        }

        $incomingPending = $this->friendRequests->findPendingByDirection((int) $target->id, (int) $user->id);

        if ($incomingPending) {
            DB::transaction(function () use ($incomingPending, $user, $target): void {
                $this->friendRequests->markAccepted($incomingPending);
                $this->friendships->createPair((int) $user->id, (int) $target->id);
            });

            return [
                'data' => [
                    'status' => 'auto_accepted',
                    'message' => 'Pedido aceito automaticamente. Voces agora sao amigos.',
                    'friend' => $this->memberPayload($target->fresh(['studentProfile']) ?? $target),
                ],
            ];
        }

        $request = $this->friendRequests->savePending((int) $user->id, (int) $target->id);

        return [
            'data' => [
                'status' => 'sent',
                'message' => 'Pedido de amizade enviado com sucesso.',
                'request' => [
                    'external_id' => $request->external_id,
                    'created_at' => optional($request->created_at)?->toIso8601String(),
                ],
                'target' => $this->memberPayload($target->fresh(['studentProfile']) ?? $target),
            ],
        ];
    }

    /**
     * @return array{data: array<string, mixed>}
     */
    public function acceptRequest(User $user, string $requestExternalId): array
    {
        $request = $this->friendRequests->findPendingIncomingByExternalId((int) $user->id, $requestExternalId);

        if (! $request) {
            throw (new ModelNotFoundException())->setModel('friend_request');
        }

        DB::transaction(function () use ($request, $user): void {
            $this->friendRequests->markAccepted($request);
            $this->friendships->createPair((int) $user->id, (int) $request->sender_id);
        });

        $sender = $request->sender?->fresh(['studentProfile']) ?? $request->sender;

        return [
            'data' => [
                'status' => 'accepted',
                'message' => 'Pedido aceito com sucesso.',
                'friend' => $sender ? $this->memberPayload($sender) : null,
            ],
        ];
    }

    /**
     * @return array{data: array<string, mixed>}
     */
    public function rejectRequest(User $user, string $requestExternalId): array
    {
        $request = $this->friendRequests->findPendingIncomingByExternalId((int) $user->id, $requestExternalId);

        if (! $request) {
            throw (new ModelNotFoundException())->setModel('friend_request');
        }

        $this->friendRequests->markRejected($request);

        return [
            'data' => [
                'status' => 'rejected',
                'message' => 'Pedido recusado.',
            ],
        ];
    }

    /**
     * @return array{data: array<int, array<string, mixed>>, meta: array<string, int>}
     */
    public function listFriends(User $user): array
    {
        $friends = $this->friendships->listFriendsForUser((int) $user->id);

        $data = $friends
            ->map(fn (User $friend): array => $this->memberPayload($friend))
            ->values()
            ->all();

        return [
            'data' => $data,
            'meta' => [
                'total_friends' => count($data),
            ],
        ];
    }

    /**
     * @return array{data: array<string, mixed>}
     */
    public function removeFriend(User $user, string $friendExternalId): array
    {
        $friend = $this->users->findByExternalId($friendExternalId);

        if (! $friend || ! $friend->isStudent()) {
            throw (new ModelNotFoundException())->setModel(User::class);
        }

        if (! $this->friendships->existsBetweenUsers((int) $user->id, (int) $friend->id)) {
            throw ValidationException::withMessages([
                'friend' => 'Este usuario nao esta na sua lista de amigos.',
            ]);
        }

        $this->friendships->deletePair((int) $user->id, (int) $friend->id);

        return [
            'data' => [
                'status' => 'removed',
                'message' => 'Amizade removida com sucesso.',
            ],
        ];
    }

    /**
     * @return array{data: array<int, array<string, mixed>>, meta: array<string, int>}
     */
    public function ranking(User $user): array
    {
        $self = $user->fresh(['studentProfile.badges:id,name,icon,color_hex']) ?? $user;
        $selfProfile = $self->studentProfile ?? $this->profiles->forUser($self);
        $self->setRelation('studentProfile', $selfProfile->loadMissing('badges:id,name,icon,color_hex'));

        $members = collect([$self])
            ->concat($this->friendships->listFriendsForUser((int) $user->id))
            ->unique('id')
            ->values();

        $ranked = $members
            ->sort(function (User $left, User $right): int {
                $leftProfile = $left->studentProfile;
                $rightProfile = $right->studentProfile;

                $leftXp = (int) ($leftProfile?->total_xp ?? 0);
                $rightXp = (int) ($rightProfile?->total_xp ?? 0);
                if ($leftXp !== $rightXp) {
                    return $rightXp <=> $leftXp;
                }

                $leftLevel = (int) ($leftProfile?->level ?? 1);
                $rightLevel = (int) ($rightProfile?->level ?? 1);
                if ($leftLevel !== $rightLevel) {
                    return $rightLevel <=> $leftLevel;
                }

                $leftStreak = (int) ($leftProfile?->current_streak ?? 0);
                $rightStreak = (int) ($rightProfile?->current_streak ?? 0);
                if ($leftStreak !== $rightStreak) {
                    return $rightStreak <=> $leftStreak;
                }

                return strcasecmp((string) $left->username, (string) $right->username);
            })
            ->values();

        $data = $ranked
            ->map(function (User $member, int $index) use ($user): array {
                return [
                    'rank' => $index + 1,
                    'is_me' => (int) $member->id === (int) $user->id,
                    ...$this->memberPayload($member),
                ];
            })
            ->all();

        return [
            'data' => $data,
            'meta' => [
                'total_members' => count($data),
                'total_friends' => max(0, count($data) - 1),
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function memberPayload(User $user): array
    {
        $profile = $user->studentProfile ?? $this->profiles->forUser($user);
        $profile->loadMissing('badges:id,name,icon,color_hex');

        return [
            'user' => [
                'external_id' => $user->external_id,
                'name' => $user->name,
                'username' => $user->username,
                'handle' => '@'.$user->username,
                'profile_photo_url' => $this->profilePhotoUrl($user),
            ],
            'stats' => [
                'grade_year' => (int) ($profile?->grade_year ?? 1),
                'level' => (int) ($profile?->level ?? 1),
                'total_xp' => (int) ($profile?->total_xp ?? 0),
                'current_streak' => (int) ($profile?->current_streak ?? 0),
                'lessons_per_day' => $this->lessonsPerDay($profile),
                'badges' => $profile?->badges
                    ? $profile->badges
                        ->map(fn ($badge): array => [
                            'name' => (string) $badge->name,
                            'icon' => (string) ($badge->icon ?? 'award'),
                            'color_hex' => (string) ($badge->color_hex ?? '#2563EB'),
                        ])
                        ->values()
                        ->all()
                    : [],
            ],
        ];
    }

    /**
     * @return array<int, array{date: string, lessons_completed: int}>
     */
    private function lessonsPerDay(StudentProfile $profile, int $days = 7): array
    {
        $safeDays = max(3, min(30, $days));
        $endDate = now()->startOfDay();
        $startDate = $endDate->copy()->subDays($safeDays - 1);

        $rows = StudentDailyActivity::query()
            ->where('student_profile_id', $profile->id)
            ->whereDate('activity_date', '>=', $startDate->toDateString())
            ->whereDate('activity_date', '<=', $endDate->toDateString())
            ->orderBy('activity_date')
            ->get(['activity_date', 'lessons_completed']);

        $lessonsByDate = $rows
            ->mapWithKeys(function (StudentDailyActivity $activity): array {
                $date = $activity->activity_date?->toDateString();

                if (! $date) {
                    return [];
                }

                return [$date => (int) $activity->lessons_completed];
            })
            ->all();

        $timeline = [];

        for ($offset = 0; $offset < $safeDays; $offset++) {
            $date = $startDate->copy()->addDays($offset)->toDateString();

            $timeline[] = [
                'date' => $date,
                'lessons_completed' => (int) ($lessonsByDate[$date] ?? 0),
            ];
        }

        return $timeline;
    }

    private function profilePhotoUrl(User $user): ?string
    {
        return $user->profile_photo_url;
    }

    private function normalizeUsername(string $username, bool $strict = true): string
    {
        $normalized = strtolower(trim($username));

        if (str_starts_with($normalized, '@')) {
            $normalized = substr($normalized, 1);
        }

        $normalized = preg_replace('/[^a-z0-9._]/', '', $normalized) ?? '';

        if ($strict && strlen($normalized) < 3) {
            throw ValidationException::withMessages([
                'username' => 'Informe um @usuario valido com pelo menos 3 caracteres.',
            ]);
        }

        return $normalized;
    }
}
