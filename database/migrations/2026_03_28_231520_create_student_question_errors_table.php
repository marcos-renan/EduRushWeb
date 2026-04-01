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
        Schema::create('student_question_errors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_profile_id')->constrained()->cascadeOnDelete();
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $table->foreignId('question_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('attempts')->default(1);
            $table->unsignedTinyInteger('last_selected_option')->nullable();
            $table->unsignedTinyInteger('last_correct_option');
            $table->timestamp('last_answered_at');
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();

            $table->unique(['student_profile_id', 'question_id']);
            $table->index(['student_profile_id', 'resolved_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_question_errors');
    }
};

