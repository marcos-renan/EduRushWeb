<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

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
