<?php

namespace App\Policies;

use App\Models\Trail;
use App\Models\User;

class TrailPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    public function view(User $user, Trail $trail): bool
    {
        return $user->isAdmin();
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, Trail $trail): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Trail $trail): bool
    {
        return $user->isAdmin();
    }
}

