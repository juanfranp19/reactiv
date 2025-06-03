<?php

namespace App\Observers;

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

            Log::info('user: ' . $user);

            // asigna el socio que está autenticado
            $seguimiento->socio_id = $user->socio['id'];
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

            // aborta si ya hay un seguimiento con ese socio_id y fecha
            if (Seguimiento::where('fecha', $seguimiento->fecha)
                ->where('socio_id', $user->socio['id'])
                ->exists()
            ) abort(409, 'Ya tienes un seguimiento de ese día.');

        }
    }
}
