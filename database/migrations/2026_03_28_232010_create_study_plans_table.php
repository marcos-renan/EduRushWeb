<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('study_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trail_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('description')->nullable();
            $table->unsignedSmallInteger('weekly_lessons_goal')->default(3);
            $table->unsignedInteger('weekly_xp_goal')->default(300);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('study_plans');
    }
};

