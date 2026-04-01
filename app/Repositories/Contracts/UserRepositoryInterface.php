<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Support\Collection;

interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?User;

    public function findByUsername(string $username): ?User;

    public function findByExternalId(string $externalId): ?User;

    public function createStudent(string $name, string $username, string $email, string $password): User;

    /**
     * @return Collection<int, User>
     */
    public function searchStudentsByUsernameOrName(string $query, int $excludeUserId, int $limit = 12): Collection;
}
