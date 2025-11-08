<?php

namespace App\Observers;

use App\Models\Socio;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SocioObserver
{
    /**
     * Evento que se ejecuta antes de crear el socio
     */
    public function creating(Socio $socio): void
    {
        /**
         * aborta si los valores ya están registrados de otros usuarios
         */
        if (Socio::where('dni', $socio->dni)->exists())             abort(409, 'Ya existe un socio con ese DNI.');
        if (Socio::where('email', $socio->email)->exists())         abort(409, 'Ya existe un socio con ese email.');
        if (Socio::where('telefono', $socio->telefono)->exists())   abort(409, 'Ya existe un socio con ese teléfono.');

        if (! App::runningInConsole()) {

            /**
             * asigna un código de acceso hasta que no se repita con otro
             */
            do {
                $socio->cod_acceso = Str::random(15);
            } while (Socio::where('cod_acceso', $socio->cod_acceso)->exists());

            /**
             * manejar imagen
             */
            if (request()->hasFile('imagen')) {

                // coge el objeto File
                $archivo = request()->file('imagen');
                // saca el nombre
                $nombre = $archivo->getClientOriginalName();

                // si la imagen es repetida, aborta la creación del socio
                if (Socio::where('imagen', $nombre)->exists()) {
                    abort(409, 'Ya existe un socio con esa imagen.');
                }

                // lo almacena en el servidor
                $archivo->storeAs('socios/imagen', $nombre, 'local');
                // guarda el nombre del archivo en la tabla socios
                $socio->imagen = $nombre;

            } else {
                $socio->imagen = null;
            }
        }
    }

    /**
     * Evento que se ejecuta antes de actualizar o crear el socio
     */
    public function saving(Socio $socio): void
    {
        // solo para socios existentes, de esta forma el saving no afecta a la hora de crear, porque updating da problema a la hora de actualizar imágenes
        if ($socio->exists) {

            /**
             * aborta si los valores actualizados ya están registrados de otros usuarios, sin contar con el propio valor del socio
             */
            if (Socio::where('dni', $socio->dni)->where('id', '!=', $socio->id)->exists()) {
                abort(409, 'Ya existe un socio con ese DNI.');
            }
            if (Socio::where('email', $socio->email)->where('id', '!=', $socio->id)->exists()) {
                abort(409, 'Ya existe un socio con ese email.');
            }
            if (Socio::where('telefono', $socio->telefono)->where('id', '!=', $socio->id)->exists()) {
                abort(409, 'Ya existe un socio con ese teléfono.');
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

                // verifica que otro usuario no tenga la misma imagen
                if (Socio::where('imagen', $nombre)->where('id', '!=', $socio->id)->exists()) {
                    abort(409, 'Ya existe un socio con esa imagen.');
                }

                // guarda la nueva imagen
                $archivo->storeAs('socios/imagen', $nombre, 'local');

                // nombre de la imagen antigua
                $oldImg = $socio->getOriginal('imagen');

                // borra la imagen anterior si existe y es diferente
                if ($oldImg && $oldImg !== $nombre) {
                    Storage::disk('local')->delete('socios/imagen/' . $oldImg);
                }

                // asigna el nombre al campo imagen
                $socio->imagen = $nombre;
            }

            // si la imagen se cambia a null del cliente al servidor, null pasa a string
            if (request('imagen') === 'null') {

                // nombre de la imagen antigua
                $oldImg = $socio->getOriginal('imagen');

                // elimina el archivo
                if ($oldImg) {
                    Storage::disk('local')->delete('socios/imagen/' . $oldImg);
                }

                // actualiza valor a null
                $socio->imagen = null;
            }
        }
    }

    /**
     * Evento que se ejecuta antes de eliminar el socio
     */
    public function deleting(Socio $socio): void
    {
        Log::info($socio);
        Log::info($socio->imagen !== null ? 'true' : 'false');
        Log::info($socio->imagen);

        // si el socio tenía imagen, se elimina
        if ($socio->imagen) {

            Storage::disk('local')->delete('socios/imagen/' . $socio->imagen);
        }
    }
}
