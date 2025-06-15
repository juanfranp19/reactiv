<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return [
        'App name' => env('APP_NAME'),
        'App license' => 'Reactiv © 2025 by Juan Francisco Pagán is licensed under CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0/',
        'Laravel version' => app()->version(),
    ];
});

Route::get('/info-composer', function () {
    $composer = json_decode(file_get_contents(base_path('composer.json')), true);
    return response()->json($composer);
});

require __DIR__ . '/storage.php';
