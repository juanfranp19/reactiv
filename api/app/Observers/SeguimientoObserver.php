<?php

namespace App\Observers;

use App\Models\Acceso;
use App\Models\Seguimiento;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SeguimientoObserver
{
    /**
     * Evento que se ejecuta antes de crear o actualizar un seguimiento
     */
    public function saving(Seguimiento $seguimiento): void
    {
        if (!App::runningInConsole()) {

            // usuario autenticado
            $user = Auth::user();
            $userId = $user->socio['id'];

            Log::info('user: ' . $user);

            // asigna el socio que está autenticado
            $seguimiento->socio_id = $userId;
        }
    }

    /**
     * Evento que se ejecuta antes de crear un seguimiento
     */
    public function creating(Seguimiento $seguimiento): void
    {
        if (!App::runningInConsole()) {

            // usuario autenticado
            $user = Auth::user();
            $userId = $user->socio['id'];

            /**
             * aborta si ya hay un seguimiento con ese socio_id y fecha
             */

            $seguimientoExistente = (
                Seguimiento::where('socio_id', $userId)
                    ->where('fecha', $seguimiento->fecha)
                    ->exists()
            );

            Log::info($seguimientoExistente);

            if ($seguimientoExistente) abort(409, 'Ya tienes un seguimiento de ese día.');

            /**
             * aborta si se intenta crear un seguimiento un día que no ha accedido al gimnasio
             */

            $existeAccesoConMismaFecha = (
                Acceso::where('socio_id', $userId)
                    ->whereDate('hora_entrada', $seguimiento->fecha)
                    ->exists()
            );

            Log::info($existeAccesoConMismaFecha);

            if (!$existeAccesoConMismaFecha) abort(409, 'No puedes hacer un seguimiento de un día que no has accedido');
        }
    }
}
