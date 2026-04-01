<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\StudentProfile;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $normalizedUsername = $this->normalizeUsername((string) ($input['username'] ?? ''));
        $input['username'] = $normalizedUsername;

        Validator::make($input, [
            ...$this->profileRules(),
            'username' => [
                'required',
                'string',
                'min:3',
                'max:40',
                'regex:/^[a-z0-9._]+$/',
                Rule::unique(User::class, 'username'),
            ],
            'grade_year' => ['nullable', 'integer', 'min:1', 'max:3'],
            'password' => $this->passwordRules(),
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'username' => $normalizedUsername,
            'email' => $input['email'],
            'password' => $input['password'],
            'role' => 'user',
        ]);

        StudentProfile::query()->create([
            'user_id' => $user->id,
            'name' => $user->name,
            'grade_year' => (int) ($input['grade_year'] ?? 1),
            'energy' => 10,
            'energy_recharge_reference_at' => now(),
        ]);

        return $user;
    }

    private function normalizeUsername(string $username): string
    {
        $normalized = Str::lower(trim($username));

        if (str_starts_with($normalized, '@')) {
            $normalized = Str::substr($normalized, 1);
        }

        $normalized = preg_replace('/[^a-z0-9._]/', '', $normalized) ?? '';

        return $normalized;
    }
}
