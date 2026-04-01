<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentDailyActivity extends Model
{
    protected $fillable = [
        'student_profile_id',
        'activity_date',
        'xp_earned',
        'lessons_completed',
    ];

    protected $casts = [
        'activity_date' => 'date',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(StudentProfile::class, 'student_profile_id');
    }
}
