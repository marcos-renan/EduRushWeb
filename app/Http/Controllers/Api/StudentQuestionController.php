<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\InsufficientEnergyException;
use App\Http\Controllers\Controller;
use App\Services\Api\StudentQuestionApiService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentQuestionController extends Controller
{
    public function __construct(
        private readonly StudentQuestionApiService $questionService,
    ) {
    }

    public function index(Request $request, string $lessonSlug): JsonResponse
    {
        try {
            return response()->json(
                $this->questionService->listByLessonSlugForUser($request->user(), $lessonSlug)
            );
        } catch (ModelNotFoundException) {
            abort(404);
        } catch (InsufficientEnergyException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'meta' => [
                    'energy_next_recharge_at' => $exception->nextRechargeAt,
                ],
            ], 422);
        }
    }
}
