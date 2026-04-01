<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentLessonProgress extends Model
{
    protected $table = 'student_lesson_progress';

    protected $fillable = [
        'student_profile_id',
        'lesson_id',
        'status',
        'score',
        'xp_earned',
        'completed_at',
        'last_accessed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'last_accessed_at' => 'datetime',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(StudentProfile::class, 'student_profile_id');
    }

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}
