<?php

namespace App\Policies;

use App\Models\MissionTemplate;
use App\Models\User;

class MissionTemplatePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    public function view(User $user, MissionTemplate $missionTemplate): bool
    {
        return $user->isAdmin();
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, MissionTemplate $missionTemplate): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, MissionTemplate $missionTemplate): bool
    {
        return $user->isAdmin();
    }
}

