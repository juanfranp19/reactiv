<?php

use App\Http\Controllers\API\AccesoController;
use App\Http\Controllers\API\CalentamientoController;
use App\Http\Controllers\API\CalentamientoRutinaController;
use App\Http\Controllers\API\CalentamientoSeguimientoController;
use App\Http\Controllers\API\EjercicioController;
use App\Http\Controllers\API\EntrenadorController;
use App\Http\Controllers\API\GrupoMuscularController;
use App\Http\Controllers\API\ProductoController;
use App\Http\Controllers\API\RutinaController;
use App\Http\Controllers\API\SeguimientoController;
use App\Http\Controllers\API\SocioController;
use App\Http\Controllers\API\TaquillaController;
use App\Http\Controllers\API\TarifaController;
use App\Http\Controllers\API\UserController;
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

    Route::get('/entrenadores', [EntrenadorController::class, 'index']);
    Route::post('/entrenadores', [EntrenadorController::class, 'store']);
    Route::get('/entrenadores/{id}', [EntrenadorController::class, 'show']);
    Route::put('/entrenadores/{id}', [EntrenadorController::class, 'update']);
    Route::delete('/entrenadores/{id}', [EntrenadorController::class, 'destroy']);

    Route::get('/grupos-musculares', [GrupoMuscularController::class, 'index']);
    Route::post('/grupos-musculares', [GrupoMuscularController::class, 'store']);
    Route::get('/grupos-musculares/{id}', [GrupoMuscularController::class, 'show']);
    Route::put('/grupos-musculares/{id}', [GrupoMuscularController::class, 'update']);
    Route::delete('/grupos-musculares/{id}', [GrupoMuscularController::class, 'destroy']);

    Route::get('/productos', [ProductoController::class, 'index']);
    Route::post('/productos', [ProductoController::class, 'store']);
    Route::get('/productos/{id}', [ProductoController::class, 'show']);
    Route::put('/productos/{id}', [ProductoController::class, 'update']);
    Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

    Route::get('/rutinas', [RutinaController::class, 'index']);
    Route::post('/rutinas', [RutinaController::class, 'store']);
    Route::get('/rutinas/{id}', [RutinaController::class, 'show']);
    Route::put('/rutinas/{id}', [RutinaController::class, 'update']);
    Route::delete('/rutinas/{id}', [RutinaController::class, 'destroy']);

    Route::get('/seguimientos', [SeguimientoController::class, 'index']);
    Route::post('/seguimientos', [SeguimientoController::class, 'store']);
    Route::get('/seguimientos/{id}', [SeguimientoController::class, 'show']);
    Route::put('/seguimientos/{id}', [SeguimientoController::class, 'update']);
    Route::delete('/seguimientos/{id}', [SeguimientoController::class, 'destroy']);

    Route::get('/socios', [SocioController::class, 'index']);
    Route::post('/socios', [SocioController::class, 'store']);
    Route::get('/socios/{id}', [SocioController::class, 'show']);
    Route::put('/socios/{id}', [SocioController::class, 'update']);
    Route::delete('/socios/{id}', [SocioController::class, 'destroy']);

    Route::get('/taquillas', [TaquillaController::class, 'index']);
    Route::post('/taquillas', [TaquillaController::class, 'store']);
    Route::get('/taquillas/{id}', [TaquillaController::class, 'show']);
    Route::put('/taquillas/{id}', [TaquillaController::class, 'update']);
    Route::delete('/taquillas/{id}', [TaquillaController::class, 'destroy']);

    Route::get('/tarifas', [TarifaController::class, 'index']);
    Route::post('/tarifas', [TarifaController::class, 'store']);
    Route::get('/tarifas/{id}', [TarifaController::class, 'show']);
    Route::put('/tarifas/{id}', [TarifaController::class, 'update']);
    Route::delete('/tarifas/{id}', [TarifaController::class, 'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    //Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);


    Route::get('/calentamientos-rutinas/{rutina_id}', [CalentamientoRutinaController::class, 'index']);
    Route::post('/calentamientos-rutinas/{rutina_id}', [CalentamientoRutinaController::class, 'attach']);
    Route::put('/calentamientos-rutinas/{rutina_id}', [CalentamientoRutinaController::class, 'update']);
    Route::delete('/calentamientos-rutinas/{rutina_id}', [CalentamientoRutinaController::class, 'detach']);

    Route::get('/calentamientos-seguimientos/{seguimiento_id}', [CalentamientoSeguimientoController::class, 'index']);
    Route::post('/calentamientos-seguimientos/{seguimiento_id}', [CalentamientoSeguimientoController::class, 'attach']);
    Route::delete('/calentamientos-seguimientos/{seguimiento_id}', [CalentamientoSeguimientoController::class, 'detach']);
});
