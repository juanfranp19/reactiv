<?php

namespace App\Observers;

use App\Models\Rutina;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RutinaObserver
{
    /**
     * Evento que se ejecuta antes de crear o actualizar una rutina
     */
    public function saving(Rutina $rutina): void
    {
        if (!App::runningInConsole()) {

            // usuario autenticado
            $user = Auth::user();

            // aborta si los valores ya están registrados de otros usuarios
            if (Rutina::where('nombre', $rutina->nombre)
                ->where('socio_id', $user->socio['id'])
                ->exists()
            ) abort(400, 'Ya tienes una rutina con ese nombre');

            Log::info('user: ' . $user);

            // asigna el socio que está autenticado
            $rutina->socio_id = $user->socio['id'];
        }
    }
}
