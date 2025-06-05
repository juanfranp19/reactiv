<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\RutinaResource;
use App\Models\Rutina;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RutinaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            Gate::authorize('viewAny', Rutina::class);

            // devuelve recurso ordenado por id
            $rutinas = RutinaResource::collection(
                Rutina::orderBy('id')->get(),
            );

            return response()->json([
                'data' => $rutinas,
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

            Gate::authorize('create', Rutina::class);

            // obtiene la información de $request y la convierte a un array asociativo
            $rutina = json_decode($request->getContent(), true);

            // crea la rutina
            $rutina = Rutina::create($rutina);

            return response()->json([
                'data' => new RutinaResource($rutina),
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
        // encuentra la rutina
        $rutina = Rutina::findOrFail($id);

        Gate::authorize('view', [Rutina::class, $rutina]);

        return response()->json([
            'message' => 'Rutina creada.',
            'data' => new RutinaResource($rutina),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // encuentra la rutina
        $rutina = Rutina::findOrFail($id);

        Gate::authorize('update', [Rutina::class, $rutina]);

        // valida campos
        $request->validate([
            'nombre' => 'required',
            //'descripcion' => 'required',
            //'socio_id' => 'required | exists:socios,id',
        ]);

        // los actualiza
        $rutina->nombre = $request->input('nombre');
        $rutina->descripcion = $request->input('descripcion');
        $rutina->socio_id = $request->input('socio_id');
        $rutina->save();

        return response()->json(['message' => 'Rutina actualizada.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // encuentra la rutina
        $rutina = Rutina::findOrFail($id);

        Gate::authorize('delete', [Rutina::class, $rutina]);

        // la elimina
        $rutina->delete();

        return response()->json(['message' => 'Rutina eliminada.'], 200);
    }
}
