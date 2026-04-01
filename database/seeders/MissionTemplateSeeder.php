<?php

namespace Database\Seeders;

use App\Models\MissionTemplate;
use Illuminate\Database\Seeder;

class MissionTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $templates = [
            [
                'mission_key' => 'daily-lesson',
                'mission_type' => 'daily',
                'title' => 'Missao diaria: aquecimento',
                'description' => 'Conclua 1 licao hoje.',
                'metric' => 'lessons_completed',
                'target' => 1,
                'reward_xp' => 20,
                'is_active' => true,
            ],
            [
                'mission_key' => 'daily-xp',
                'mission_type' => 'daily',
                'title' => 'Missao diaria: energia',
                'description' => 'Ganhe 80 XP no dia.',
                'metric' => 'xp_earned',
                'target' => 80,
                'reward_xp' => 30,
                'is_active' => true,
            ],
            [
                'mission_key' => 'weekly-lessons',
                'mission_type' => 'weekly',
                'title' => 'Missao semanal: consistencia',
                'description' => 'Conclua 5 licoes na semana.',
                'metric' => 'lessons_completed',
                'target' => 5,
                'reward_xp' => 100,
                'is_active' => true,
            ],
            [
                'mission_key' => 'weekly-xp',
                'mission_type' => 'weekly',
                'title' => 'Missao semanal: turbo XP',
                'description' => 'Acumule 500 XP na semana.',
                'metric' => 'xp_earned',
                'target' => 500,
                'reward_xp' => 120,
                'is_active' => true,
            ],
            [
                'mission_key' => 'weekly-review',
                'mission_type' => 'weekly',
                'title' => 'Missao semanal: revisao',
                'description' => 'Resolva 3 erros pendentes.',
                'metric' => 'errors_resolved',
                'target' => 3,
                'reward_xp' => 80,
                'is_active' => true,
            ],
        ];

        foreach ($templates as $template) {
            MissionTemplate::query()->updateOrCreate(
                ['mission_key' => $template['mission_key']],
                $template
            );
        }
    }
}

