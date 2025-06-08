<?php

namespace App\Policies;

use App\Models\Seguimiento;
use App\Models\Socio;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class EjercicioSeguimientoPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, $seguimiento_id): bool
    {
        // saca el id del socio
        $socio_id = Socio::where('user_id', $user['id'])->first()->id;

        Log::info('socio_id: ' . $socio_id);

        // busca en la bbdd el socio de ese seguimiento
        // si lo encuntra, entonces es que el seguimiento le pertenece al socio
        $seguimientoDelSocio = (
            Seguimiento::where('id', $seguimiento_id)
                ->where('socio_id', $socio_id)
                ->exists()
        );

        Log::info('es el seguimiento del socio?: ' . $seguimientoDelSocio);

        // entrenadores y propietarios
        return Gate::allows('isEntrenador', $user) || $seguimientoDelSocio;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, $seguimiento_id): bool
    {
        // saca el id del socio
        $socio_id = Socio::where('user_id', $user['id'])->first()->id;

        Log::info('socio_id: ' . $socio_id);

        // busca en la bbdd el socio de ese seguimiento
        // si lo encuntra, entonces es que el seguimiento le pertenece al socio
        $seguimientoDelSocio = (
            Seguimiento::where('id', $seguimiento_id)
                ->where('socio_id', $socio_id)
                ->exists()
        );

        Log::info('es el seguimiento del socio?: ' . $seguimientoDelSocio);

        // entrenadores y propietarios
        return Gate::allows('isEntrenador', $user) || $seguimientoDelSocio;
    }
}
