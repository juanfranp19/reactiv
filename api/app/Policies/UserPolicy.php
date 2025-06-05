<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Gate;

class UserPolicy
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
    public function view(User $user, User $model): bool
    {
        // entrenadores y propietarios
        return Gate::allows('isEntrenador', $user) || $user->id === $model->id;
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
    public function update(User $user, User $model): bool
    {
        // entrenadores y propietarios
        return Gate::allows('isEntrenador', $user) || $user->id === $model->id;
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
