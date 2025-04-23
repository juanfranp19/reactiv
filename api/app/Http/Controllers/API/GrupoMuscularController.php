<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\GrupoMuscularResource;
use App\Models\GrupoMuscular;
use Illuminate\Http\Request;

class GrupoMuscularController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

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

            // obtiene la información de $request y la convierte a un array asociativo
            $grupo_muscular = json_decode($request->getContent(), true);
            $grupo_muscular = GrupoMuscular::create($grupo_muscular);

            return response()->json([
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
        $grupo_muscular = GrupoMuscular::findOrFail($id);

        $request->validate([
            'nombre' => 'required',
        ]);

        $grupo_muscular->nombre = $request->input('nombre');
        $grupo_muscular->save();

        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $grupo_muscular = GrupoMuscular::findOrFail($id);

        $grupo_muscular->delete();
        return response('', 204);
    }
}
