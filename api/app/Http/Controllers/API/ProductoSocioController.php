<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ProductoSocio;
use App\Models\Socio;
use Illuminate\Http\Request;

class ProductoSocioController extends Controller
{
    /**
     * Muestra los productos del socio
     */
    public function index($socio_id)
    {
        try {

            // si el socio no está en la tabla productos_socios, devuelve error
            if (ProductoSocio::where('socio_id', $socio_id)->exists()) {

                // llama a la turina específica con los calentamientos que están asociados
                $socio = Socio::with('productos')->findOrFail($socio_id);

                return response()->json([
                    'data' => $socio,
                ], 200);

            } else {

                return response()->json(['message' => 'socio no encontrado'], 404);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Almacena un producto al socio
     */
    public function attach(Request $request, $socio_id)
    {
        $socio = Socio::findOrFail($socio_id);

        $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'fecha_compra' => 'required',
            'cantidad' => 'required',
        ]);

        // asocia el producto justo con los valores pivot
        $socio->productos()->attach($request->producto_id, [
            'fecha_compra' => $request->fecha_compra,
            'cantidad' => $request->cantidad,
        ]);

        return response()->json(['message' => 'attached'], 201);
    }

    /**
     * Actualiza los valores pivot de la tabla
     */
    public function update(Request $request, $socio_id)
    {
        $socio = Socio::with('productos')->findOrFail($socio_id);

        $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'fecha_compra' => 'required',
            'cantidad' => 'required',
        ]);

        // si el producto está en el socio, lo actualiza; si no, salta error
        if ($socio->productos()->where('producto_id', $request->producto_id)->exists()) {

            // actualiza los valores pivot
            $socio->productos()->updateExistingPivot($request->producto_id, [
                'fecha_compra' => $request->fecha_compra,
                'cantidad' => $request->cantidad,
            ]);

            return response('', 204);

        } else {

            return response()->json(['message' => 'producto no encontrado'], 404);
        }
    }

    /**
     * Elimina un producto del socio
     */
    public function detach(Request $request, $socio_id)
    {
        $socio = Socio::findOrFail($socio_id);

        $request->validate([
            'producto_id' => 'required|exists:productos,id',
        ]);

        // si el producto está enl socio, lo elimina; si no, salta error
        if ($socio->productos()->where('producto_id', $request->producto_id)->exists()) {

            // elimina el producto del socio
            $socio->productos()->detach($request->producto_id);

            return response('', 204);

        } else {

            return response()->json(['message' => 'producto no encontrado'], 404);
        }
    }
}
