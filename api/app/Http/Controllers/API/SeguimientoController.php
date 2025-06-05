<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\SeguimientoResource;
use App\Models\Seguimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class SeguimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            Gate::authorize('viewAny', Seguimiento::class);

            // devuelve recurso ordenado por id
            $seguimientos = SeguimientoResource::collection(
                Seguimiento::orderBy('id')->get(),
            );

            return response()->json([
                'data' => $seguimientos,
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

            Gate::authorize('create', Seguimiento::class);

            // obtiene la información de $request y la convierte a un array asociativo
            $seguimiento = json_decode($request->getContent(), true);

            // crea el seguimiento
            $seguimiento = Seguimiento::create($seguimiento);

            return response()->json([
                'data' => new SeguimientoResource($seguimiento),
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
        // encuentra el seguimiento
        $seguimiento = Seguimiento::findOrFail($id);

        Gate::authorize('view', [Seguimiento::class, $seguimiento]);

        return response()->json([
            'message' => 'Seguimiento creado.',
            'data' => new SeguimientoResource($seguimiento),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // encuentra el seguimiento
        $seguimiento = Seguimiento::findOrFail($id);

        Gate::authorize('update', [Seguimiento::class, $seguimiento]);

        // valida campos
        $request->validate([
            //'socio_id' => 'required',
            //'rutina_id' => 'required',
            //'observaciones' => 'required',
            'fecha' => 'required',
        ]);

        // los actualiza
        //$seguimiento->socio_id = $request->input('socio_id');
        $seguimiento->rutina_id = $request->input('rutina_id');
        $seguimiento->observaciones = $request->input('observaciones');
        $seguimiento->fecha = $request->input('fecha');
        $seguimiento->save();

        return response()->json(['message' => 'Seguimiento actualizado.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // encuentra el seguimiento
        $seguimiento = Seguimiento::findOrFail($id);

        Gate::authorize('delete', [Seguimiento::class, $seguimiento]);

        // lo elimina
        $seguimiento->delete();

        return response()->json(['message' => 'Seguimiento eliminado.'], 200);
    }
}
