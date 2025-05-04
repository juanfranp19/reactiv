<?php

namespace App\Observers;

use App\Models\Socio;
use Illuminate\Support\Facades\App;

class SocioObserver
{
    public function creating(Socio $socio): void
    {
        if (! App::runningInConsole()) {

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
}
