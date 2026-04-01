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
        Schema::table('student_profiles', function (Blueprint $table) {
            $table->unsignedSmallInteger('energy')
                ->default(10)
                ->after('lives');
            $table->timestamp('energy_recharge_reference_at')
                ->nullable()
                ->after('energy');
            $table->date('last_daily_login_bonus_on')
                ->nullable()
                ->after('energy_recharge_reference_at');
            $table->date('last_daily_goal_bonus_on')
                ->nullable()
                ->after('last_daily_login_bonus_on');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'energy',
                'energy_recharge_reference_at',
                'last_daily_login_bonus_on',
                'last_daily_goal_bonus_on',
            ]);
        });
    }
};
