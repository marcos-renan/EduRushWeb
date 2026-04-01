<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\StudentTrailApiService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentTrailController extends Controller
{
    public function __construct(
        private readonly StudentTrailApiService $trailService,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        return response()->json(
            $this->trailService->listForUser($request->user())
        );
    }

    public function show(Request $request, string $trailSlug): JsonResponse
    {
        try {
            return response()->json(
                $this->trailService->showForUser($request->user(), $trailSlug)
            );
        } catch (ModelNotFoundException) {
            abort(404);
        }
    }
}
