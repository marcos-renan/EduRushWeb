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
        Schema::create('student_missions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_profile_id')->constrained()->cascadeOnDelete();
            $table->string('mission_key');
            $table->string('mission_type');
            $table->string('title');
            $table->string('description');
            $table->string('metric');
            $table->unsignedInteger('target');
            $table->unsignedInteger('progress')->default(0);
            $table->unsignedInteger('reward_xp')->default(0);
            $table->date('starts_on');
            $table->date('ends_on');
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('claimed_at')->nullable();
            $table->timestamps();

            $table->unique(['student_profile_id', 'mission_key', 'starts_on']);
            $table->index(['student_profile_id', 'mission_type', 'starts_on']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_missions');
    }
};

