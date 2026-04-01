<?php

namespace App\Repositories;

use App\Models\Friendship;
use App\Models\User;
use App\Repositories\Contracts\FriendshipRepositoryInterface;
use Illuminate\Support\Collection;

class FriendshipRepository implements FriendshipRepositoryInterface
{
    public function existsBetweenUsers(int $userId, int $friendId): bool
    {
        return Friendship::query()
            ->where('user_id', $userId)
            ->where('friend_id', $friendId)
            ->exists();
    }

    public function createPair(int $userId, int $friendId): void
    {
        Friendship::query()->firstOrCreate([
            'user_id' => $userId,
            'friend_id' => $friendId,
        ]);

        Friendship::query()->firstOrCreate([
            'user_id' => $friendId,
            'friend_id' => $userId,
        ]);
    }

    public function deletePair(int $userId, int $friendId): void
    {
        Friendship::query()
            ->where(function ($query) use ($userId, $friendId): void {
                $query->where('user_id', $userId)
                    ->where('friend_id', $friendId);
            })
            ->orWhere(function ($query) use ($userId, $friendId): void {
                $query->where('user_id', $friendId)
                    ->where('friend_id', $userId);
            })
            ->delete();
    }

    public function friendIdsForUser(int $userId): array
    {
        return Friendship::query()
            ->where('user_id', $userId)
            ->pluck('friend_id')
            ->map(fn ($id) => (int) $id)
            ->all();
    }

    public function listFriendsForUser(int $userId): Collection
    {
        return User::query()
            ->select('users.*')
            ->join('friendships', 'friendships.friend_id', '=', 'users.id')
            ->where('friendships.user_id', $userId)
            ->where('users.role', 'user')
            ->with([
                'studentProfile:id,user_id,grade_year,level,total_xp,current_streak',
                'studentProfile.badges:id,name,icon,color_hex',
            ])
            ->orderByRaw('LOWER(users.username) asc')
            ->get();
    }
}
