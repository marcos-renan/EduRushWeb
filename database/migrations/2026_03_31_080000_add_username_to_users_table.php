<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('username', 40)->nullable()->unique()->after('name');
        });

        DB::table('users')
            ->select(['id', 'name', 'email', 'username'])
            ->orderBy('id')
            ->chunkById(100, function ($users): void {
                foreach ($users as $user) {
                    if (! empty($user->username)) {
                        continue;
                    }

                    $base = $this->baseUsername($user->email ?: $user->name, (int) $user->id);
                    $username = $this->resolveUniqueUsername($base, (int) $user->id);

                    DB::table('users')
                        ->where('id', $user->id)
                        ->update(['username' => $username]);
                }
            });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropUnique('users_username_unique');
            $table->dropColumn('username');
        });
    }

    private function baseUsername(?string $seed, int $userId): string
    {
        $normalized = Str::of((string) $seed)
            ->before('@')
            ->lower()
            ->ascii()
            ->replaceMatches('/[^a-z0-9._]+/', '')
            ->trim("._ \t\n\r\0\x0B")
            ->value();

        if ($normalized === '') {
            $normalized = 'user'.$userId;
        }

        if (strlen($normalized) < 3) {
            $normalized = str_pad($normalized, 3, '0');
        }

        return Str::limit($normalized, 36, '');
    }

    private function resolveUniqueUsername(string $base, int $userId): string
    {
        $candidate = $base;
        $suffix = 0;

        while (
            DB::table('users')
                ->where('username', $candidate)
                ->where('id', '!=', $userId)
                ->exists()
        ) {
            $suffix++;
            $suffixText = '_'.$suffix;
            $candidate = Str::limit($base, 40 - strlen($suffixText), '').$suffixText;
        }

        return $candidate;
    }
};

