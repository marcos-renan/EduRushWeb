<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class ExternalIdBackfillSeeder extends Seeder
{
    /**
     * @var array<int, string>
     */
    private array $tables = [
        'users',
        'student_profiles',
        'subjects',
        'trails',
        'lessons',
        'questions',
        'student_missions',
        'friend_requests',
        'friendships',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->tables as $table) {
            if (! Schema::hasTable($table)) {
                continue;
            }

            DB::table($table)
                ->whereNull('external_id')
                ->orderBy('id')
                ->chunkById(200, function ($rows) use ($table): void {
                    foreach ($rows as $row) {
                        DB::table($table)
                            ->where('id', $row->id)
                            ->update(['external_id' => (string) Str::uuid()]);
                    }
                });
        }
    }
}
