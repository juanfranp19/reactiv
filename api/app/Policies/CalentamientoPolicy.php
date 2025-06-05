<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CalentamientoPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    /*
    public function viewAny(User $user): bool
    {
        return false;
    }
    */

    /**
     * Determine whether the user can view the model.
     */
    /*
    public function view(User $user, Calentamiento $calentamiento): bool
    {
        return false;
    }
    */

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        Log::info(Gate::allows('isAdmin', $user));

        // solo admins
        return Gate::allows('isAdmin', $user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        Log::info(Gate::allows('isAdmin', $user));

        // solo admins
        return Gate::allows('isAdmin', $user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        Log::info(Gate::allows('isAdmin', $user));

        // solo admins
        return Gate::allows('isAdmin', $user);
    }
}
