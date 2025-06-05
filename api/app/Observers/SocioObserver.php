<?php

namespace App\Observers;

use App\Models\Socio;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

class SocioObserver
{
    /**
     * Evento que se ejecuta antes de que se cree el socio
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
                    abort(400, 'Ya existe un socio con esa imagen.');
                }

                // lo almacena en el servidor
                $archivo->storeAs('socios', $nombre, 'local');
                // guarda el nombre del archivo en la tabla socios
                $socio->imagen = $nombre;

            } else {
                $socio->imagen = null;
            }
        }
    }

    /**
     * Evento que se ejecuto antes de que se actualice el socio
     */
    public function updating(Socio $socio): void
    {
        /**
         * aborta si los valores actualizados ya están registrados de otros usuarios, sin contar con el propio valor del socio
         */
        if (Socio::where('dni', $socio->dni)->where('id', '!=', $socio->id)->exists()) {
            abort(409, 'Ya existe un socio con ese dni.');
        }
        if (Socio::where('email', $socio->email)->where('id', '!=', $socio->id)->exists()) {
            abort(409, 'Ya existe un socio con ese email.');
        }
        if (Socio::where('telefono', $socio->telefono)->where('id', '!=', $socio->id)->exists()) {
            abort(409, 'Ya existe un socio con ese teléfono.');
        }
    }
}
