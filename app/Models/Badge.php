<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Badge extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'description',
        'icon',
        'color_hex',
        'unlock_metric',
        'unlock_target',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(StudentProfile::class, 'student_badges')
            ->withPivot('unlocked_at')
            ->withTimestamps();
    }
}
