<?php

use App\Http\Controllers\API\AccesoController;
use App\Http\Controllers\API\CalentamientoController;
use App\Http\Controllers\API\EjercicioController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
});

Route::prefix('/v1')->group(function () {

    Route::get('/accesos', [AccesoController::class, 'index']);
    Route::post('/accesos', [AccesoController::class, 'store']);
    Route::get('/accesos/{id}', [AccesoController::class, 'show']);
    Route::put('/accesos/{id}', [AccesoController::class, 'update']);
    Route::delete('/accesos/{id}', [AccesoController::class, 'destroy']);

    Route::get('/calentamientos', [CalentamientoController::class, 'index']);
    Route::post('/calentamientos', [CalentamientoController::class, 'store']);
    Route::get('/calentamientos/{id}', [CalentamientoController::class, 'show']);
    Route::put('/calentamientos/{id}', [CalentamientoController::class, 'update']);
    Route::delete('/calentamientos/{id}', [CalentamientoController::class, 'destroy']);

    Route::get('/ejercicios', [EjercicioController::class, 'index']);
    Route::post('/ejercicios', [EjercicioController::class, 'store']);
    Route::get('/ejercicios/{id}', [EjercicioController::class, 'show']);
    Route::put('/ejercicios/{id}', [EjercicioController::class, 'update']);
    Route::delete('/ejercicios/{id}', [EjercicioController::class, 'destroy']);

});




