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
        Schema::table('badges', function (Blueprint $table) {
            $table->string('unlock_metric')->nullable()->after('color_hex');
            $table->unsignedInteger('unlock_target')->default(1)->after('unlock_metric');
            $table->boolean('is_active')->default(true)->after('unlock_target');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('badges', function (Blueprint $table) {
            $table->dropColumn(['unlock_metric', 'unlock_target', 'is_active']);
        });
    }
};

