<?php

namespace App\Observers;

use App\Models\Calentamiento;
use Illuminate\Support\Facades\Storage;

class CalentamientoObserver
{
    /**
     * Evento que se ejecuta antes de crear un calentamiento
     */
    public function creating(Calentamiento $calentamiento): void
    {
        /**
         * aborta si los valores ya están registrados
         */
        if (Calentamiento::where('nombre', $calentamiento->nombre)->exists())   abort(409, 'Ya existe un calentamiento con ese nombre.');

        /**
         * manejar imagen
         */
        if (request()->hasFile('imagen')) {

            // coge el objeto File
            $archivo = request()->file('imagen');
            // saca el nombre
            $nombre = $archivo->getClientOriginalName();

            // si la imagen es repetida, aborta la creación del calentamiento
            if (Calentamiento::where('imagen', $nombre)->exists()) {
                abort(400, 'Ya existe un calentamiento con esa imagen.');
            }

            // lo almacena en el servidor
            $archivo->storeAs('calentamientos/imagen', $nombre, 'public');
            // guarda el nombre del archivo en la tabla calentamientos
            $calentamiento->imagen = $nombre;
        } else {
            $calentamiento->imagen = null;
        }
    }

    /**
     * Evento que se ejecuta antes de crear o actualizar un calentamiento
     */
    public function saving(Calentamiento $calentamiento): void
    {
        // solo para calentamientos existentes, de esta forma el saving no afecta a la hora de crear, porque updating da problema a la hora de actualizar imágenes
        if ($calentamiento->exists) {

            /**
             * aborta si los valores actualizados ya están registrados de otros calentamientos, sin contar con el propio valor del calentamiento
             */
            if (Calentamiento::where('nombre', $calentamiento->nombre)->where('id', '!=', $calentamiento->id)->exists()) {
                abort(409, 'Ya existe un calentamiento con ese nombre.');
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

                // verifica que otro calentamiento no tenga la misma imagen
                if (Calentamiento::where('imagen', $nombre)->where('id', '!=', $calentamiento->id)->exists()) {
                    abort(409, 'Ya existe un calentamiento con esa imagen.');
                }

                // guarda la nueva imagen
                $archivo->storeAs('calentamientos/imagen', $nombre, 'public');

                // nombre de la imagen antigua
                $oldImg = $calentamiento->getOriginal('imagen');

                // borra la imagen anterior si existe y es diferente
                if ($oldImg && $oldImg !== $nombre) {
                    Storage::disk('public')->delete('calentamientos/imagen/' . $oldImg);
                }

                // asigna el nombre al campo imagen
                $calentamiento->imagen = $nombre;
            }

            // si la imagen se cambia a null del cliente al servidor, null pasa a string
            if (request('imagen') === 'null') {

                // nombre de la imagen antigua
                $oldImg = $calentamiento->getOriginal('imagen');

                // elimina el archivo
                if ($oldImg) {
                    Storage::disk('public')->delete('calentamientos/imagen/' . $oldImg);
                }

                // actualiza valor a null
                $calentamiento->imagen = null;
            }
        }
    }

    /**
     * Evento que se ejecuta antes de eliminar un calentamiento
     */
    public function deleting(Calentamiento $calentamiento): void
    {
        // si el calentamiento tenía imagen, se elimina
        if ($calentamiento->imagen) {

            Storage::disk('public')->delete('calentamientos/imagen/' . $calentamiento->imagen);
        }
    }
}
