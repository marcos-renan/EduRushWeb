<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Seeder;

class BadgeCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $badges = [
            [
                'slug' => 'first-lesson',
                'name' => 'Primeiro Passo',
                'description' => 'Conclua sua primeira licao.',
                'icon' => 'rocket',
                'color_hex' => '#2563eb',
                'unlock_metric' => 'lessons_completed',
                'unlock_target' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'streak-3',
                'name' => 'Em Ritmo',
                'description' => 'Mantenha 3 dias seguidos de estudo.',
                'icon' => 'flame',
                'color_hex' => '#f97316',
                'unlock_metric' => 'current_streak',
                'unlock_target' => 3,
                'is_active' => true,
            ],
            [
                'slug' => 'xp-500',
                'name' => 'Energia Total',
                'description' => 'Acumule 500 XP.',
                'icon' => 'zap',
                'color_hex' => '#7c3aed',
                'unlock_metric' => 'total_xp',
                'unlock_target' => 500,
                'is_active' => true,
            ],
            [
                'slug' => 'lessons-5',
                'name' => 'Foco Absoluto',
                'description' => 'Conclua 5 licoes.',
                'icon' => 'target',
                'color_hex' => '#0ea5e9',
                'unlock_metric' => 'lessons_completed',
                'unlock_target' => 5,
                'is_active' => true,
            ],
            [
                'slug' => 'review-5',
                'name' => 'Mestre da Revisao',
                'description' => 'Resolva 5 questoes na revisao de erros.',
                'icon' => 'shield-check',
                'color_hex' => '#10b981',
                'unlock_metric' => 'errors_resolved',
                'unlock_target' => 5,
                'is_active' => true,
            ],
            [
                'slug' => 'weekly-mission',
                'name' => 'Ritmo Semanal',
                'description' => 'Complete uma missao semanal.',
                'icon' => 'calendar-check',
                'color_hex' => '#0f766e',
                'unlock_metric' => 'weekly_missions_completed',
                'unlock_target' => 1,
                'is_active' => true,
            ],
        ];

        foreach ($badges as $badge) {
            Badge::query()->updateOrCreate(
                ['slug' => $badge['slug']],
                $badge
            );
        }
    }
}
