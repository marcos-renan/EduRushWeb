<?php

namespace App\Services\Api;

use App\Models\User;
use App\Repositories\Contracts\StudentProfileRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Services\StudentEnergyService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class StudentAuthApiService
{
    public function __construct(
        private readonly UserRepositoryInterface $users,
        private readonly StudentProfileRepositoryInterface $profiles,
        private readonly StudentEnergyService $energyService,
    ) {
    }

    /**
     * @return array{
     *     status: 'ok'|'invalid_credentials'|'email_taken'|'username_taken',
     *     payload?: array<string, mixed>,
     *     message?: string
     * }
     */
    public function login(string $email, string $password, string $deviceName): array
    {
        $user = $this->users->findByEmail($email);

        if (! $user || ! Hash::check($password, $user->password)) {
            return [
                'status' => 'invalid_credentials',
                'message' => 'Credenciais invalidas.',
            ];
        }

        if (! $user->isStudent()) {
            return [
                'status' => 'invalid_credentials',
                'message' => 'Credenciais invalidas.',
            ];
        }

        return [
            'status' => 'ok',
            'payload' => $this->buildAuthPayload($user, $deviceName, true),
        ];
    }

    public function logout(?User $user): void
    {
        $user->currentAccessToken()?->delete();
    }

    /**
     * @return array{
     *     status: 'ok'|'email_taken'|'username_taken',
     *     payload?: array<string, mixed>,
     *     message?: string
     * }
     */
    public function register(
        string $name,
        string $username,
        string $email,
        string $password,
        int $gradeYear,
        string $deviceName
    ): array {
        $normalizedUsername = $this->normalizeUsername($username);

        if ($this->users->findByEmail($email)) {
            return [
                'status' => 'email_taken',
                'message' => 'Este e-mail ja esta em uso.',
            ];
        }

        if ($this->users->findByUsername($normalizedUsername)) {
            return [
                'status' => 'username_taken',
                'message' => 'Este @usuario ja esta em uso.',
            ];
        }

        $user = DB::transaction(function () use ($name, $normalizedUsername, $email, $password, $gradeYear): User {
            $createdUser = $this->users->createStudent($name, $normalizedUsername, $email, $password);
            $this->profiles->createForUser($createdUser, $gradeYear, $name);

            return $createdUser;
        });

        return [
            'status' => 'ok',
            'payload' => $this->buildAuthPayload($user, $deviceName, false),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function buildAuthPayload(User $user, string $deviceName, bool $grantDailyLoginBonus = false): array
    {
        $studentProfile = $this->profiles->forUser($user);

        $this->energyService->refresh($studentProfile);

        if ($grantDailyLoginBonus) {
            $this->energyService->grantDailyLoginBonus($studentProfile);
        }

        $token = $user->createToken($deviceName)->plainTextToken;

        return [
            'token_type' => 'Bearer',
            'access_token' => $token,
            'user' => [
                'external_id' => $user->external_id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'profile_photo_url' => $this->profilePhotoUrl($user),
            ],
            'student_profile' => [
                'external_id' => $studentProfile->external_id,
                'grade_year' => (int) $studentProfile->grade_year,
                'level' => (int) $studentProfile->level,
                'total_xp' => (int) $studentProfile->total_xp,
                'current_streak' => (int) $studentProfile->current_streak,
                ...$this->energyService->payload($studentProfile),
            ],
        ];
    }

    private function normalizeUsername(string $username): string
    {
        $normalized = strtolower(trim($username));

        if (str_starts_with($normalized, '@')) {
            $normalized = substr($normalized, 1);
        }

        $normalized = preg_replace('/[^a-z0-9._]/', '', $normalized) ?? '';

        if (strlen($normalized) < 3) {
            throw ValidationException::withMessages([
                'username' => 'Informe um @usuario valido com pelo menos 3 caracteres.',
            ]);
        }

        return $normalized;
    }

    private function profilePhotoUrl(User $user): ?string
    {
        return $user->profile_photo_url;
    }
}
