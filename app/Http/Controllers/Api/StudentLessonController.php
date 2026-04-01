<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\InsufficientEnergyException;
use App\Http\Controllers\Controller;
use App\Services\Api\StudentLessonApiService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentLessonController extends Controller
{
    public function __construct(
        private readonly StudentLessonApiService $lessonService,
    ) {
    }

    public function submit(Request $request, string $lessonSlug): JsonResponse
    {
        $validated = $request->validate([
            'answers' => ['nullable', 'array'],
            'answers.*.question_external_id' => ['required', 'uuid'],
            'answers.*.selected_option' => ['required', 'integer', 'min:0', 'max:9'],
        ]);

        try {
            return response()->json(
                $this->lessonService->submitAttempt(
                    $request->user(),
                    $lessonSlug,
                    $validated['answers'] ?? []
                )
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
