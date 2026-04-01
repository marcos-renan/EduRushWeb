<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentQuestionError extends Model
{
    protected $fillable = [
        'student_profile_id',
        'lesson_id',
        'question_id',
        'attempts',
        'last_selected_option',
        'last_correct_option',
        'last_answered_at',
        'resolved_at',
    ];

    protected $casts = [
        'last_answered_at' => 'datetime',
        'resolved_at' => 'datetime',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(StudentProfile::class, 'student_profile_id');
    }

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
}

