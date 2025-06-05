<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\GrupoMuscularResource;
use App\Models\GrupoMuscular;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class GrupoMuscularController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            Gate::authorize('viewAny', GrupoMuscular::class);

            // devuelve el recurso, ordenado por id
            $grupos_musculares = GrupoMuscularResource::collection(
                GrupoMuscular::orderBy('nombre')->get(),
            );

            return response()->json([
                'data' => $grupos_musculares,
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

            Gate::authorize('create', GrupoMuscular::class);

            // obtiene la información de $request y la convierte a un array asociativo
            $grupo_muscular = json_decode($request->getContent(), true);

            // crea el grupo muscular
            $grupo_muscular = GrupoMuscular::create($grupo_muscular);

            return response()->json([
                'message' => 'Grupo muscular creado.',
                'data' => new GrupoMuscularResource($grupo_muscular),
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
        Gate::authorize('view', GrupoMuscular::class);

        // encuentra el grupo muscular
        $grupo_muscular = GrupoMuscular::findOrFail($id);

        return response()->json([
            'data' => new GrupoMuscularResource($grupo_muscular),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        Gate::authorize('update', GrupoMuscular::class);

        // encuentra el grupo muscular
        $grupo_muscular = GrupoMuscular::findOrFail($id);

        // valida los campos
        $request->validate([
            'nombre' => 'required',
        ]);

        // los actualiza
        $grupo_muscular->nombre = $request->input('nombre');
        $grupo_muscular->save();

        return response()->json(['message' => 'Grupo muscular actualizado.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Gate::authorize('delete', GrupoMuscular::class);

        // encuentra el grupo muscular
        $grupo_muscular = GrupoMuscular::findOrFail($id);

        // lo elimina
        $grupo_muscular->delete();

        return response()->json(['message' => 'Grupo muscular eliminado.'], 200);
    }
}
