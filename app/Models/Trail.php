<?php

namespace App\Models;

use App\Models\Concerns\HasExternalId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Trail extends Model
{
    use HasExternalId;

    protected $fillable = [
        'subject_id',
        'grade_year',
        'external_id',
        'title',
        'slug',
        'position',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'grade_year' => 'integer',
    ];

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class)->orderBy('position');
    }

    public function studyPlans(): HasMany
    {
        return $this->hasMany(StudyPlan::class);
    }
}
