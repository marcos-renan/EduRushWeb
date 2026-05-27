<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('mobile', function (): void {
    $port = 8000;

    $this->components->info("Iniciando servidor em 0.0.0.0:{$port} para acesso via celular...");

    $this->call('serve', [
        '--host' => '0.0.0.0',
        '--port' => $port,
    ]);
})->purpose('Inicia o Laravel acessivel na rede local');

Artisan::command('content:clear {--force : Executa sem pedir confirmacao}', function (): int {
    if (! $this->option('force') && ! $this->confirm('Isso vai apagar materias, trilhas, licoes, questoes e progresso ligado a elas. Deseja continuar?')) {
        $this->components->warn('Operacao cancelada.');

        return self::FAILURE;
    }

    DB::transaction(function (): void {
        DB::table('student_question_errors')->delete();
        DB::table('student_lesson_progress')->delete();
        DB::table('study_plans')->delete();
        DB::table('questions')->delete();
        DB::table('lessons')->delete();
        DB::table('trails')->delete();
        DB::table('subjects')->delete();

        DB::table('student_daily_activities')->update([
            'xp_earned' => 0,
            'lessons_completed' => 0,
        ]);
    });

    $this->components->info('Conteudo pedagogico zerado com sucesso.');

    return self::SUCCESS;
})->purpose('Zera materias, trilhas, licoes, questoes e progresso relacionado');
