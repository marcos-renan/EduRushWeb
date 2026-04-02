<?php

namespace App\Http\Controllers\Web\Student;

use App\Exceptions\InsufficientEnergyException;
use App\Http\Controllers\Controller;
use App\Services\Api\StudentFriendApiService;
use App\Services\Api\StudentLessonApiService;
use App\Services\Api\StudentMissionApiService;
use App\Services\Api\StudentProfileApiService;
use App\Services\Api\StudentQuestionApiService;
use App\Services\Api\StudentTrailApiService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
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
        private readonly StudentFriendApiService $friendService,
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

    public function friends(Request $request): Response
    {
        $user = $request->user();
        $query = trim((string) $request->query('query', ''));
        $friendsPayload = $this->friendService->listFriends($user);
        $requestsPayload = $this->friendService->listRequests($user);
        $profilePayload = $this->profileService->show($user);
        $searchPayload = $query !== ''
            ? $this->friendService->search($user, $query)
            : [
                'data' => [],
                'meta' => [
                    'query' => '',
                    'total_results' => 0,
                ],
            ];

        return Inertia::render('student/friends', [
            'query' => $query,
            'friends' => $friendsPayload['data'] ?? [],
            'friendMeta' => $friendsPayload['meta'] ?? [],
            'requests' => $requestsPayload['data'] ?? ['incoming' => [], 'outgoing' => []],
            'requestMeta' => $requestsPayload['meta'] ?? [],
            'searchResults' => $searchPayload['data'] ?? [],
            'searchMeta' => $searchPayload['meta'] ?? [],
            'studentProfile' => $profilePayload['data']['student_profile'] ?? null,
        ]);
    }

    public function ranking(Request $request): Response
    {
        $user = $request->user();
        $rankingPayload = $this->friendService->ranking($user);
        $profilePayload = $this->profileService->show($user);

        return Inertia::render('student/ranking', [
            'ranking' => $rankingPayload['data'] ?? [],
            'rankingMeta' => $rankingPayload['meta'] ?? [],
            'studentProfile' => $profilePayload['data']['student_profile'] ?? null,
        ]);
    }

    public function sendFriendRequest(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:40'],
        ]);

        try {
            $response = $this->friendService->sendRequest($request->user(), (string) $validated['username']);
            $message = (string) ($response['data']['message'] ?? 'Pedido enviado com sucesso.');

            return redirect()
                ->route('student.friends', ['query' => $request->query('query', '')])
                ->with('success', $message);
        } catch (ModelNotFoundException) {
            return redirect()
                ->route('student.friends', ['query' => $request->query('query', '')])
                ->with('error', 'Usuário não encontrado.');
        } catch (ValidationException $exception) {
            return redirect()
                ->route('student.friends', ['query' => $request->query('query', '')])
                ->withErrors($exception->errors())
                ->with('error', $this->firstValidationErrorMessage($exception));
        }
    }

    public function acceptFriendRequest(Request $request, string $requestExternalId): RedirectResponse
    {
        try {
            $response = $this->friendService->acceptRequest($request->user(), $requestExternalId);
            $message = (string) ($response['data']['message'] ?? 'Pedido aceito com sucesso.');

            return redirect()
                ->route('student.friends')
                ->with('success', $message);
        } catch (ModelNotFoundException) {
            return redirect()
                ->route('student.friends')
                ->with('error', 'Pedido não encontrado.');
        }
    }

    public function rejectFriendRequest(Request $request, string $requestExternalId): RedirectResponse
    {
        try {
            $response = $this->friendService->rejectRequest($request->user(), $requestExternalId);
            $message = (string) ($response['data']['message'] ?? 'Pedido recusado.');

            return redirect()
                ->route('student.friends')
                ->with('success', $message);
        } catch (ModelNotFoundException) {
            return redirect()
                ->route('student.friends')
                ->with('error', 'Pedido não encontrado.');
        }
    }

    public function removeFriend(Request $request, string $friendExternalId): RedirectResponse
    {
        try {
            $response = $this->friendService->removeFriend($request->user(), $friendExternalId);
            $message = (string) ($response['data']['message'] ?? 'Amizade removida.');

            return redirect()
                ->route('student.friends')
                ->with('success', $message);
        } catch (ModelNotFoundException) {
            return redirect()
                ->route('student.friends')
                ->with('error', 'Amigo não encontrado.');
        } catch (ValidationException $exception) {
            return redirect()
                ->route('student.friends')
                ->withErrors($exception->errors())
                ->with('error', $this->firstValidationErrorMessage($exception));
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

    private function firstValidationErrorMessage(ValidationException $exception): string
    {
        return collect($exception->errors())
            ->flatten()
            ->map(fn ($message): string => (string) $message)
            ->first() ?? 'Não foi possível concluir a ação.';
    }
}
