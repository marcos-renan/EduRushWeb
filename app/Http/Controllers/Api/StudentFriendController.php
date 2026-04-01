<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\StudentFriendApiService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class StudentFriendController extends Controller
{
    public function __construct(
        private readonly StudentFriendApiService $friendService,
    ) {
    }

    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'query' => ['nullable', 'string', 'max:60'],
        ]);

        return response()->json(
            $this->friendService->search(
                $request->user(),
                (string) ($validated['query'] ?? '')
            )
        );
    }

    public function requests(Request $request): JsonResponse
    {
        return response()->json(
            $this->friendService->listRequests($request->user())
        );
    }

    public function friends(Request $request): JsonResponse
    {
        return response()->json(
            $this->friendService->listFriends($request->user())
        );
    }

    public function ranking(Request $request): JsonResponse
    {
        return response()->json(
            $this->friendService->ranking($request->user())
        );
    }

    public function storeRequest(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:40'],
        ]);

        try {
            return response()->json(
                $this->friendService->sendRequest($request->user(), (string) $validated['username']),
                201
            );
        } catch (ModelNotFoundException) {
            return response()->json([
                'message' => 'Usuario nao encontrado.',
            ], 404);
        }
    }

    public function acceptRequest(Request $request, string $requestExternalId): JsonResponse
    {
        try {
            return response()->json(
                $this->friendService->acceptRequest($request->user(), $requestExternalId)
            );
        } catch (ModelNotFoundException) {
            return response()->json([
                'message' => 'Pedido nao encontrado.',
            ], 404);
        }
    }

    public function rejectRequest(Request $request, string $requestExternalId): JsonResponse
    {
        try {
            return response()->json(
                $this->friendService->rejectRequest($request->user(), $requestExternalId)
            );
        } catch (ModelNotFoundException) {
            return response()->json([
                'message' => 'Pedido nao encontrado.',
            ], 404);
        }
    }

    public function removeFriend(Request $request, string $friendExternalId): JsonResponse
    {
        try {
            return response()->json(
                $this->friendService->removeFriend($request->user(), $friendExternalId)
            );
        } catch (ModelNotFoundException) {
            return response()->json([
                'message' => 'Amigo nao encontrado.',
            ], 404);
        } catch (ValidationException $exception) {
            throw $exception;
        }
    }
}

