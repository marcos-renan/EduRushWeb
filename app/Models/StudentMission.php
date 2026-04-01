<?php

namespace App\Models;

use App\Models\Concerns\HasExternalId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentMission extends Model
{
    use HasExternalId;

    protected $fillable = [
        'student_profile_id',
        'external_id',
        'mission_key',
        'mission_type',
        'title',
        'description',
        'metric',
        'target',
        'progress',
        'reward_xp',
        'starts_on',
        'ends_on',
        'completed_at',
        'claimed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'claimed_at' => 'datetime',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(StudentProfile::class, 'student_profile_id');
    }
}
