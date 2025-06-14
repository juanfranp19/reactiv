<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TarifaResource;
use App\Models\Tarifa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TarifaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            Gate::authorize('viewAny', Tarifa::class);

            // devuelve el recurso ordenado por id
            $tarifas = TarifaResource::collection(
                Tarifa::orderBy('id')->get(),
            );

            return response()->json([
                'data' => $tarifas,
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

            Gate::authorize('create', Tarifa::class);

            // obtiene la información de $request y la convierte a un array asociativo
            $tarifa = json_decode($request->getContent(), true);

            // crea la tarifa
            $tarifa = Tarifa::create($tarifa);

            return response()->json([
                'data' => new TarifaResource($tarifa),
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
        Gate::authorize('view', Tarifa::class);

        // encuentra la tarifa
        $tarifa = Tarifa::findOrFail($id);

        return response()->json([
            'message' => 'Tarifa creada.',
            'data' => new TarifaResource($tarifa),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        Gate::authorize('update', Tarifa::class);

        // encuentra la tarifa
        $tarifa = Tarifa::findOrFail($id);

        // valida los campos
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'duracion' => 'required',
            'precio' => 'required',
        ]);

        // los actualiza
        $tarifa->nombre = $request->input('nombre');
        $tarifa->descripcion = $request->input('descripcion');
        $tarifa->duracion = $request->input('duracion');
        $tarifa->precio = $request->input('precio');
        $tarifa->save();

        return response()->json(['message' => 'Tarifa actualizada.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Gate::authorize('delete', Tarifa::class);

        // encuentra la tarifa
        $tarifa = Tarifa::findOrFail($id);

        // la elimina
        $tarifa->delete();

        return response()->json(['message' => 'Tarifa eliminada.'], 200);
    }
}
