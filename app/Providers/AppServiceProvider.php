<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Badge;
use App\Models\Lesson;
use App\Models\MissionTemplate;
use App\Models\Subject;
use App\Models\Trail;
use App\Policies\BadgePolicy;
use App\Policies\LessonPolicy;
use App\Policies\MissionTemplatePolicy;
use App\Policies\SubjectPolicy;
use App\Policies\TrailPolicy;
use App\Policies\UserPolicy;
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
        Gate::policy(User::class, UserPolicy::class);
        Gate::policy(Subject::class, SubjectPolicy::class);
        Gate::policy(Trail::class, TrailPolicy::class);
        Gate::policy(Lesson::class, LessonPolicy::class);
        Gate::policy(Badge::class, BadgePolicy::class);
        Gate::policy(MissionTemplate::class, MissionTemplatePolicy::class);

        RateLimiter::for('api', function (Request $request): Limit {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        Gate::define('access-admin', function (User $user): bool {
            return (new UserPolicy)->accessAdmin($user);
        });

        Gate::define('access-student', function (User $user): bool {
            return (new UserPolicy)->accessStudent($user);
        });
    }
}
