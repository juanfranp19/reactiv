<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductoResource;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            // devuelve recurso ordenado por id
            $productos = ProductoResource::collection(
                Producto::orderBy('id')->get(),
            );

            return response()->json([
                'data' => $productos,
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            Gate::authorize('create', Producto::class);

            // obtiene la información de $request y la convierte a un array asociativo
            $producto = json_decode($request->getContent(), true);

            // crea el producto
            $producto = Producto::create($producto);

            return response()->json([
                'data' => new ProductoResource($producto),
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // encuentra el producto
        $producto = Producto::findOrFail($id);

        return response()->json([
            'message' => 'Producto creado.',
            'data' => new ProductoResource($producto),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        Gate::authorize('update', Producto::class);

        // encuentra el producto
        $producto = Producto::findOrFail($id);

        // valida campos
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'precio' => 'required',
        ]);

        // los actualiza
        $producto->nombre = $request->input('nombre');
        $producto->descripcion = $request->input('descripcion');
        $producto->precio = $request->input('precio');
        $producto->save();

        return response()->json(['message' => 'Producto actualizado.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Gate::authorize('delete', Producto::class);

        // encuentra el producto
        $producto = Producto::findOrFail($id);

        // lo elimina
        $producto->delete();

        return response()->json(['message' => 'Producto eliminado.'], 200);
    }
}
