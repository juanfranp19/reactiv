<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\EntrenadorResource;
use App\Models\Entrenador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class EntrenadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            Gate::authorize('viewAny', Entrenador::class);

            // devaulve el recurso ordenado por id
            $entrenadores = EntrenadorResource::collection(
                Entrenador::orderBy('id')->get(),
            );

            return response()->json([
                'data' => $entrenadores,
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

            Gate::authorize('create', Entrenador::class);

            // obtiene la información de $request y la convierte a un array asociativo
            $entrenador = json_decode($request->getContent(), true);

            // crea el entrenador
            $entrenador = Entrenador::create($entrenador);

            return response()->json([
                'message' => 'Entrenador creado.',
                'data' => new EntrenadorResource($entrenador),
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
        Gate::authorize('view', Entrenador::class);

        // encuentra el entrenador
        $entrenador = Entrenador::findOrFail($id);

        return response()->json([
            'data' => new EntrenadorResource($entrenador),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // encuentra el entrenador
        $entrenador = Entrenador::findOrFail($id);

        Gate::authorize('update', [Entrenador::class, $entrenador]);

        // valida campos
        $request->validate([
            'nombre' => 'required',
            'apellidos' => 'required',
            'email' => 'required | email',
            'telefono' => 'required',
            'user_id' => 'required | exists:users,id'
        ]);

        // los actualiza
        $entrenador->nombre = $request->input('nombre');
        $entrenador->apellidos = $request->input('apellidos');
        $entrenador->email = $request->input('email');
        $entrenador->telefono = $request->input('telefono');
        $entrenador->user_id = $request->input('user_id');
        $entrenador->save();

        return response()->json(['message' => 'Entrenador actualizado.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Gate::authorize('delete', Entrenador::class);

        // encuentra el entrenador
        $entrenador = Entrenador::findOrFail($id);

        // lo elimina
        $entrenador->delete();

        return response()->json(['message' => 'Entrenador eliminado.'], 200);
    }
}
