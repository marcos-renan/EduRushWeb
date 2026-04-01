<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
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
    ];

    public function up(): void
    {
        foreach ($this->tables as $table) {
            Schema::table($table, function (Blueprint $blueprint): void {
                $blueprint->uuid('external_id')->nullable()->unique();
            });
        }

        foreach ($this->tables as $table) {
            DB::table($table)
                ->whereNull('external_id')
                ->orderBy('id')
                ->chunkById(100, function ($rows) use ($table): void {
                    foreach ($rows as $row) {
                        DB::table($table)
                            ->where('id', $row->id)
                            ->update(['external_id' => (string) Str::uuid()]);
                    }
                });
        }
    }

    public function down(): void
    {
        foreach ($this->tables as $table) {
            Schema::table($table, function (Blueprint $blueprint) use ($table): void {
                $blueprint->dropUnique("{$table}_external_id_unique");
                $blueprint->dropColumn('external_id');
            });
        }
    }
};
