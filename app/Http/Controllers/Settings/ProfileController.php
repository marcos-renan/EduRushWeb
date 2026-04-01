<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileDeleteRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\StudentProfile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $studentProfile = $user->isStudent() ? StudentProfile::forUser($user) : null;

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'studentProfile' => $studentProfile ? [
                'grade_year' => (int) $studentProfile->grade_year,
                'level' => (int) $studentProfile->level,
                'total_xp' => (int) $studentProfile->total_xp,
                'current_streak' => (int) $studentProfile->current_streak,
                'energy' => (int) $studentProfile->energy,
            ] : null,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $user = $request->user();

        $user->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'username' => $this->normalizeUsername((string) $validated['username']),
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        if ($user->isStudent()) {
            StudentProfile::forUser($user)->update([
                'name' => $user->name,
                'grade_year' => (int) ($validated['grade_year'] ?? 1),
            ]);
        }

        return to_route('profile.edit')->with('success', 'Perfil atualizado com sucesso.');
    }

    public function updatePhoto(Request $request): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'photo' => ['required', 'image', 'max:5120'],
        ]);

        $user = $request->user();

        if ($user->profile_photo_path && Storage::disk('public')->exists($user->profile_photo_path)) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }

        $path = $validated['photo']->store('profile-photos', 'public');
        $user->forceFill(['profile_photo_path' => $path])->save();

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Foto atualizada com sucesso.',
                'data' => [
                    'profile_photo_url' => '/storage/'.ltrim($path, '/'),
                ],
            ]);
        }

        return back()->with('success', 'Foto atualizada com sucesso.');
    }

    /**
     * Delete the user's profile.
     */
    public function destroy(ProfileDeleteRequest $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    private function normalizeUsername(string $username): string
    {
        $normalized = Str::lower(trim($username));

        if (str_starts_with($normalized, '@')) {
            $normalized = Str::substr($normalized, 1);
        }

        return preg_replace('/[^a-z0-9._]/', '', $normalized) ?? '';
    }
}
