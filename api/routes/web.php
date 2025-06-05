<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return [
        'App name' => env('APP_NAME', 'Laravel'),
        'Laravel version' => app()->version(),
    ];
});

require __DIR__.'/storage.php';
