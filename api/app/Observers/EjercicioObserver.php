<?php

namespace App\Observers;

use App\Models\Ejercicio;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;

class EjercicioObserver
{
    /**
     * Evento que se ejecuta antes de crear un ejercicio
     */
    public function creating(Ejercicio $ejercicio): void
    {
        if (! App::runningInConsole()) {
            /**
             * aborta si los valores ya están registrados
             */
            if (Ejercicio::where('nombre', $ejercicio->nombre)->exists())   abort(409, 'Ya existe un ejercicio con ese nombre.');

            /**
             * manejar imagen
             */
            if (request()->hasFile('imagen')) {

                // coge el objeto File
                $archivo = request()->file('imagen');
                // saca el nombre
                $nombre = $archivo->getClientOriginalName();

                // si la imagen es repetida, aborta la creación del ejercicio
                if (Ejercicio::where('imagen', $nombre)->exists()) {
                    abort(400, 'Ya existe un ejercicio con esa imagen.');
                }

                // lo almacena en el servidor
                $archivo->storeAs('ejercicios/imagen', $nombre, 'public');
                // guarda el nombre del archivo en la tabla ejercicios
                $ejercicio->imagen = $nombre;
            } else {
                $ejercicio->imagen = null;
            }
        }
    }

    /**
     * Evento que se ejecuta antes de crear o actualizar un ejercicio
     */
    public function saving(Ejercicio $ejercicio): void
    {
        // solo para ejercicios existentes, de esta forma el saving no afecta a la hora de crear, porque updating da problema a la hora de actualizar imágenes
        if ($ejercicio->exists) {

            /**
             * aborta si los valores actualizados ya están registrados de otros ejercicios, sin contar con el propio valor del ejercicio
             */
            if (Ejercicio::where('nombre', $ejercicio->nombre)->where('id', '!=', $ejercicio->id)->exists()) {
                abort(409, 'Ya existe un ejercicio con ese nombre.');
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

                // verifica que otro ejercicio no tenga la misma imagen
                if (Ejercicio::where('imagen', $nombre)->where('id', '!=', $ejercicio->id)->exists()) {
                    abort(409, 'Ya existe un ejercicio con esa imagen.');
                }

                // guarda la nueva imagen
                $archivo->storeAs('ejercicios/imagen', $nombre, 'public');

                // nombre de la imagen antigua
                $oldImg = $ejercicio->getOriginal('imagen');

                // borra la imagen anterior si existe y es diferente
                if ($oldImg && $oldImg !== $nombre) {
                    Storage::disk('public')->delete('ejercicios/imagen/' . $oldImg);
                }

                // asigna el nombre al campo imagen
                $ejercicio->imagen = $nombre;
            }

            // si la imagen se cambia a null del cliente al servidor, null pasa a string
            if (request('imagen') === 'null') {

                // nombre de la imagen antigua
                $oldImg = $ejercicio->getOriginal('imagen');

                // elimina el archivo
                if ($oldImg) {
                    Storage::disk('public')->delete('ejercicios/imagen/' . $oldImg);
                }

                // actualiza valor a null
                $ejercicio->imagen = null;
            }
        }
    }

    /**
     * Evento que se ejecuta antes de eliminar un ejercicio
     */
    public function deleting(Ejercicio $ejercicio): void
    {
        // si el ejercicio tenía imagen, se elimina
        if ($ejercicio->imagen) {

            Storage::disk('public')->delete('ejercicios/imagen/' . $ejercicio->imagen);
        }
    }
}
