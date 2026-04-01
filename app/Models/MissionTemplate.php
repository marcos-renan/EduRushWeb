<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MissionTemplate extends Model
{
    protected $fillable = [
        'mission_key',
        'mission_type',
        'title',
        'description',
        'metric',
        'target',
        'reward_xp',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}

