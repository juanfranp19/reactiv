<?php

use App\Http\Controllers\StorageController;
use Illuminate\Support\Facades\Route;

// archivos privados
Route::get('/storage/private/{tabla}/{archivo}', [StorageController::class, 'showPrivate']);

// archivos públicos
Route::get('/storage/public/{tabla}/{archivo}', [StorageController::class, 'showPublic']);
