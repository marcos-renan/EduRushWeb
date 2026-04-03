<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\Lesson;
use App\Models\MissionTemplate;
use App\Models\Question;
use App\Models\StudentProfile;
use App\Models\Subject;
use App\Models\Trail;
use App\Models\User;
use App\Services\StudentEnergyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminPanelController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'subjects' => Subject::query()->count(),
                'trails' => Trail::query()->count(),
                'lessons' => Lesson::query()->count(),
                'questions' => Question::query()->count(),
                'students' => StudentProfile::query()->count(),
                'missions' => MissionTemplate::query()->count(),
                'badges' => Badge::query()->count(),
            ],
            'recentTrails' => Trail::query()
                ->with('subject:id,name')
                ->latest()
                ->limit(8)
                ->get(['id', 'subject_id', 'title', 'slug', 'grade_year', 'position', 'is_active']),
            'recentLessons' => Lesson::query()
                ->with('trail:id,title,subject_id', 'trail.subject:id,name')
                ->latest()
                ->limit(8)
                ->get(['id', 'trail_id', 'title', 'slug', 'difficulty', 'xp_reward', 'is_active']),
        ]);
    }

    public function content(): Response
    {
        return Inertia::render('admin/content', [
            'subjects' => Subject::query()
                ->withCount('trails')
                ->orderBy('name')
                ->get(['id', 'name', 'slug', 'color_hex', 'is_active']),
            'trails' => Trail::query()
                ->with('subject:id,name')
                ->withCount('lessons')
                ->orderBy('grade_year')
                ->orderBy('subject_id')
                ->orderBy('position')
                ->limit(60)
                ->get(['id', 'subject_id', 'title', 'slug', 'grade_year', 'position', 'is_active']),
            'lessons' => Lesson::query()
                ->with('trail:id,title,subject_id', 'trail.subject:id,name')
                ->withCount('questions')
                ->orderByDesc('id')
                ->limit(60)
                ->get(['id', 'trail_id', 'title', 'slug', 'position', 'difficulty', 'xp_reward', 'is_active']),
            'subjectOptions' => Subject::query()
                ->orderBy('name')
                ->get(['id', 'name']),
            'trailOptions' => Trail::query()
                ->with('subject:id,name')
                ->orderBy('title')
                ->get(['id', 'subject_id', 'title']),
            'lessonOptions' => Lesson::query()
                ->with('trail:id,title')
                ->orderBy('title')
                ->get(['id', 'trail_id', 'title']),
        ]);
    }

    public function missions(): Response
    {
        return Inertia::render('admin/missions', [
            'missions' => MissionTemplate::query()
                ->orderBy('mission_type')
                ->orderBy('title')
                ->get(),
        ]);
    }

    public function badges(): Response
    {
        return Inertia::render('admin/badges', [
            'badges' => Badge::query()
                ->orderBy('name')
                ->get()
                ->map(fn (Badge $badge) => [
                    'id' => $badge->id,
                    'slug' => $badge->slug,
                    'name' => $badge->name,
                    'description' => $badge->description,
                    'icon' => $badge->icon,
                    'image_path' => $badge->image_path,
                    'image_url' => $badge->image_blob && $badge->image_mime
                        ? route('media.badge-image', ['badge' => $badge->id], false)
                        : ($badge->image_path ? '/storage/'.ltrim((string) $badge->image_path, '/') : null),
                    'color_hex' => $badge->color_hex,
                    'unlock_metric' => $badge->unlock_metric,
                    'unlock_target' => (int) $badge->unlock_target,
                    'is_active' => (bool) $badge->is_active,
                ]),
            'metricOptions' => $this->badgeMetricOptions(),
        ]);
    }

    public function students(): Response
    {
        return Inertia::render('admin/students', [
            'students' => User::query()
                ->with('studentProfile')
                ->orderBy('name')
                ->get(['id', 'name', 'username', 'email', 'role', 'created_at']),
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
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return back()->with('success', 'Matéria criada com sucesso.');
    }

    public function storeTrail(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'subject_id' => ['required', 'exists:subjects,id'],
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
            'subject_id' => (int) $validated['subject_id'],
            'grade_year' => (int) $validated['grade_year'],
            'title' => $validated['title'],
            'slug' => $slug,
            'position' => (int) ($validated['position'] ?? 1),
            'description' => $validated['description'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return back()->with('success', 'Trilha criada com sucesso.');
    }

    public function storeLesson(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'trail_id' => ['required', 'exists:trails,id'],
            'title' => ['required', 'string', 'max:160'],
            'slug' => ['nullable', 'string', 'max:160', Rule::unique(Lesson::class, 'slug')],
            'position' => ['nullable', 'integer', 'min:1', 'max:999'],
            'objective' => ['nullable', 'string', 'max:800'],
            'content' => ['nullable', 'string'],
            'xp_reward' => ['nullable', 'integer', 'min:0', 'max:5000'],
            'difficulty' => ['required', Rule::in(['basic', 'intermediate', 'advanced'])],
            'prerequisite_lesson_id' => ['nullable', 'exists:lessons,id'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $baseSlug = Str::slug((string) ($validated['slug'] ?? $validated['title']));
        $slug = $this->uniqueSlug(Lesson::class, $baseSlug);

        Lesson::query()->create([
            'trail_id' => (int) $validated['trail_id'],
            'prerequisite_lesson_id' => $validated['prerequisite_lesson_id'] ?? null,
            'title' => $validated['title'],
            'slug' => $slug,
            'position' => (int) ($validated['position'] ?? 1),
            'objective' => $validated['objective'] ?? null,
            'content' => $validated['content'] ?? null,
            'xp_reward' => (int) ($validated['xp_reward'] ?? 20),
            'difficulty' => $validated['difficulty'],
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return back()->with('success', 'Lição criada com sucesso.');
    }

    public function storeQuestion(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'lesson_id' => ['required', 'exists:lessons,id'],
            'position' => ['nullable', 'integer', 'min:1', 'max:999'],
            'prompt' => ['required', 'string', 'max:500'],
            'option_0' => ['required', 'string', 'max:255'],
            'option_1' => ['required', 'string', 'max:255'],
            'option_2' => ['required', 'string', 'max:255'],
            'option_3' => ['required', 'string', 'max:255'],
            'correct_option' => ['required', 'integer', 'between:0,3'],
            'explanation' => ['nullable', 'string', 'max:800'],
            'xp_reward' => ['nullable', 'integer', 'min:0', 'max:500'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        Question::query()->create([
            'lesson_id' => (int) $validated['lesson_id'],
            'position' => (int) ($validated['position'] ?? 1),
            'prompt' => $validated['prompt'],
            'options' => [
                $validated['option_0'],
                $validated['option_1'],
                $validated['option_2'],
                $validated['option_3'],
            ],
            'correct_option' => (int) $validated['correct_option'],
            'explanation' => $validated['explanation'] ?? null,
            'xp_reward' => (int) ($validated['xp_reward'] ?? 5),
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return back()->with('success', 'Questão criada com sucesso.');
    }

    public function storeMission(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'mission_key' => ['nullable', 'string', 'max:120', Rule::unique(MissionTemplate::class, 'mission_key')],
            'mission_type' => ['required', Rule::in(['daily', 'weekly'])],
            'title' => ['required', 'string', 'max:140'],
            'description' => ['required', 'string', 'max:300'],
            'metric' => ['required', 'string', 'max:80'],
            'target' => ['required', 'integer', 'min:1', 'max:9999'],
            'reward_xp' => ['required', 'integer', 'min:0', 'max:5000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $baseKey = Str::snake($validated['mission_key'] ?: Str::slug($validated['title'], '_'));
        $missionKey = $this->uniqueSlug(MissionTemplate::class, $baseKey, 'mission_key');

        MissionTemplate::query()->create([
            'mission_key' => $missionKey,
            'mission_type' => $validated['mission_type'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'metric' => $validated['metric'],
            'target' => (int) $validated['target'],
            'reward_xp' => (int) $validated['reward_xp'],
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return back()->with('success', 'Missão criada com sucesso.');
    }

    public function storeBadge(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'slug' => ['nullable', 'string', 'max:120', Rule::unique(Badge::class, 'slug')],
            'name' => ['required', 'string', 'max:140'],
            'description' => ['required', 'string', 'max:300'],
            'icon' => ['nullable', 'string', 'max:80'],
            'image' => ['nullable', 'image', 'mimes:png,webp,jpg,jpeg,avif', 'max:5120'],
            'color_hex' => ['nullable', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'unlock_metric' => ['nullable', Rule::in($this->badgeMetricValues())],
            'unlock_target' => ['required', 'integer', 'min:1', 'max:9999'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $baseSlug = Str::slug((string) ($validated['slug'] ?? $validated['name']));
        $slug = $this->uniqueSlug(Badge::class, $baseSlug);
        $imageBlob = null;
        $imageMime = null;
        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $rawImage = file_get_contents($imageFile->getRealPath());
            $imageBlob = $rawImage === false ? null : $rawImage;
            $imageMime = $imageFile->getMimeType() ?: null;
        }

        Badge::query()->create([
            'slug' => $slug,
            'name' => $validated['name'],
            'description' => $validated['description'],
            'icon' => $validated['icon'] ?? null,
            'image_path' => null,
            'image_blob' => $imageBlob,
            'image_mime' => $imageMime,
            'color_hex' => $validated['color_hex'] ?? '#2563eb',
            'unlock_metric' => $validated['unlock_metric'] ?? null,
            'unlock_target' => (int) $validated['unlock_target'],
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return back()->with('success', 'Badge criado com sucesso.');
    }

    private function badgeMetricOptions(): array
    {
        return [
            ['value' => 'total_xp', 'label' => 'XP total'],
            ['value' => 'streak_days', 'label' => 'Dias de sequência'],
            ['value' => 'weekly_missions_completed', 'label' => 'Missões semanais concluídas'],
            ['value' => 'daily_missions_completed', 'label' => 'Missões diárias concluídas'],
            ['value' => 'trails_completed', 'label' => 'Trilhas concluídas'],
            ['value' => 'subjects_completed', 'label' => 'Matérias concluídas'],
            ['value' => 'lessons_completed', 'label' => 'Lições concluídas'],
            ['value' => 'perfect_lessons_count', 'label' => 'Lições com 100% de acerto'],
            ['value' => 'correct_answers_count', 'label' => 'Respostas corretas'],
            ['value' => 'friend_count', 'label' => 'Amigos adicionados'],
        ];
    }

    private function badgeMetricValues(): array
    {
        return array_values(array_map(
            fn (array $option) => (string) $option['value'],
            $this->badgeMetricOptions(),
        ));
    }

    public function updateUserRole(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role' => ['required', Rule::in(['admin', 'user'])],
        ]);

        $targetRole = $validated['role'];

        if ($targetRole === 'admin') {
            StudentProfile::query()
                ->where('user_id', $user->id)
                ->delete();
        } else {
            StudentProfile::query()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'name' => $user->name,
                    'grade_year' => 1,
                    'energy' => StudentEnergyService::DEFAULT_ENERGY,
                    'energy_recharge_reference_at' => now(),
                ]
            );
        }

        $user->forceFill(['role' => $targetRole])->save();

        return back()->with('success', 'Perfil de acesso atualizado com sucesso.');
    }

    private function uniqueSlug(string $modelClass, string $base, string $column = 'slug'): string
    {
        $base = trim($base) !== '' ? $base : Str::random(8);
        $candidate = $base;
        $i = 2;

        while ($modelClass::query()->where($column, $candidate)->exists()) {
            $candidate = $base.'-'.$i;
            $i++;
        }

        return $candidate;
    }
}
