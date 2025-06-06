<?php

namespace App\Observers;

use App\Models\Acceso;
use Illuminate\Support\Facades\App;

class AccesoObserver
{
    /**
     * Evento que se ejecuta antes de crear un acceso
     */
    public function creating(Acceso $acceso): void
    {
        if (!App::runningInConsole()) {

            /**
             * verificar si está dentro del establecimiento
             */
            $estaDentro = (
                Acceso::where('socio_id', $acceso->socio_id)
                    ->where('hora_salida', null)
                    ->exists()
            );

            if ($estaDentro) abort(409, 'Imposible entrar sin haber salido.');
        }
    }
}
