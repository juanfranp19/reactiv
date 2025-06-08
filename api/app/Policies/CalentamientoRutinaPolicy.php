<?php

namespace App\Policies;

use App\Models\Rutina;
use App\Models\Socio;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CalentamientoRutinaPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, $rutina_id): bool
    {
        // saca el id del socio
        $socio_id = Socio::where('user_id', $user['id'])->first()->id;

        Log::info('socio_id: ' . $socio_id);

        // busca en la bbdd el socio de esa rutina
        // si lo encuntra, entonces es que la rutina le pertenece al socio
        $rutinaDelSocio = (
            Rutina::where('id', $rutina_id)
                ->where('socio_id', $socio_id)
                ->exists()
        );

        Log::info('es la rutina del socio?: ' . $rutinaDelSocio);

        // entrenadores y propietarios
        return Gate::allows('isEntrenador', $user) || $rutinaDelSocio;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, $rutina_id): bool
    {
        // saca el id del socio
        $socio_id = Socio::where('user_id', $user['id'])->first()->id;

        Log::info('socio_id: ' . $socio_id);

        // busca en la bbdd el socio de esa rutina
        // si lo encuntra, entonces es que la rutina le pertenece al socio
        $rutinaDelSocio = (
            Rutina::where('id', $rutina_id)
                ->where('socio_id', $socio_id)
                ->exists()
        );

        Log::info('es la rutina del socio?: ' . $rutinaDelSocio);

        // entrenadores y propietarios
        return Gate::allows('isEntrenador', $user) || $rutinaDelSocio;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, $rutina_id): bool
    {
        // saca el id del socio
        $socio_id = Socio::where('user_id', $user['id'])->first()->id;

        Log::info('socio_id: ' . $socio_id);

        // busca en la bbdd el socio de esa rutina
        // si lo encuntra, entonces es que la rutina le pertenece al socio
        $rutinaDelSocio = (
            Rutina::where('id', $rutina_id)
                ->where('socio_id', $socio_id)
                ->exists()
        );

        Log::info('es la rutina del socio?: ' . $rutinaDelSocio);

        Log::info(Gate::allows('isEntrenador', $user) || $rutinaDelSocio);

        // entrenadores y propietarios
        return Gate::allows('isEntrenador', $user) || $rutinaDelSocio;
    }
}
