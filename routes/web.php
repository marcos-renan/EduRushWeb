<?php

use App\Http\Controllers\Web\Admin\AdminPanelController;
use App\Http\Controllers\Web\Admin\AdminContentController;
use App\Http\Controllers\Settings\ProfileController as SettingsProfileController;
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
            Route::get('/profile', [SettingsProfileController::class, 'adminEdit'])->name('profile');
            Route::get('/content', [AdminContentController::class, 'index'])->name('content');
            Route::post('/content/subjects', [AdminContentController::class, 'storeSubject'])->name('content.subject.store');
            Route::get('/content/subjects/{subject}', [AdminContentController::class, 'showSubject'])->name('content.subject.show');
            Route::patch('/content/subjects/{subject}', [AdminContentController::class, 'updateSubject'])->name('content.subject.update');
            Route::delete('/content/subjects/{subject}', [AdminContentController::class, 'destroySubject'])->name('content.subject.destroy');
            Route::post('/content/subjects/{subject}/trails', [AdminContentController::class, 'storeTrail'])->name('content.trail.store');
            Route::get('/content/trails/{trail}', [AdminContentController::class, 'showTrail'])->name('content.trail.show');
            Route::patch('/content/trails/{trail}', [AdminContentController::class, 'updateTrail'])->name('content.trail.update');
            Route::delete('/content/trails/{trail}', [AdminContentController::class, 'destroyTrail'])->name('content.trail.destroy');
            Route::post('/content/trails/{trail}/lessons', [AdminContentController::class, 'storeLesson'])->name('content.lesson.store');
            Route::get('/content/lessons/{lesson}', [AdminContentController::class, 'showLesson'])->name('content.lesson.show');
            Route::patch('/content/lessons/{lesson}', [AdminContentController::class, 'updateLesson'])->name('content.lesson.update');
            Route::delete('/content/lessons/{lesson}', [AdminContentController::class, 'destroyLesson'])->name('content.lesson.destroy');
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
            Route::get('/profile', [SettingsProfileController::class, 'studentEdit'])->name('profile');
            Route::get('/materias', [StudentLearningController::class, 'subjects'])->name('subjects');
            Route::get('/materias/{subjectSlug}', [StudentLearningController::class, 'subject'])->name('subject.show');
            Route::get('/trilhas/{trailSlug}', [StudentLearningController::class, 'trail'])->name('trail.show');
            Route::get('/licoes/{lessonSlug}', [StudentLearningController::class, 'lesson'])->name('lesson.show');
            Route::post('/licoes/{lessonSlug}/submit', [StudentLearningController::class, 'submitLesson'])->name('lesson.submit');
        });
});

require __DIR__.'/settings.php';
