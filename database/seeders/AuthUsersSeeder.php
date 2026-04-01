<?php

namespace Database\Seeders;

use App\Models\StudentProfile;
use App\Models\User;
use App\Services\StudentEnergyService;
use Illuminate\Database\Seeder;

class AuthUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        $admin = User::query()->updateOrCreate(
            ['email' => 'marcosrenan777@gmail.com'],
            [
                'name' => 'Admin Marcos',
                'username' => 'marcosrenan777',
                'password' => 'mr40028922',
                'role' => 'admin',
                'email_verified_at' => $now,
            ]
        );

        StudentProfile::query()
            ->where('user_id', $admin->id)
            ->delete();

        $user = User::query()->updateOrCreate(
            ['email' => 'devmarcos7@gmail.com'],
            [
                'name' => 'Aluno Marcos',
                'username' => 'devmarcos7',
                'password' => 'mr40028922',
                'role' => 'user',
                'email_verified_at' => $now,
            ]
        );

        StudentProfile::query()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'name' => $user->name,
                'grade_year' => 1,
                'total_xp' => 0,
                'level' => 1,
                'current_streak' => 0,
                'longest_streak' => 0,
                'lives' => 5,
                'energy' => StudentEnergyService::DEFAULT_ENERGY,
                'energy_recharge_reference_at' => $now,
                'last_daily_login_bonus_on' => null,
                'last_daily_goal_bonus_on' => null,
                'last_activity_date' => null,
            ]
        );
    }
}
