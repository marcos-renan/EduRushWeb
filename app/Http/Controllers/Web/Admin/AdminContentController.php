<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Subject;
use App\Models\Trail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminContentController extends Controller
{
    public function index(): Response
    {
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

    public function updateSubject(Request $request, Subject $subject): RedirectResponse
    {
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
        $subject->delete();

        return redirect()
            ->route('admin.content')
            ->with('success', 'Matéria excluída com sucesso.');
    }

    public function storeTrail(Request $request, Subject $subject): RedirectResponse
    {
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
        $subjectId = $trail->subject_id;
        $trail->delete();

        return redirect()
            ->route('admin.content.subject.show', $subjectId)
            ->with('success', 'Trilha excluída com sucesso.');
    }

    public function storeLesson(Request $request, Trail $trail): RedirectResponse
    {
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
}
