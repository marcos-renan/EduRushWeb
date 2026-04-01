<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentFriendController;
use App\Http\Controllers\Api\StudentLessonController;
use App\Http\Controllers\Api\StudentMissionController;
use App\Http\Controllers\Api\StudentProfileController;
use App\Http\Controllers\Api\StudentQuestionController;
use App\Http\Controllers\Api\StudentReviewController;
use App\Http\Controllers\Api\StudentTrailController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'service' => 'edurush-api',
            'timestamp' => now()->toIso8601String(),
        ]);
    });

    Route::post('/auth/login', [AuthController::class, 'login'])
        ->middleware('throttle:api');
    Route::post('/auth/register', [AuthController::class, 'register'])
        ->middleware('throttle:api');

    Route::middleware(['auth:sanctum', 'can:access-student'])->group(function (): void {
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::prefix('/student')->group(function (): void {
            Route::get('/trails', [StudentTrailController::class, 'index']);
            Route::get('/trails/{trailSlug}', [StudentTrailController::class, 'show']);
            Route::get('/missions', [StudentMissionController::class, 'index']);
            Route::get('/friends/search', [StudentFriendController::class, 'search']);
            Route::get('/friends/requests', [StudentFriendController::class, 'requests']);
            Route::get('/friends', [StudentFriendController::class, 'friends']);
            Route::get('/friends/ranking', [StudentFriendController::class, 'ranking']);
            Route::post('/friends/requests', [StudentFriendController::class, 'storeRequest']);
            Route::post('/friends/requests/{requestExternalId}/accept', [StudentFriendController::class, 'acceptRequest']);
            Route::post('/friends/requests/{requestExternalId}/reject', [StudentFriendController::class, 'rejectRequest']);
            Route::delete('/friends/{friendExternalId}', [StudentFriendController::class, 'removeFriend']);
            Route::get('/review/errors', [StudentReviewController::class, 'index']);
            Route::get('/profile', [StudentProfileController::class, 'show']);
            Route::put('/profile', [StudentProfileController::class, 'update']);
            Route::post('/profile/photo', [StudentProfileController::class, 'updatePhoto']);
            Route::get('/lessons/{lessonSlug}/questions', [StudentQuestionController::class, 'index']);
            Route::post('/lessons/{lessonSlug}/submit', [StudentLessonController::class, 'submit']);
        });
    });
});
