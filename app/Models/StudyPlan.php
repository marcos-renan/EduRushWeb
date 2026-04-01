<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudyPlan extends Model
{
    protected $fillable = [
        'trail_id',
        'title',
        'description',
        'weekly_lessons_goal',
        'weekly_xp_goal',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function trail(): BelongsTo
    {
        return $this->belongsTo(Trail::class);
    }
}

