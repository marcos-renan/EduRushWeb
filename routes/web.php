<?php

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

        return inertia('dashboard');
    })->name('dashboard');

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
