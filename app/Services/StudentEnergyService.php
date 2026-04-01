<?php

namespace App\Services;

use App\Models\StudentProfile;
use Carbon\CarbonImmutable;
use Carbon\CarbonInterface;

class StudentEnergyService
{
    public const DEFAULT_ENERGY = 10;
    public const REGEN_CAP = 10;
    public const REGEN_INTERVAL_MINUTES = 15;
    public const LESSON_PASS_BONUS = 1;
    public const LESSON_FAIL_COST = 1;
    public const DAILY_LOGIN_BONUS = 2;
    public const DAILY_GOAL_BONUS = 1;
    public const LEVEL_UP_BONUS = 3;

    public function refresh(StudentProfile $student, ?CarbonInterface $now = null): StudentProfile
    {
        $now = $this->normalizeNow($now);
        $energy = max(0, (int) $student->energy);
        $reference = $this->referenceAsCarbon($student);

        if ($energy >= self::REGEN_CAP) {
            $student->energy = $energy;
            $student->energy_recharge_reference_at = $now;
            $student->save();

            return $student;
        }

        if (! $reference) {
            $student->energy = $energy;
            $student->energy_recharge_reference_at = $now;
            $student->save();

            return $student;
        }

        $elapsedMinutes = $reference->diffInMinutes($now, false);

        if ($elapsedMinutes < self::REGEN_INTERVAL_MINUTES) {
            return $student;
        }

        $recoveredUnits = intdiv($elapsedMinutes, self::REGEN_INTERVAL_MINUTES);
        $recoverable = min($recoveredUnits, self::REGEN_CAP - $energy);

        if ($recoverable <= 0) {
            return $student;
        }

        $student->energy = $energy + $recoverable;
        $student->energy_recharge_reference_at = ((int) $student->energy >= self::REGEN_CAP)
            ? $now
            : $reference->addMinutes($recoverable * self::REGEN_INTERVAL_MINUTES);
        $student->save();

        return $student;
    }

    public function hasEnergyToStartLesson(StudentProfile $student): bool
    {
        $this->refresh($student);

        return (int) $student->energy > 0;
    }

    public function applyLessonOutcome(StudentProfile $student, bool $passed): int
    {
        return $passed
            ? $this->addEnergy($student, self::LESSON_PASS_BONUS)
            : -$this->spendEnergy($student, self::LESSON_FAIL_COST);
    }

    public function grantDailyLoginBonus(StudentProfile $student): int
    {
        $today = now()->toDateString();
        $lastBonus = optional($student->last_daily_login_bonus_on)?->toDateString();

        if ($lastBonus === $today) {
            return 0;
        }

        $granted = $this->addEnergy($student, self::DAILY_LOGIN_BONUS);
        $student->last_daily_login_bonus_on = $today;
        $student->save();

        return $granted;
    }

    public function grantDailyGoalBonus(StudentProfile $student): int
    {
        $today = now()->toDateString();
        $lastBonus = optional($student->last_daily_goal_bonus_on)?->toDateString();

        if ($lastBonus === $today) {
            return 0;
        }

        $granted = $this->addEnergy($student, self::DAILY_GOAL_BONUS);
        $student->last_daily_goal_bonus_on = $today;
        $student->save();

        return $granted;
    }

    public function grantLevelUpBonus(StudentProfile $student, int $levelsGained): int
    {
        if ($levelsGained <= 0) {
            return 0;
        }

        return $this->addEnergy($student, self::LEVEL_UP_BONUS * $levelsGained);
    }

    /**
     * @return array{
     *     energy: int,
     *     energy_regen_cap: int,
     *     energy_recovery_minutes: int,
     *     energy_next_recharge_at: string|null
     * }
     */
    public function payload(StudentProfile $student): array
    {
        $this->refresh($student);

        return [
            'energy' => max(0, (int) $student->energy),
            'energy_regen_cap' => self::REGEN_CAP,
            'energy_recovery_minutes' => self::REGEN_INTERVAL_MINUTES,
            'energy_next_recharge_at' => $this->nextRechargeAt($student)?->toIso8601String(),
        ];
    }

    private function addEnergy(StudentProfile $student, int $amount): int
    {
        if ($amount <= 0) {
            return 0;
        }

        $now = $this->normalizeNow();
        $this->refresh($student, $now);

        $student->energy = max(0, (int) $student->energy + $amount);

        if ((int) $student->energy >= self::REGEN_CAP) {
            $student->energy_recharge_reference_at = $now;
        }

        $student->save();

        return $amount;
    }

    private function spendEnergy(StudentProfile $student, int $amount): int
    {
        if ($amount <= 0) {
            return 0;
        }

        $now = $this->normalizeNow();
        $this->refresh($student, $now);

        $available = max(0, (int) $student->energy);
        $spent = min($amount, $available);

        if ($spent <= 0) {
            return 0;
        }

        $student->energy = $available - $spent;

        if ((int) $student->energy < self::REGEN_CAP) {
            $student->energy_recharge_reference_at = $now;
        }

        $student->save();

        return $spent;
    }

    private function nextRechargeAt(StudentProfile $student): ?CarbonImmutable
    {
        $energy = max(0, (int) $student->energy);

        if ($energy >= self::REGEN_CAP) {
            return null;
        }

        $reference = $this->referenceAsCarbon($student) ?? $this->normalizeNow();

        return $reference->addMinutes(self::REGEN_INTERVAL_MINUTES);
    }

    private function referenceAsCarbon(StudentProfile $student): ?CarbonImmutable
    {
        $reference = $student->energy_recharge_reference_at;

        if (! $reference) {
            return null;
        }

        if ($reference instanceof CarbonInterface) {
            return CarbonImmutable::instance($reference)->startOfSecond();
        }

        return CarbonImmutable::parse($reference)->startOfSecond();
    }

    private function normalizeNow(?CarbonInterface $now = null): CarbonImmutable
    {
        if ($now instanceof CarbonInterface) {
            return CarbonImmutable::instance($now)->startOfSecond();
        }

        return now()->toImmutable()->startOfSecond();
    }
}
