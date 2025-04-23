<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\RutinaResource;
use App\Models\Rutina;
use Illuminate\Http\Request;

class RutinaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

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

            // obtiene la información de $request y la convierte a un array asociativo
            $rutina = json_decode($request->getContent(), true);
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
        $rutina = Rutina::findOrFail($id);

        return response()->json([
            'data' => new RutinaResource($rutina),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $rutina = Rutina::findOrFail($id);

        $request->validate([
            'nombre' => 'required',
            //'descripcion' => 'required',
            'socio_id' => 'required | exists:socios,id',
        ]);

        $rutina->nombre = $request->input('nombre');
        $rutina->descripcion = $request->input('descripcion');
        $rutina->socio_id = $request->input('socio_id');
        $rutina->save();

        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $rutina = Rutina::findOrFail($id);

        $rutina->delete();
        return response('', 204);
    }
}
