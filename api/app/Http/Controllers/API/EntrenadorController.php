<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\EntrenadorResource;
use App\Models\Entrenador;
use Illuminate\Http\Request;

class EntrenadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

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

            // obtiene la información de $request y la convierte a un array asociativo
            $entrenador = json_decode($request->getContent(), true);
            $entrenador = Entrenador::create($entrenador);

            return response()->json([
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
        $entrenador = Entrenador::findOrFail($id);

        $request->validate([
            'nombre' => 'required',
            'apellidos' => 'required',
            'email' => 'required | email',
            'telefono' => 'required',
            'user_id' => 'required | exists:users,id'
        ]);

        $entrenador->nombre = $request->input('nombre');
        $entrenador->apellidos = $request->input('apellidos');
        $entrenador->email = $request->input('email');
        $entrenador->telefono = $request->input('telefono');
        $entrenador->user_id = $request->input('user_id');
        $entrenador->save();

        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $entrenador = Entrenador::findOrFail($id);

        $entrenador->delete();
        return response('', 204);
    }
}
