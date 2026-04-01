<?php

namespace App\Http\Controllers\Web\Student;

use App\Exceptions\InsufficientEnergyException;
use App\Http\Controllers\Controller;
use App\Services\Api\StudentLessonApiService;
use App\Services\Api\StudentMissionApiService;
use App\Services\Api\StudentProfileApiService;
use App\Services\Api\StudentQuestionApiService;
use App\Services\Api\StudentTrailApiService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentLearningController extends Controller
{
    public function __construct(
        private readonly StudentTrailApiService $trailService,
        private readonly StudentMissionApiService $missionService,
        private readonly StudentProfileApiService $profileService,
        private readonly StudentQuestionApiService $questionService,
        private readonly StudentLessonApiService $lessonService,
    ) {
    }

    public function dashboard(Request $request): Response
    {
        $user = $request->user();
        $trailsPayload = $this->trailService->listForUser($user);
        $missionsPayload = $this->missionService->listForUser($user);
        $profilePayload = $this->profileService->show($user);
        $trails = $trailsPayload['data'] ?? [];

        return Inertia::render('student/dashboard', [
            'subjects' => $this->subjectSummaries($trails),
            'missions' => $missionsPayload['data'] ?? [],
            'missionMeta' => $missionsPayload['meta'] ?? [],
            'studentProfile' => $profilePayload['data']['student_profile'] ?? null,
            'nextStudyTarget' => $this->nextStudyTarget($trails),
        ]);
    }

    public function subjects(Request $request): Response
    {
        $user = $request->user();
        $trailsPayload = $this->trailService->listForUser($user);
        $profilePayload = $this->profileService->show($user);
        $trails = $trailsPayload['data'] ?? [];

        return Inertia::render('student/subjects', [
            'subjects' => $this->subjectSummaries($trails),
            'studentProfile' => $profilePayload['data']['student_profile'] ?? null,
        ]);
    }

    public function subject(Request $request, string $subjectSlug): Response
    {
        $user = $request->user();
        $trailsPayload = $this->trailService->listForUser($user);
        $profilePayload = $this->profileService->show($user);
        $trails = collect($trailsPayload['data'] ?? [])
            ->filter(fn (array $trail): bool => ($trail['subject']['slug'] ?? null) === $subjectSlug)
            ->values()
            ->all();

        abort_if(empty($trails), 404);

        return Inertia::render('student/subject', [
            'subject' => [
                'name' => $trails[0]['subject']['name'] ?? 'Matéria',
                'slug' => $subjectSlug,
            ],
            'trails' => $trails,
            'studentProfile' => $profilePayload['data']['student_profile'] ?? null,
        ]);
    }

    public function trail(Request $request, string $trailSlug): Response
    {
        try {
            $user = $request->user();
            $trailPayload = $this->trailService->showForUser($user, $trailSlug);
            $profilePayload = $this->profileService->show($user);

            return Inertia::render('student/trail', [
                'trail' => $trailPayload['data'],
                'studentProfile' => $profilePayload['data']['student_profile'] ?? null,
            ]);
        } catch (ModelNotFoundException) {
            abort(404);
        }
    }

    public function lesson(Request $request, string $lessonSlug): Response|RedirectResponse
    {
        try {
            $user = $request->user();
            $questionsPayload = $this->questionService->listByLessonSlugForUser($user, $lessonSlug);
            $trailsPayload = $this->trailService->listForUser($user);

            return Inertia::render('student/lesson', [
                'lesson' => $questionsPayload['data']['lesson'] ?? null,
                'questions' => $questionsPayload['data']['questions'] ?? [],
                'studentProfile' => $questionsPayload['data']['student_profile'] ?? null,
                'trails' => $trailsPayload['data'] ?? [],
            ]);
        } catch (InsufficientEnergyException $exception) {
            return redirect()
                ->route('student.dashboard')
                ->with('error', $exception->getMessage());
        } catch (ModelNotFoundException) {
            abort(404);
        }
    }

    public function submitLesson(Request $request, string $lessonSlug): JsonResponse
    {
        $validated = $request->validate([
            'answers' => ['array'],
            'answers.*.question_external_id' => ['required', 'string'],
            'answers.*.selected_option' => ['required', 'integer'],
        ]);

        try {
            return response()->json(
                $this->lessonService->submitAttempt(
                    $request->user(),
                    $lessonSlug,
                    $validated['answers'] ?? []
                )
            );
        } catch (InsufficientEnergyException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'next_recharge_at' => $exception->nextRechargeAt,
            ], 422);
        } catch (ModelNotFoundException) {
            abort(404);
        }
    }

    /**
     * @param  array<int, array<string, mixed>>  $trails
     * @return array<int, array<string, mixed>>
     */
    private function subjectSummaries(array $trails): array
    {
        return collect($trails)
            ->groupBy(fn (array $trail): string => (string) ($trail['subject']['slug'] ?? $trail['subject']['name'] ?? ''))
            ->map(function ($group): array {
                $first = $group->first();
                $lessonsCount = (int) $group->sum('lessons_count');
                $completedCount = (int) $group->sum('completed_lessons_count');
                $progress = $lessonsCount > 0
                    ? (int) round(($completedCount / $lessonsCount) * 100)
                    : 0;

                return [
                    'name' => $first['subject']['name'] ?? 'Matéria',
                    'slug' => $first['subject']['slug'] ?? '',
                    'trails_count' => (int) $group->count(),
                    'lessons_count' => $lessonsCount,
                    'completed_lessons_count' => $completedCount,
                    'progress_percent' => $progress,
                ];
            })
            ->sortBy('name')
            ->values()
            ->all();
    }

    /**
     * @param  array<int, array<string, mixed>>  $trails
     * @return array<string, string>|null
     */
    private function nextStudyTarget(array $trails): ?array
    {
        foreach ($trails as $trail) {
            $lessons = $trail['lessons'] ?? [];

            foreach ($lessons as $lesson) {
                if (($lesson['is_locked'] ?? true) === false && ($lesson['is_completed'] ?? false) === false) {
                    return [
                        'lesson_slug' => (string) ($lesson['slug'] ?? ''),
                        'trail_slug' => (string) ($trail['slug'] ?? ''),
                    ];
                }
            }
        }

        foreach ($trails as $trail) {
            $lessons = $trail['lessons'] ?? [];

            foreach ($lessons as $lesson) {
                if (($lesson['is_locked'] ?? true) === false) {
                    return [
                        'lesson_slug' => (string) ($lesson['slug'] ?? ''),
                        'trail_slug' => (string) ($trail['slug'] ?? ''),
                    ];
                }
            }
        }

        return null;
    }
}

