<?php

use App\Http\Controllers\Web\Admin\AdminPanelController;
use App\Http\Controllers\Web\Student\StudentLearningController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function (Request $request) {
    if (Auth::check()) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    return redirect()->route('login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        if ($request->user()?->isStudent()) {
            return redirect()->route('student.dashboard');
        }

        if ($request->user()?->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }

        return inertia('dashboard');
    })->name('dashboard');

    Route::middleware(['can:access-admin'])
        ->prefix('admin')
        ->name('admin.')
        ->group(function (): void {
            Route::get('/dashboard', [AdminPanelController::class, 'dashboard'])->name('dashboard');
            Route::get('/content', [AdminPanelController::class, 'content'])->name('content');
            Route::post('/subjects', [AdminPanelController::class, 'storeSubject'])->name('subjects.store');
            Route::post('/trails', [AdminPanelController::class, 'storeTrail'])->name('trails.store');
            Route::post('/lessons', [AdminPanelController::class, 'storeLesson'])->name('lessons.store');
            Route::post('/questions', [AdminPanelController::class, 'storeQuestion'])->name('questions.store');
            Route::get('/missions', [AdminPanelController::class, 'missions'])->name('missions');
            Route::post('/missions', [AdminPanelController::class, 'storeMission'])->name('missions.store');
            Route::get('/badges', [AdminPanelController::class, 'badges'])->name('badges');
            Route::post('/badges', [AdminPanelController::class, 'storeBadge'])->name('badges.store');
            Route::get('/students', [AdminPanelController::class, 'students'])->name('students');
            Route::patch('/students/{user}/role', [AdminPanelController::class, 'updateUserRole'])->name('students.role');
        });

    Route::middleware(['can:access-student'])
        ->prefix('student')
        ->name('student.')
        ->group(function (): void {
            Route::get('/dashboard', [StudentLearningController::class, 'dashboard'])->name('dashboard');
            Route::get('/materias', [StudentLearningController::class, 'subjects'])->name('subjects');
            Route::get('/materias/{subjectSlug}', [StudentLearningController::class, 'subject'])->name('subject.show');
            Route::get('/trilhas/{trailSlug}', [StudentLearningController::class, 'trail'])->name('trail.show');
            Route::get('/licoes/{lessonSlug}', [StudentLearningController::class, 'lesson'])->name('lesson.show');
            Route::post('/licoes/{lessonSlug}/submit', [StudentLearningController::class, 'submitLesson'])->name('lesson.submit');
        });
});

require __DIR__.'/settings.php';
