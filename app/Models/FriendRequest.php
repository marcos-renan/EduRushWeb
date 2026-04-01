<?php

namespace App\Models;

use App\Models\Concerns\HasExternalId;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'external_id',
    'sender_id',
    'receiver_id',
    'status',
    'responded_at',
])]
class FriendRequest extends Model
{
    use HasExternalId;

    protected function casts(): array
    {
        return [
            'responded_at' => 'datetime',
        ];
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}

