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
        Schema::create('mission_templates', function (Blueprint $table) {
            $table->id();
            $table->string('mission_key')->unique();
            $table->string('mission_type');
            $table->string('title');
            $table->string('description');
            $table->string('metric');
            $table->unsignedInteger('target');
            $table->unsignedInteger('reward_xp')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mission_templates');
    }
};

