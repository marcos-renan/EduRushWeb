<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\StudentReviewApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentReviewController extends Controller
{
    public function __construct(
        private readonly StudentReviewApiService $reviewService,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        return response()->json(
            $this->reviewService->listForUser($request->user())
        );
    }
}
