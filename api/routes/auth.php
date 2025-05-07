<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login'])->middleware('api');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);

    Route::get('/permissions', [AuthController::class, 'permissions']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
