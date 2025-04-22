<?php

use App\Http\Controllers\API\CalentamientoController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/calentamientos', [CalentamientoController::class, 'index']);
Route::post('/calentamientos', [CalentamientoController::class, 'store']);
Route::get('/calentamientos/{id}', [CalentamientoController::class, 'show']);
Route::put('/calentamientos/{id}', [CalentamientoController::class, 'update']);
Route::delete('/calentamientos/{id}', [CalentamientoController::class, 'destroy']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/logout', [AuthController::class, 'logout']);
});
