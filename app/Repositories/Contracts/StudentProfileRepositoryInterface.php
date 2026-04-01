<?php

namespace App\Repositories\Contracts;

use App\Models\StudentProfile;
use App\Models\User;

interface StudentProfileRepositoryInterface
{
    public function forUser(User $user): StudentProfile;

    public function createForUser(User $user, int $gradeYear, ?string $name = null): StudentProfile;
}
