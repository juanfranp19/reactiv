<?php

namespace App\Policies;

use App\Models\Acceso;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class AccesoPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // solo entrenadores
        return Gate::allows('isEntrenador', $user);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Acceso $acceso): bool
    {
        Log::info($user);
        Log::info($acceso);

        // entrenadores y propietarios
        // en ese orden porque los usuarios de entrenadores no tiene función socio y da internal error
        return Gate::allows('isEntrenador', $user) || $user->socio['id'] === $acceso->socio_id;
    }

    /**
     * Determine whether the user can create models.
     */
    /*
    public function create(User $user): bool
    {
        return false;
    }
    */

    /**
     * Determine whether the user can update the model.
     */
    /*
    public function update(User $user, Acceso $acceso): bool
    {
        return false;
    }
    */

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        // solo admins
        return Gate::allows('isAdmin', $user);
    }
}
