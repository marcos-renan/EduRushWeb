<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE users ADD COLUMN profile_photo_blob LONGBLOB NULL AFTER profile_photo_path');
        DB::statement('ALTER TABLE badges ADD COLUMN image_blob LONGBLOB NULL AFTER image_path');

        Schema::table('users', function (Blueprint $table): void {
            $table->string('profile_photo_mime', 80)->nullable();
        });

        Schema::table('badges', function (Blueprint $table): void {
            $table->string('image_mime', 80)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn(['profile_photo_blob', 'profile_photo_mime']);
        });

        Schema::table('badges', function (Blueprint $table): void {
            $table->dropColumn(['image_blob', 'image_mime']);
        });
    }
};
