<?php

namespace App\Providers;

use App\Models\User;
use App\Repositories\Contracts\LessonProgressRepositoryInterface;
use App\Repositories\Contracts\FriendRequestRepositoryInterface;
use App\Repositories\Contracts\FriendshipRepositoryInterface;
use App\Repositories\Contracts\QuestionRepositoryInterface;
use App\Repositories\Contracts\StudentProfileRepositoryInterface;
use App\Repositories\Contracts\TrailRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\FriendRequestRepository;
use App\Repositories\FriendshipRepository;
use App\Repositories\LessonProgressRepository;
use App\Repositories\QuestionRepository;
use App\Repositories\StudentProfileRepository;
use App\Repositories\TrailRepository;
use App\Repositories\UserRepository;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(StudentProfileRepositoryInterface::class, StudentProfileRepository::class);
        $this->app->bind(TrailRepositoryInterface::class, TrailRepository::class);
        $this->app->bind(LessonProgressRepositoryInterface::class, LessonProgressRepository::class);
        $this->app->bind(QuestionRepositoryInterface::class, QuestionRepository::class);
        $this->app->bind(FriendRequestRepositoryInterface::class, FriendRequestRepository::class);
        $this->app->bind(FriendshipRepositoryInterface::class, FriendshipRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request): Limit {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        Gate::define('access-admin', function (User $user): bool {
            return $user->isAdmin();
        });

        Gate::define('access-student', function (User $user): bool {
            return $user->isStudent();
        });
    }
}
