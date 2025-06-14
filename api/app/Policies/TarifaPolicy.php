<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Gate;

class TarifaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user): bool
    {
        return true;
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
        // solo admins
        return Gate::allows('isAdmin', $user);
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
