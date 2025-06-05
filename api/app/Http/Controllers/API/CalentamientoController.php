<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CalentamientoResource;
use App\Models\Calentamiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CalentamientoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            // devuelve el recurso, ordenado por id
            $calentamientos = CalentamientoResource::collection(
                Calentamiento::orderBy('nombre')->get(),
            );

            return response()->json([
                'data' => $calentamientos,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            Gate::authorize('create', Calentamiento::class);

            // obtiene la información de $request y la convierte a un array asociativo
            $calentamiento = json_decode($request->getContent(), true);

            // crea el calentamiento
            $calentamiento = Calentamiento::create($calentamiento);

            return response()->json([
                'message' => 'Calentamiento creado.',
                'data' => new CalentamientoResource($calentamiento),
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
        // encuentra el calentamiento
        $calentamiento = Calentamiento::findOrFail($id);

        return response()->json([
            'data' => new CalentamientoResource($calentamiento),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        Gate::authorize('update', Calentamiento::class);

        // encuentra el calentamiento
        $calentamiento = Calentamiento::find($id);

        if ($calentamiento) {

            // lo valida
            $request->validate([
                'nombre' => 'required',
                'descripcion' => 'required',
            ]);

            // actualiza valores
            $calentamiento->nombre = $request->input('nombre');
            $calentamiento->descripcion = $request->input('descripcion');
            $calentamiento->imagen = $request->input('imagen');
            $calentamiento->save();

            return response()->json(['message' => 'Calentamiento actualizado.'], 200);

        } else {
            return response()->json([
                'message' => 'calentamiento no encontrado',
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Gate::authorize('delete', Calentamiento::class);

        // encuentra el calentamiento
        $calentamiento = Calentamiento::find($id);

        if ($calentamiento) {

            // lo elimina
            $calentamiento->delete();

            return response()->json(['message' => 'Calentamiento eliminado.'], 200);

        } else {
            return response()->json([
                'message' => 'calentamiento no encontrado',
            ], 404);
        }
    }
}
