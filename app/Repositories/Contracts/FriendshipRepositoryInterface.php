<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Support\Collection;

interface FriendshipRepositoryInterface
{
    public function existsBetweenUsers(int $userId, int $friendId): bool;

    public function createPair(int $userId, int $friendId): void;

    public function deletePair(int $userId, int $friendId): void;

    /**
     * @return array<int, int>
     */
    public function friendIdsForUser(int $userId): array;

    /**
     * @return Collection<int, User>
     */
    public function listFriendsForUser(int $userId): Collection;
}

