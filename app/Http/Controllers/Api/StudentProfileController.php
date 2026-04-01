<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\StudentProfileApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentProfileController extends Controller
{
    public function __construct(
        private readonly StudentProfileApiService $profileService,
    ) {
    }

    public function show(Request $request): JsonResponse
    {
        return response()->json(
            $this->profileService->show($request->user())
        );
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:120'],
            'username' => ['required', 'string', 'min:3', 'max:40', 'regex:/^@?[a-zA-Z0-9._]+$/'],
            'email' => ['required', 'email', 'max:180'],
            'grade_year' => ['nullable', 'integer', 'between:1,3'],
            'password' => ['nullable', 'string', 'min:6', 'confirmed'],
        ]);

        return response()->json(
            $this->profileService->update($request->user(), $validated)
        );
    }

    public function updatePhoto(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'photo' => ['required', 'image', 'max:5120'],
        ]);

        return response()->json(
            $this->profileService->updatePhoto($request->user(), $validated['photo'])
        );
    }
}
