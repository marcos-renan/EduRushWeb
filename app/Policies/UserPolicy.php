<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function accessAdmin(User $user, mixed $target = null): bool
    {
        return $user->isAdmin();
    }

    public function accessStudent(User $user, mixed $target = null): bool
    {
        return $user->isStudent();
    }

    public function updateProfile(User $user, User $target): bool
    {
        return (int) $user->id === (int) $target->id;
    }

    public function updatePhoto(User $user, User $target): bool
    {
        return (int) $user->id === (int) $target->id;
    }

    public function delete(User $user, User $target): bool
    {
        return (int) $user->id === (int) $target->id;
    }

    public function manageUsers(User $user, mixed $target = null): bool
    {
        return $user->isAdmin();
    }
}
