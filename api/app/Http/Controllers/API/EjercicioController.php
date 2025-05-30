<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\EjercicioResource;
use App\Models\Ejercicio;
use Illuminate\Http\Request;

class EjercicioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $ejercicios = EjercicioResource::collection(
                Ejercicio::orderBy('id')->get(),
            );

            return response()->json([
                'data' => $ejercicios,
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
            $ejercicio = json_decode($request->getContent(), true);
            $ejercicio = Ejercicio::create($ejercicio);

            return response()->json([
                'data' => new EjercicioResource($ejercicio),
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
        $ejercicio = Ejercicio::findOrFail($id);

        return response()->json([
            'data' => new EjercicioResource($ejercicio),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $ejercicio = Ejercicio::findOrFail($id);

        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'grupo_id' => 'required | exists:grupos_musculares,id',
        ]);

        $ejercicio->nombre = $request->input('nombre');
        $ejercicio->descripcion = $request->input('descripcion');
        $ejercicio->imagen = $request->input('imagen');
        $ejercicio->grupo_id = $request->input('grupo_id');
        $ejercicio->save();

        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ejercicio = Ejercicio::findOrFail($id);

        $ejercicio->delete();
        return response('', 204);
    }
}
