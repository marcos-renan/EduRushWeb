<?php

namespace App\Models;

use App\Models\Concerns\HasExternalId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lesson extends Model
{
    use HasExternalId;

    protected $fillable = [
        'trail_id',
        'prerequisite_lesson_id',
        'external_id',
        'title',
        'slug',
        'position',
        'objective',
        'content',
        'xp_reward',
        'difficulty',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function trail(): BelongsTo
    {
        return $this->belongsTo(Trail::class);
    }

    public function prerequisiteLesson(): BelongsTo
    {
        return $this->belongsTo(self::class, 'prerequisite_lesson_id');
    }

    public function dependentLessons(): HasMany
    {
        return $this->hasMany(self::class, 'prerequisite_lesson_id');
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class)->orderBy('position');
    }

    public function progress(): HasMany
    {
        return $this->hasMany(StudentLessonProgress::class);
    }
}
