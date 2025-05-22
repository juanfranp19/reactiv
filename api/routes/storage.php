<?php

use App\Http\Controllers\StorageController;
use Illuminate\Support\Facades\Route;

// archivos privados
Route::get('/storage/local/{tabla}/{columna}/{archivo}', [StorageController::class, 'localStorage']);

// archivos públicos
//Route::get('/storage/public/{tabla}/{columna}/{archivo}', [StorageController::class, 'showPublic']);
