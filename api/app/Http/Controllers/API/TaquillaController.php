<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaquillaResource;
use App\Models\Taquilla;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TaquillaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            Gate::authorize('viewAny', Taquilla::class);

            // devuelve el recurso ordenado por id
            $taquillas = TaquillaResource::collection(
                Taquilla::orderBy('id')->get(),
            );

            return response()->json([
                'data' => $taquillas,
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

            Gate::authorize('create', Taquilla::class);

            // obtiene la información de $request y la convierte a un array asociativo
            $taquilla = json_decode($request->getContent(), true);

            // crea la taquilla
            $taquilla = Taquilla::create($taquilla);

            return response()->json([
                'data' => new TaquillaResource($taquilla),
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
        // encuentra la taquilla
        $taquilla = Taquilla::findOrFail($id);

        Gate::authorize('view', [Taquilla::class, $taquilla]);

        return response()->json([
            'message' => 'Taquilla creada.',
            'data' => new TaquillaResource($taquilla),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        Gate::authorize('update', Taquilla::class);

        // encuentra la taquilla
        $taquilla = Taquilla::findOrFail($id);

        // valida los campos
        $request->validate([
            //'socio_id' => 'required',
            //'fecha_fianza' => 'required',
        ]);

        // los actualiza
        $taquilla->socio_id = $request->input('socio_id');
        $taquilla->fecha_fianza = $request->input('fecha_fianza');
        $taquilla->save();

        return response()->json(['message' => 'Taquilla actualizada.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Gate::authorize('delete', Taquilla::class);

        // encuentra la taquilla
        $taquilla = Taquilla::findOrFail($id);

        // la elimina
        $taquilla->delete();

        return response()->json(['message' => 'Taquilla eliminada.'], 200);
    }
}
