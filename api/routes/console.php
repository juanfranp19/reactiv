<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('refresh-database', function () {

    // php artisan migrate:fresh

    $this->info('Ejecutando migrate:fresh...');
    Artisan::call('migrate:fresh');
    $this->line(Artisan::output());
    $this->info('*****************************************');
    $this->info('TODAS LAS TABLAS CREADAS CORRECTAMENTE');
    $this->info('*****************************************');
    $this->info('');

    // php artisan db:seed

    $this->info('Ejecutando db:seed...');
    Artisan::call('db:seed');
    $this->line(Artisan::output());
    $this->info('*****************************************');
    $this->info('TODOS LOS SEEDERS CARGADOS CORRECTAMENTE');
    $this->info('*****************************************');
    $this->info('');

    // php artisan db:triggers

    $this->info('Ejecutando db:triggers...');
    Artisan::call('db:triggers');
    $this->line(Artisan::output());
    $this->info('*****************************************');
    $this->info('TODOS LOS TRIGGERS CREADOS CORRECTAMENTE');
    $this->info('*****************************************');
});
