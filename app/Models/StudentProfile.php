<?php

namespace App\Models;

use App\Models\Concerns\HasExternalId;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StudentProfile extends Model
{
    use HasExternalId;

    protected $fillable = [
        'user_id',
        'external_id',
        'name',
        'grade_year',
        'total_xp',
        'level',
        'current_streak',
        'longest_streak',
        'lives',
        'energy',
        'energy_recharge_reference_at',
        'last_daily_login_bonus_on',
        'last_daily_goal_bonus_on',
        'last_activity_date',
    ];

    protected $casts = [
        'energy_recharge_reference_at' => 'datetime',
        'last_daily_login_bonus_on' => 'date',
        'last_daily_goal_bonus_on' => 'date',
        'last_activity_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function lessonProgress(): HasMany
    {
        return $this->hasMany(StudentLessonProgress::class);
    }

    public function dailyActivities(): HasMany
    {
        return $this->hasMany(StudentDailyActivity::class);
    }

    public function missions(): HasMany
    {
        return $this->hasMany(StudentMission::class);
    }

    public function questionErrors(): HasMany
    {
        return $this->hasMany(StudentQuestionError::class);
    }

    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class, 'student_badges')
            ->withPivot('unlocked_at')
            ->withTimestamps();
    }

    public static function demo(): self
    {
        $profile = static::query()->firstOrCreate(
            ['name' => 'Aluno Demo'],
            [
                'grade_year' => 1,
                'energy' => 10,
                'energy_recharge_reference_at' => now(),
            ]
        );

        return $profile->fresh() ?? $profile;
    }

    public static function forUser(User $user): self
    {
        $profile = static::query()->firstOrCreate(
            ['user_id' => $user->id],
            [
                'name' => $user->name,
                'grade_year' => 1,
                'energy' => 10,
                'energy_recharge_reference_at' => now(),
            ]
        );

        return $profile->fresh() ?? $profile;
    }
}
