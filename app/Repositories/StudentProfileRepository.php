<?php

namespace App\Repositories;

use App\Models\StudentProfile;
use App\Models\User;
use App\Repositories\Contracts\StudentProfileRepositoryInterface;

class StudentProfileRepository implements StudentProfileRepositoryInterface
{
    public function forUser(User $user): StudentProfile
    {
        return StudentProfile::forUser($user);
    }

    public function createForUser(User $user, int $gradeYear, ?string $name = null): StudentProfile
    {
        return StudentProfile::query()->create([
            'user_id' => $user->id,
            'name' => $name ?: $user->name,
            'grade_year' => $gradeYear,
            'energy' => 10,
            'energy_recharge_reference_at' => now(),
        ]);
    }
}
