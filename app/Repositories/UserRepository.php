<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class UserRepository implements UserRepositoryInterface
{
    public function findByEmail(string $email): ?User
    {
        return User::query()
            ->where('email', $email)
            ->first();
    }

    public function findByUsername(string $username): ?User
    {
        return User::query()
            ->whereRaw('LOWER(username) = ?', [strtolower($username)])
            ->first();
    }

    public function findByExternalId(string $externalId): ?User
    {
        return User::query()
            ->where('external_id', $externalId)
            ->first();
    }

    public function createStudent(string $name, string $username, string $email, string $password): User
    {
        return User::query()->create([
            'name' => $name,
            'username' => $username,
            'email' => $email,
            'password' => $password,
            'role' => 'user',
        ]);
    }

    public function searchStudentsByUsernameOrName(string $query, int $excludeUserId, int $limit = 12): Collection
    {
        $normalized = strtolower($query);
        $like = '%'.$normalized.'%';

        return User::query()
            ->where('role', 'user')
            ->where('id', '!=', $excludeUserId)
            ->where(function (Builder $builder) use ($like): void {
                $builder->whereRaw('LOWER(username) like ?', [$like])
                    ->orWhereRaw('LOWER(name) like ?', [$like]);
            })
            ->with([
                'studentProfile:id,user_id,grade_year,level,total_xp,current_streak',
                'studentProfile.badges:id,name,icon,color_hex',
            ])
            ->orderByRaw('LOWER(username) asc')
            ->limit(max(1, min($limit, 30)))
            ->get();
    }
}
