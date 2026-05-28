<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Question;
use App\Models\Subject;
use App\Models\Trail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminContentController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Subject::class);

        return Inertia::render('admin/content', [
            'subjects' => Subject::query()
                ->withCount('trails')
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                    'slug',
                    'description',
                    'color_hex',
                    'icon',
                    'is_active',
                ]),
        ]);
    }

    public function showSubject(Subject $subject): Response
    {
        $this->authorize('view', $subject);

        $subject->loadCount('trails');

        return Inertia::render('admin/content-subject', [
            'subject' => $subject->only([
                'id',
                'name',
                'slug',
                'description',
                'color_hex',
                'icon',
                'is_active',
            ]),
            'trails' => $subject->trails()
                ->withCount('lessons')
                ->orderBy('grade_year')
                ->orderBy('position')
                ->get([
                    'id',
                    'subject_id',
                    'title',
                    'slug',
                    'grade_year',
                    'position',
                    'description',
                    'is_active',
                ]),
        ]);
    }

    public function showTrail(Trail $trail): Response
    {
        $this->authorize('view', $trail);

        $trail->load('subject:id,name,slug');

        return Inertia::render('admin/content-trail', [
            'trail' => [
                'id' => $trail->id,
                'subject_id' => $trail->subject_id,
                'title' => $trail->title,
                'slug' => $trail->slug,
                'grade_year' => $trail->grade_year,
                'position' => $trail->position,
                'description' => $trail->description,
                'is_active' => $trail->is_active,
                'subject' => $trail->subject,
            ],
            'lessons' => $trail->lessons()
                ->withCount('questions')
                ->orderBy('position')
                ->get([
                    'id',
                    'trail_id',
                    'title',
                    'slug',
                    'position',
                    'objective',
                    'xp_reward',
                    'difficulty',
                    'is_active',
                    'prerequisite_lesson_id',
                ]),
            'lessonOptions' => $trail->lessons()
                ->orderBy('position')
                ->get(['id', 'title']),
        ]);
    }

    public function showLesson(Lesson $lesson): Response
    {
        $this->authorize('view', $lesson);

        $lesson->load('trail:id,title,subject_id', 'trail.subject:id,name');

        return Inertia::render('admin/content-lesson', [
            'lesson' => [
                'id' => $lesson->id,
                'trail_id' => $lesson->trail_id,
                'title' => $lesson->title,
                'slug' => $lesson->slug,
                'position' => $lesson->position,
                'objective' => $lesson->objective,
                'content' => $lesson->content,
                'xp_reward' => $lesson->xp_reward,
                'difficulty' => $lesson->difficulty,
                'is_active' => $lesson->is_active,
                'prerequisite_lesson_id' => $lesson->prerequisite_lesson_id,
                'trail' => $lesson->trail,
            ],
            'lessonOptions' => Lesson::query()
                ->where('trail_id', $lesson->trail_id)
                ->where('id', '!=', $lesson->id)
                ->orderBy('position')
                ->get(['id', 'title']),
        ]);
    }

    public function storeSubject(Request $request): RedirectResponse
    {
        $this->authorize('create', Subject::class);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'slug' => ['nullable', 'string', 'max:120', Rule::unique(Subject::class, 'slug')],
            'description' => ['nullable', 'string', 'max:500'],
            'color_hex' => ['nullable', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'icon' => ['nullable', 'string', 'max:40'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $baseSlug = Str::slug((string) ($validated['slug'] ?? $validated['name']));
        $slug = $this->uniqueSlug(Subject::class, $baseSlug);

        Subject::query()->create([
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'color_hex' => $validated['color_hex'] ?? '#2563eb',
            'icon' => $validated['icon'] ?? null,
            'is_active' => $this->toBool($validated['is_active'] ?? true),
        ]);

        return redirect()
            ->route('admin.content')
            ->with('success', 'Matéria criada com sucesso.');
    }

    public function importJson(Request $request): RedirectResponse
    {
        $this->authorize('create', Subject::class);
        $this->authorize('create', Trail::class);
        $this->authorize('create', Lesson::class);

        $validated = $request->validate([
            'content_file' => ['required', 'file', 'mimetypes:application/json,text/plain', 'max:2048'],
        ]);

        $rawContent = file_get_contents($validated['content_file']->getRealPath());
        $payload = json_decode((string) $rawContent, true);

        if (! is_array($payload) || ! isset($payload['subjects']) || ! is_array($payload['subjects'])) {
            throw ValidationException::withMessages([
                'content_file' => 'O JSON precisa conter uma chave "subjects" com uma lista de matérias.',
            ]);
        }

        $stats = DB::transaction(function () use ($payload): array {
            $stats = [
                'subjects' => 0,
                'trails' => 0,
                'lessons' => 0,
                'questions' => 0,
            ];

            foreach ($payload['subjects'] as $subjectIndex => $subjectData) {
                if (! is_array($subjectData) || empty($subjectData['name'])) {
                    throw ValidationException::withMessages([
                        'content_file' => 'Matéria inválida na posição '.($subjectIndex + 1).'.',
                    ]);
                }

                $subject = Subject::query()->create([
                    'name' => (string) $subjectData['name'],
                    'slug' => $this->uniqueSlug(
                        Subject::class,
                        Str::slug((string) ($subjectData['slug'] ?? $subjectData['name']))
                    ),
                    'description' => $subjectData['description'] ?? null,
                    'color_hex' => $this->validColor($subjectData['color_hex'] ?? null),
                    'icon' => $subjectData['icon'] ?? null,
                    'is_active' => $this->toBool($subjectData['is_active'] ?? true),
                ]);
                $stats['subjects']++;

                foreach (($subjectData['trails'] ?? []) as $trailIndex => $trailData) {
                    if (! is_array($trailData) || empty($trailData['title'])) {
                        throw ValidationException::withMessages([
                            'content_file' => "Trilha inválida em {$subject->name}, posição ".($trailIndex + 1).'.',
                        ]);
                    }

                    $trail = Trail::query()->create([
                        'subject_id' => $subject->id,
                        'grade_year' => max(1, min(3, (int) ($trailData['grade_year'] ?? 1))),
                        'title' => (string) $trailData['title'],
                        'slug' => $this->uniqueSlug(
                            Trail::class,
                            Str::slug((string) ($trailData['slug'] ?? $trailData['title']))
                        ),
                        'position' => (int) ($trailData['position'] ?? ($trailIndex + 1)),
                        'description' => $trailData['description'] ?? null,
                        'is_active' => $this->toBool($trailData['is_active'] ?? true),
                    ]);
                    $stats['trails']++;

                    $previousLesson = null;
                    foreach (($trailData['lessons'] ?? []) as $lessonIndex => $lessonData) {
                        if (! is_array($lessonData) || empty($lessonData['title'])) {
                            throw ValidationException::withMessages([
                                'content_file' => "Lição inválida em {$trail->title}, posição ".($lessonIndex + 1).'.',
                            ]);
                        }

                        $lesson = Lesson::query()->create([
                            'trail_id' => $trail->id,
                            'prerequisite_lesson_id' => $lessonData['prerequisite_lesson_id'] ?? $previousLesson?->id,
                            'title' => (string) $lessonData['title'],
                            'slug' => $this->uniqueSlug(
                                Lesson::class,
                                Str::slug((string) ($lessonData['slug'] ?? $lessonData['title']))
                            ),
                            'position' => (int) ($lessonData['position'] ?? ($lessonIndex + 1)),
                            'objective' => $lessonData['objective'] ?? null,
                            'content' => $lessonData['content'] ?? null,
                            'xp_reward' => max(0, min(5000, (int) ($lessonData['xp_reward'] ?? 20))),
                            'difficulty' => $this->validDifficulty($lessonData['difficulty'] ?? $trailData['difficulty'] ?? 'basic'),
                            'is_active' => $this->toBool($lessonData['is_active'] ?? true),
                        ]);
                        $stats['lessons']++;

                        foreach (($lessonData['questions'] ?? []) as $questionIndex => $questionData) {
                            if (! is_array($questionData)) {
                                throw ValidationException::withMessages([
                                    'content_file' => "Questão inválida em {$lesson->title}, posição ".($questionIndex + 1).'.',
                                ]);
                            }

                            $options = $questionData['options'] ?? [];
                            if (! is_array($options) || count($options) < 2 || empty($questionData['prompt'])) {
                                throw ValidationException::withMessages([
                                    'content_file' => "Questão em {$lesson->title} precisa de enunciado e ao menos duas alternativas.",
                                ]);
                            }

                            $correctOption = (int) ($questionData['correct_option'] ?? 0);
                            if ($correctOption < 0 || $correctOption >= count($options)) {
                                throw ValidationException::withMessages([
                                    'content_file' => "Questão em {$lesson->title} possui correct_option fora do intervalo.",
                                ]);
                            }

                            Question::query()->create([
                                'lesson_id' => $lesson->id,
                                'position' => (int) ($questionData['position'] ?? ($questionIndex + 1)),
                                'prompt' => (string) $questionData['prompt'],
                                'options' => array_values($options),
                                'correct_option' => $correctOption,
                                'explanation' => $questionData['explanation'] ?? null,
                                'xp_reward' => max(0, min(5000, (int) ($questionData['xp_reward'] ?? 5))),
                                'is_active' => $this->toBool($questionData['is_active'] ?? true),
                            ]);
                            $stats['questions']++;
                        }

                        $previousLesson = $lesson;
                    }
                }
            }

            return $stats;
        });

        return redirect()
            ->route('admin.content')
            ->with(
                'success',
                "JSON importado: {$stats['subjects']} matérias, {$stats['trails']} trilhas, {$stats['lessons']} lições e {$stats['questions']} questões."
            );
    }

    public function updateSubject(Request $request, Subject $subject): RedirectResponse
    {
        $this->authorize('update', $subject);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'slug' => ['nullable', 'string', 'max:120', Rule::unique(Subject::class, 'slug')->ignore($subject->id)],
            'description' => ['nullable', 'string', 'max:500'],
            'color_hex' => ['nullable', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'icon' => ['nullable', 'string', 'max:40'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $subject->update([
            'name' => $validated['name'],
            'slug' => $validated['slug']
                ? $this->uniqueSlug(Subject::class, Str::slug((string) $validated['slug']), 'slug', $subject->id)
                : $subject->slug,
            'description' => $validated['description'] ?? null,
            'color_hex' => $validated['color_hex'] ?? '#2563eb',
            'icon' => $validated['icon'] ?? null,
            'is_active' => $this->toBool($validated['is_active'] ?? true),
        ]);

        return back()->with('success', 'Matéria atualizada com sucesso.');
    }

    public function destroySubject(Subject $subject): RedirectResponse
    {
        $this->authorize('delete', $subject);

        $subject->delete();

        return redirect()
            ->route('admin.content')
            ->with('success', 'Matéria excluída com sucesso.');
    }

    public function storeTrail(Request $request, Subject $subject): RedirectResponse
    {
        $this->authorize('create', Trail::class);
        $this->authorize('view', $subject);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'slug' => ['nullable', 'string', 'max:160', Rule::unique(Trail::class, 'slug')],
            'grade_year' => ['required', 'integer', 'between:1,3'],
            'position' => ['nullable', 'integer', 'min:1', 'max:999'],
            'description' => ['nullable', 'string', 'max:800'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $baseSlug = Str::slug((string) ($validated['slug'] ?? $validated['title']));
        $slug = $this->uniqueSlug(Trail::class, $baseSlug);

        Trail::query()->create([
            'subject_id' => $subject->id,
            'grade_year' => (int) $validated['grade_year'],
            'title' => $validated['title'],
            'slug' => $slug,
            'position' => (int) ($validated['position'] ?? 1),
            'description' => $validated['description'] ?? null,
            'is_active' => $this->toBool($validated['is_active'] ?? true),
        ]);

        return back()->with('success', 'Trilha criada com sucesso.');
    }

    public function updateTrail(Request $request, Trail $trail): RedirectResponse
    {
        $this->authorize('update', $trail);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'slug' => ['nullable', 'string', 'max:160', Rule::unique(Trail::class, 'slug')->ignore($trail->id)],
            'grade_year' => ['required', 'integer', 'between:1,3'],
            'position' => ['nullable', 'integer', 'min:1', 'max:999'],
            'description' => ['nullable', 'string', 'max:800'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $trail->update([
            'title' => $validated['title'],
            'slug' => $validated['slug']
                ? $this->uniqueSlug(Trail::class, Str::slug((string) $validated['slug']), 'slug', $trail->id)
                : $trail->slug,
            'grade_year' => (int) $validated['grade_year'],
            'position' => (int) ($validated['position'] ?? 1),
            'description' => $validated['description'] ?? null,
            'is_active' => $this->toBool($validated['is_active'] ?? true),
        ]);

        return back()->with('success', 'Trilha atualizada com sucesso.');
    }

    public function destroyTrail(Trail $trail): RedirectResponse
    {
        $this->authorize('delete', $trail);

        $subjectId = $trail->subject_id;
        $trail->delete();

        return redirect()
            ->route('admin.content.subject.show', $subjectId)
            ->with('success', 'Trilha excluída com sucesso.');
    }

    public function storeLesson(Request $request, Trail $trail): RedirectResponse
    {
        $this->authorize('create', Lesson::class);
        $this->authorize('view', $trail);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'slug' => ['nullable', 'string', 'max:160', Rule::unique(Lesson::class, 'slug')],
            'position' => ['nullable', 'integer', 'min:1', 'max:999'],
            'objective' => ['nullable', 'string', 'max:800'],
            'content' => ['nullable', 'string'],
            'xp_reward' => ['nullable', 'integer', 'min:0', 'max:5000'],
            'difficulty' => ['required', Rule::in(['basic', 'intermediate', 'advanced'])],
            'prerequisite_lesson_id' => ['nullable', Rule::exists('lessons', 'id')->where('trail_id', $trail->id)],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $baseSlug = Str::slug((string) ($validated['slug'] ?? $validated['title']));
        $slug = $this->uniqueSlug(Lesson::class, $baseSlug);

        Lesson::query()->create([
            'trail_id' => $trail->id,
            'prerequisite_lesson_id' => $validated['prerequisite_lesson_id'] ?? null,
            'title' => $validated['title'],
            'slug' => $slug,
            'position' => (int) ($validated['position'] ?? 1),
            'objective' => $validated['objective'] ?? null,
            'content' => $validated['content'] ?? null,
            'xp_reward' => (int) ($validated['xp_reward'] ?? 20),
            'difficulty' => $validated['difficulty'],
            'is_active' => $this->toBool($validated['is_active'] ?? true),
        ]);

        return back()->with('success', 'Lição criada com sucesso.');
    }

    public function updateLesson(Request $request, Lesson $lesson): RedirectResponse
    {
        $this->authorize('update', $lesson);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'slug' => ['nullable', 'string', 'max:160', Rule::unique(Lesson::class, 'slug')->ignore($lesson->id)],
            'position' => ['nullable', 'integer', 'min:1', 'max:999'],
            'objective' => ['nullable', 'string', 'max:800'],
            'content' => ['nullable', 'string'],
            'xp_reward' => ['nullable', 'integer', 'min:0', 'max:5000'],
            'difficulty' => ['required', Rule::in(['basic', 'intermediate', 'advanced'])],
            'prerequisite_lesson_id' => ['nullable', Rule::exists('lessons', 'id')->where('trail_id', $lesson->trail_id)],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $lesson->update([
            'title' => $validated['title'],
            'slug' => $validated['slug']
                ? $this->uniqueSlug(Lesson::class, Str::slug((string) $validated['slug']), 'slug', $lesson->id)
                : $lesson->slug,
            'position' => (int) ($validated['position'] ?? 1),
            'objective' => $validated['objective'] ?? null,
            'content' => $validated['content'] ?? null,
            'xp_reward' => (int) ($validated['xp_reward'] ?? 20),
            'difficulty' => $validated['difficulty'],
            'prerequisite_lesson_id' => $validated['prerequisite_lesson_id'] ?? null,
            'is_active' => $this->toBool($validated['is_active'] ?? true),
        ]);

        return back()->with('success', 'Lição atualizada com sucesso.');
    }

    public function destroyLesson(Lesson $lesson): RedirectResponse
    {
        $this->authorize('delete', $lesson);

        $trailId = $lesson->trail_id;
        $lesson->delete();

        return redirect()
            ->route('admin.content.trail.show', $trailId)
            ->with('success', 'Lição excluída com sucesso.');
    }

    private function uniqueSlug(string $modelClass, string $base, string $column = 'slug', ?int $ignoreId = null): string
    {
        $base = trim($base) !== '' ? $base : Str::random(8);
        $candidate = $base;
        $i = 2;

        while (
            $modelClass::query()
                ->when($ignoreId !== null, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->where($column, $candidate)
                ->exists()
        ) {
            $candidate = $base.'-'.$i;
            $i++;
        }

        return $candidate;
    }

    private function toBool(mixed $value, bool $default = true): bool
    {
        if ($value === null) {
            return $default;
        }

        return filter_var($value, FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE) ?? $default;
    }

    private function validColor(mixed $value): string
    {
        return is_string($value) && preg_match('/^#[0-9A-Fa-f]{6}$/', $value)
            ? $value
            : '#2563eb';
    }

    private function validDifficulty(mixed $value): string
    {
        return in_array($value, ['basic', 'intermediate', 'advanced'], true)
            ? (string) $value
            : 'basic';
    }
}
