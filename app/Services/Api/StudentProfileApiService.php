<?php

namespace App\Services\Api;

use App\Models\StudentProfile;
use App\Models\User;
use App\Repositories\Contracts\StudentProfileRepositoryInterface;
use App\Services\StudentEnergyService;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class StudentProfileApiService
{
    public function __construct(
        private readonly StudentProfileRepositoryInterface $profiles,
        private readonly StudentEnergyService $energyService,
    ) {
    }

    /**
     * @return array{data: array<string, mixed>}
     */
    public function show(User $user): array
    {
        return [
            'data' => $this->buildPayload($user),
        ];
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array{data: array<string, mixed>}
     */
    public function update(User $user, array $validated): array
    {
        validator($validated, [
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
            'username' => ['required', 'string', 'min:3', 'max:40', 'regex:/^@?[a-zA-Z0-9._]+$/', Rule::unique('users', 'username')->ignore($user->id)],
        ])->validate();

        $user->name = (string) $validated['name'];
        $user->username = $this->normalizeUsername((string) $validated['username']);
        $user->email = (string) $validated['email'];

        if (! empty($validated['password'])) {
            $user->password = (string) $validated['password'];
        }

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        if ($user->isStudent()) {
            $this->profiles->forUser($user)->update([
                'name' => $user->name,
                'grade_year' => (int) ($validated['grade_year'] ?? 1),
            ]);
        }

        return [
            'data' => $this->buildPayload($user->fresh()),
        ];
    }

    /**
     * @return array{data: array<string, mixed>}
     */
    public function updatePhoto(User $user, UploadedFile $photo): array
    {
        if (! $photo->isValid()) {
            throw ValidationException::withMessages([
                'photo' => 'Nao foi possivel processar a imagem enviada.',
            ]);
        }

        $photoBlob = file_get_contents($photo->getRealPath());
        $mime = $photo->getMimeType();

        $user->profile_photo_blob = $photoBlob === false ? null : $photoBlob;
        $user->profile_photo_mime = $mime ?: null;
        $user->profile_photo_path = null;
        $user->save();

        return [
            'data' => $this->buildPayload($user->fresh()),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function buildPayload(User $user): array
    {
        $studentProfile = $user->isStudent() ? $this->profiles->forUser($user) : null;

        return [
            'user' => [
                'external_id' => $user->external_id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'profile_photo_url' => $this->profilePhotoUrl($user),
            ],
            'student_profile' => $this->studentProfilePayload($studentProfile),
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    private function studentProfilePayload(?StudentProfile $profile): ?array
    {
        if (! $profile) {
            return null;
        }

        $this->energyService->refresh($profile);

        return [
            'external_id' => $profile->external_id,
            'grade_year' => (int) $profile->grade_year,
            'level' => (int) $profile->level,
            'total_xp' => (int) $profile->total_xp,
            'current_streak' => (int) $profile->current_streak,
            ...$this->energyService->payload($profile),
        ];
    }

    private function profilePhotoUrl(User $user): ?string
    {
        return $user->profile_photo_url;
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
}
