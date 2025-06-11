<?php

namespace App\Observers;

use App\Models\Producto;
use Illuminate\Support\Facades\Storage;

class ProductoObserver
{
    /**
     * Evento que se ejecuta antes de crear un producto
     */
    public function creating(Producto $producto): void
    {
        /**
         * aborta si los valores ya están registrados
         */
        if (Producto::where('nombre', $producto->nombre)->exists())   abort(409, 'Ya existe un producto con ese nombre.');

        /**
         * manejar imagen
         */
        if (request()->hasFile('imagen')) {

            // coge el objeto File
            $archivo = request()->file('imagen');
            // saca el nombre
            $nombre = $archivo->getClientOriginalName();

            // si la imagen es repetida, aborta la creación del producto
            if (Producto::where('imagen', $nombre)->exists()) {
                abort(400, 'Ya existe un producto con esa imagen.');
            }

            // lo almacena en el servidor
            $archivo->storeAs('productos/imagen', $nombre, 'public');
            // guarda el nombre del archivo en la tabla productos
            $producto->imagen = $nombre;
        } else {
            $producto->imagen = null;
        }
    }

    /**
     * Evento que se ejecuta antes de crear o actualizar un producto
     */
    public function saving(Producto $producto): void
    {
        // solo para productos existentes, de esta forma el saving no afecta a la hora de crear, porque updating da problema a la hora de actualizar imágenes
        if ($producto->exists) {

            /**
             * aborta si los valores actualizados ya están registrados de otros productos, sin contar con el propio valor del producto
             */
            if (Producto::where('nombre', $producto->nombre)->where('id', '!=', $producto->id)->exists()) {
                abort(409, 'Ya existe un producto con ese nombre.');
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

                // verifica que otro producto no tenga la misma imagen
                if (Producto::where('imagen', $nombre)->where('id', '!=', $producto->id)->exists()) {
                    abort(409, 'Ya existe un producto con esa imagen.');
                }

                // guarda la nueva imagen
                $archivo->storeAs('productos/imagen', $nombre, 'public');

                // nombre de la imagen antigua
                $oldImg = $producto->getOriginal('imagen');

                // borra la imagen anterior si existe y es diferente
                if ($oldImg && $oldImg !== $nombre) {
                    Storage::disk('public')->delete('productos/imagen/' . $oldImg);
                }

                // asigna el nombre al campo imagen
                $producto->imagen = $nombre;
            }

            // si la imagen se cambia a null del cliente al servidor, null pasa a string
            if (request('imagen') === 'null') {

                // nombre de la imagen antigua
                $oldImg = $producto->getOriginal('imagen');

                // elimina el archivo
                if ($oldImg) {
                    Storage::disk('public')->delete('productos/imagen/' . $oldImg);
                }

                // actualiza valor a null
                $producto->imagen = null;
            }
        }
    }

    /**
     * Evento que se ejecuta antes de eliminar un producto
     */
    public function deleting(Producto $producto): void
    {
        // si el producto tenía imagen, se elimina
        if ($producto->imagen) {

            Storage::disk('public')->delete('productos/imagen/' . $producto->imagen);
        }
    }
}
