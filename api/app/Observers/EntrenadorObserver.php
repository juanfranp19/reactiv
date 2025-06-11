<?php

namespace App\Observers;

use App\Models\Entrenador;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class EntrenadorObserver
{
    /**
     * Evento que se ejecuta antes de crear el entrenador
     */
    public function creating(Entrenador $entrenador): void
    {
        /**
         * aborta si los valores ya están registrados de otros entrenadores
         */
        if (Entrenador::where('email', $entrenador->email)->exists())           abort(409, 'Ya existe un entrenador con ese email.');
        if (Entrenador::where('telefono', $entrenador->telefono)->exists())     abort(409, 'Ya existe un entrenador con ese teléfono.');

        if (! App::runningInConsole()) {

            /**
             * manejar imagen
             */
            if (request()->hasFile('imagen')) {

                // coge el objeto File
                $archivo = request()->file('imagen');
                // saca el nombre
                $nombre = $archivo->getClientOriginalName();

                // si la imagen es repetida, aborta la creación del entrenador
                if (Entrenador::where('imagen', $nombre)->exists()) {
                    abort(400, 'Ya existe un entrenador con esa imagen.');
                }

                // lo almacena en el servidor
                $archivo->storeAs('entrenadores/imagen', $nombre, 'local');
                // guarda el nombre del archivo en la tabla entrenadores
                $entrenador->imagen = $nombre;

            } else {
                $entrenador->imagen = null;
            }
        }
    }

    /**
     * Evento que se ejecuta antes de actualizar o crear el entrenador
     */
    public function saving(Entrenador $entrenador): void
    {
        // solo para entrenadores existentes, de esta forma el saving no afecta a la hora de crear, porque updating da problema a la hora de actualizar imágenes
        if ($entrenador->exists) {

            /**
             * aborta si los valores actualizados ya están registrados de otros entrenadores, sin contar con el propio valor del entrenador
             */
            if (Entrenador::where('email', $entrenador->email)->where('id', '!=', $entrenador->id)->exists()) {
                abort(409, 'Ya existe un entrenador con ese email.');
            }
            if (Entrenador::where('telefono', $entrenador->telefono)->where('id', '!=', $entrenador->id)->exists()) {
                abort(409, 'Ya existe un entrenador con ese teléfono.');
            }

            /**
             * manejar imagen
             */
            // si hay un archivo nuevo en la request, guarda la nueva y elimina la antigua
            if (request()->hasFile('imagen')) {

                // obtiene el archivo
                $archivo = request()->file('imagen');

                // obtiene el nombre del archivo
                $nombre = $archivo->getClientOriginalName();

                // verifica que otro entrenador no tenga la misma imagen
                if (Entrenador::where('imagen', $nombre)->where('id', '!=', $entrenador->id)->exists()) {
                    abort(409, 'Ya existe un entrenador con esa imagen.');
                }

                // guarda la nueva imagen
                $archivo->storeAs('entrenadores/imagen', $nombre, 'local');

                // nombre de la imagen antigua
                $oldImg = $entrenador->getOriginal('imagen');

                // borra la imagen anterior si existe y es diferente
                if ($oldImg && $oldImg !== $nombre) {
                    Storage::disk('local')->delete('entrenadores/imagen/' . $oldImg);
                }

                // asigna el nombre al campo imagen
                $entrenador->imagen = $nombre;
            }

            // si la imagen se cambia a null del cliente al servidor, null pasa a string
            if (request('imagen') === 'null') {

                // nombre de la imagen antigua
                $oldImg = $entrenador->getOriginal('imagen');

                // elimina el archivo
                if ($oldImg) {
                    Storage::disk('local')->delete('entrenadores/imagen/' . $oldImg);
                }

                // actualiza valor a null
                $entrenador->imagen = null;
            }
        }
    }

    /**
     * Evento que se ejecuta antes de eliminar el entrenador
     */
    public function deleting(Entrenador $entrenador): void
    {
        Log::info($entrenador);
        Log::info($entrenador->imagen !== null ? 'true' : 'false');
        Log::info($entrenador->imagen);

        // si el entrenador tenía imagen, se elimina
        if ($entrenador->imagen) {

            Storage::disk('local')->delete('entrenadores/imagen/' . $entrenador->imagen);
        }
    }
}
