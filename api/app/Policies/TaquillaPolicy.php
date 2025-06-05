<?php

namespace App\Policies;

use App\Models\Taquilla;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class TaquillaPolicy
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
    public function view(User $user, Taquilla $taquilla): bool
    {
        // entrenadores y propietarios
        // en ese orden porque los usuarios de entrenadores no tiene función socio y da internal error
        return Gate::allows('isEntrenador', $user) || $user->socio['id'] === $taquilla->socio_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // solo admins
        return Gate::allows('isAdmin', $user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        // solo entrenadores
        return Gate::allows('isEntrenador', $user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        // solo admins
        return Gate::allows('isAdmin', $user);
    }
}
