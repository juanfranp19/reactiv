<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\EjercicioResource;
use App\Models\Ejercicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class EjercicioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            Gate::authorize('viewAny', Ejercicio::class);

            // devuelve el recurso ordenado por id
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

            Gate::authorize('create', Ejercicio::class);

            // obtiene la información de $request y la convierte a un array asociativo
            $ejercicio = json_decode($request->getContent(), true);

            // crea el ejercicio
            $ejercicio = Ejercicio::create($ejercicio);

            return response()->json([
                'message' => 'Ejercicio creado.',
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
        Gate::authorize('view', Ejercicio::class);

        // encuentra el ejercicio
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
        Gate::authorize('update', Ejercicio::class);

        // encuentra el ejercicio
        $ejercicio = Ejercicio::findOrFail($id);

        // valida campos
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'grupo_id' => 'required | exists:grupos_musculares,id',
        ]);

        // los actualiza
        $ejercicio->nombre = $request->input('nombre');
        $ejercicio->descripcion = $request->input('descripcion');
        $ejercicio->imagen = $request->input('imagen');
        $ejercicio->grupo_id = $request->input('grupo_id');
        $ejercicio->save();

        return response()->json(['message' => 'Ejercicio actualizado.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Gate::authorize('delete', Ejercicio::class);

        // encuentra el ejercicio
        $ejercicio = Ejercicio::findOrFail($id);

        // lo elimina
        $ejercicio->delete();

        return response()->json(['message' => 'Ejercicio eliminado.'], 200);
    }
}
