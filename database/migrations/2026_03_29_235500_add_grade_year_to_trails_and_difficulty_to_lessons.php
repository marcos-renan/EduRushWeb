<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('trails', function (Blueprint $table): void {
            $table->unsignedTinyInteger('grade_year')
                ->default(1)
                ->after('subject_id');
        });

        Schema::table('lessons', function (Blueprint $table): void {
            $table->string('difficulty', 20)
                ->default('basic')
                ->after('xp_reward');
        });
    }

    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table): void {
            $table->dropColumn('difficulty');
        });

        Schema::table('trails', function (Blueprint $table): void {
            $table->dropColumn('grade_year');
        });
    }
};

