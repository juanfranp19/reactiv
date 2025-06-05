<?php

namespace App\Policies;

use App\Models\Socio;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class SocioPolicy
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
    public function view(User $user, Socio $socio): bool
    {
        // entrenadores y propietarios
        // en ese orden porque los usuarios de entrenadores no tiene función socio y da internal error
        return Gate::allows('isEntrenador', $user) || $user->socio['id'] === $socio->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // solo entrenadores
        return Gate::allows('isEntrenador', $user);
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
        // solo entrenadores
        return Gate::allows('isAdmin', $user);
    }
}
