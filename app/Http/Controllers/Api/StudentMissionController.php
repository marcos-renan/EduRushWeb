<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Api\StudentMissionApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentMissionController extends Controller
{
    public function __construct(
        private readonly StudentMissionApiService $missionService,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        return response()->json(
            $this->missionService->listForUser($request->user())
        );
    }
}
