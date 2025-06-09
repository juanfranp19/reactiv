<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    /**
     * Muestra los archivos privados
     */
    public function localStorage($tabla, $columna, $archivo)
    {
        // forma el enlace con la tabla y el archivo
        $path = Storage::disk('local')->path("{$tabla}/{$columna}/{$archivo}");

        Log::info('storage_path: ' . $path);

        if (!file_exists($path)) {
            abort(404, 'Archivo no encontrado');
        }

        // lo muestra
        return response()->file($path);
    }

    /**
     * Muestra los archivos públicos
     */
    /* public function showPublic($tabla, $columna, $archivo)
    {
        // forma el enlace con la tabla y el archivo
        $path = storage_path('app/public/' . $tabla . '/' . $archivo);

        Log::info('storage_path: ' . $path);

        if (!file_exists($path)) {
            abort(404, 'Archivo no encontrado');
        }

        // lo muestra
        return response()->file($path);
    } */
}
