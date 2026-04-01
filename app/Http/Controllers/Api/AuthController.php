<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\StudentAuthApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private readonly StudentAuthApiService $authService,
    ) {
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'device_name' => ['nullable', 'string', 'max:120'],
        ]);

        $result = $this->authService->login(
            $validated['email'],
            $validated['password'],
            $validated['device_name'] ?? 'mobile-app'
        );

        if ($result['status'] === 'invalid_credentials') {
            return response()->json([
                'message' => $result['message'],
            ], 422);
        }

        return response()->json($result['payload']);
    }

    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:120'],
            'username' => ['required', 'string', 'min:3', 'max:40', 'regex:/^@?[a-zA-Z0-9._]+$/'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'grade_year' => ['nullable', 'integer', 'min:1', 'max:3'],
            'device_name' => ['nullable', 'string', 'max:120'],
        ]);

        $result = $this->authService->register(
            $validated['name'],
            $validated['username'],
            $validated['email'],
            $validated['password'],
            (int) ($validated['grade_year'] ?? 1),
            $validated['device_name'] ?? 'mobile-app'
        );

        if ($result['status'] === 'email_taken' || $result['status'] === 'username_taken') {
            return response()->json([
                'message' => $result['message'],
            ], 422);
        }

        return response()->json($result['payload'], 201);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return response()->json([
            'message' => 'Logout realizado com sucesso.',
        ]);
    }
}
