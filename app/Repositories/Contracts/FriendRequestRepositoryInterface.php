<?php

namespace App\Repositories\Contracts;

use App\Models\FriendRequest;
use Illuminate\Support\Collection;

interface FriendRequestRepositoryInterface
{
    public function findPendingByDirection(int $senderId, int $receiverId): ?FriendRequest;

    public function findPendingIncomingByExternalId(int $receiverId, string $externalId): ?FriendRequest;

    public function savePending(int $senderId, int $receiverId): FriendRequest;

    public function markAccepted(FriendRequest $request): FriendRequest;

    public function markRejected(FriendRequest $request): FriendRequest;

    /**
     * @return Collection<int, FriendRequest>
     */
    public function listPendingIncomingForUser(int $userId): Collection;

    /**
     * @return Collection<int, FriendRequest>
     */
    public function listPendingOutgoingForUser(int $userId): Collection;
}

