<?php

namespace Database\Seeders;

use App\Models\StudentProfile;
use App\Models\User;
use App\Services\StudentEnergyService;
use Illuminate\Database\Seeder;

class StudentProfileEnergySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        User::query()
            ->where('role', 'user')
            ->orderBy('id')
            ->chunk(100, function ($users) use ($now): void {
                foreach ($users as $user) {
                    StudentProfile::query()->updateOrCreate(
                        ['user_id' => $user->id],
                        [
                            'name' => $user->name,
                            'grade_year' => 1,
                            'energy' => StudentEnergyService::DEFAULT_ENERGY,
                            'energy_recharge_reference_at' => $now,
                        ]
                    );
                }
            });

        StudentProfile::query()
            ->orderBy('id')
            ->chunk(100, function ($profiles) use ($now): void {
                foreach ($profiles as $profile) {
                    $profile->grade_year = max(1, min(3, (int) ($profile->grade_year ?? 1)));
                    $profile->total_xp = max(0, (int) ($profile->total_xp ?? 0));
                    $profile->level = max(1, (int) ($profile->level ?? 1));
                    $profile->current_streak = max(0, (int) ($profile->current_streak ?? 0));
                    $profile->longest_streak = max((int) $profile->current_streak, (int) ($profile->longest_streak ?? 0));
                    $profile->energy = max(
                        0,
                        min(
                            StudentEnergyService::REGEN_CAP,
                            (int) ($profile->energy ?? StudentEnergyService::DEFAULT_ENERGY)
                        )
                    );
                    $profile->energy_recharge_reference_at = $profile->energy_recharge_reference_at ?: $now;
                    $profile->save();
                }
            });
    }
}
