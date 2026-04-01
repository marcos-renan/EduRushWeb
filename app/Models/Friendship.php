<?php

namespace App\Models;

use App\Models\Concerns\HasExternalId;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'external_id',
    'user_id',
    'friend_id',
])]
class Friendship extends Model
{
    use HasExternalId;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function friend(): BelongsTo
    {
        return $this->belongsTo(User::class, 'friend_id');
    }
}

