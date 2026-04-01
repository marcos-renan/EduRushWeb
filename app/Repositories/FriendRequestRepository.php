<?php

namespace App\Repositories;

use App\Models\FriendRequest;
use App\Repositories\Contracts\FriendRequestRepositoryInterface;
use Illuminate\Support\Collection;

class FriendRequestRepository implements FriendRequestRepositoryInterface
{
    public function findPendingByDirection(int $senderId, int $receiverId): ?FriendRequest
    {
        return FriendRequest::query()
            ->where('sender_id', $senderId)
            ->where('receiver_id', $receiverId)
            ->where('status', 'pending')
            ->first();
    }

    public function findPendingIncomingByExternalId(int $receiverId, string $externalId): ?FriendRequest
    {
        return FriendRequest::query()
            ->where('external_id', $externalId)
            ->where('receiver_id', $receiverId)
            ->where('status', 'pending')
            ->with(['sender:id,external_id,name,username,role,profile_photo_path'])
            ->first();
    }

    public function savePending(int $senderId, int $receiverId): FriendRequest
    {
        $request = FriendRequest::query()->firstOrNew([
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
        ]);

        $request->status = 'pending';
        $request->responded_at = null;
        $request->save();

        return $request->fresh(['sender:id,external_id,name,username,role,profile_photo_path', 'receiver:id,external_id,name,username,role,profile_photo_path']) ?? $request;
    }

    public function markAccepted(FriendRequest $request): FriendRequest
    {
        $request->status = 'accepted';
        $request->responded_at = now();
        $request->save();

        return $request;
    }

    public function markRejected(FriendRequest $request): FriendRequest
    {
        $request->status = 'rejected';
        $request->responded_at = now();
        $request->save();

        return $request;
    }

    public function listPendingIncomingForUser(int $userId): Collection
    {
        return FriendRequest::query()
            ->where('receiver_id', $userId)
            ->where('status', 'pending')
            ->with([
                'sender:id,external_id,name,username,role,profile_photo_path',
                'sender.studentProfile:id,user_id,grade_year,level,total_xp,current_streak',
                'sender.studentProfile.badges:id,name,icon,color_hex',
            ])
            ->orderByDesc('created_at')
            ->get();
    }

    public function listPendingOutgoingForUser(int $userId): Collection
    {
        return FriendRequest::query()
            ->where('sender_id', $userId)
            ->where('status', 'pending')
            ->with([
                'receiver:id,external_id,name,username,role,profile_photo_path',
                'receiver.studentProfile:id,user_id,grade_year,level,total_xp,current_streak',
                'receiver.studentProfile.badges:id,name,icon,color_hex',
            ])
            ->orderByDesc('created_at')
            ->get();
    }
}
