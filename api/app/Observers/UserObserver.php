<?php

namespace App\Observers;

use App\Models\Entrenador;
use App\Models\Socio;
use App\Models\User;
use Illuminate\Support\Facades\Request;

class UserObserver
{
    /**
     * Evento que se ejecuta antes de registrar a un usuario
     */
    public function creating(User $user): void
    {
        // si uno de estos campos está repetido en la base de datos, aborta el registro del usuario
        if (User::where('name', $user->name)->exists()) abort(409, 'Ya existe un usuario con ese nombre.');

        // datos de entrada
        $request = Request::instance();

        if ($request->has('socio_id')) {

            // encuentra al socio que se le asigna al usuario
            $socio = Socio::findOrFail($request->input('socio_id'));

            // si ese socio ya tiene un usuario, aborta
            if ($socio->user_id !== null) abort(409, 'Este socio ya tiene un usuario asigando.');
        }

        if ($request->has('entrenador_id')) {

            // encuentra al entrenador que se le asigna al usuario
            $entrenador = Entrenador::findOrFail($request->input('entrenador_id'));

            // si ese entrenador ya tiene un usuario, aborta
            if ($entrenador->user_id !== null) abort(409, 'Este entrenador ya tiene un usuario asigando.');
        }
    }

    /**
     * Evento que se ejecuta una vez se haya registrado el usuario
     */
    public function created(User $user): void
    {
        // datos de entrada
        $request = Request::instance();

        // verifica que en los datos de entrada se encuentre socio_id
        if ($request->has('socio_id')) {

            // encuentra al socio que se le asigna al usuario
            $socio = Socio::findOrFail($request->input('socio_id'));

            // actualiza el user_id de ese socio
            $socio->update([
                'user_id' => $user->id,
            ]);
        }

        // verifica que en los datos de entrada se encuentre entrenador_id
        if ($request->has('entrenador_id')) {

            // encuentra al entrenador que se le asigna al usuario
            $entrenador = Entrenador::findOrFail($request->input('entrenador_id'));

            // actualiza el user_id de ese entrenador
            $entrenador->update([
                'user_id' => $user->id,
            ]);
        }
    }
}
