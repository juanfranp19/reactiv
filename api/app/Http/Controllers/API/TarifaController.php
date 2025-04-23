<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TarifaResource;
use App\Models\Tarifa;
use Illuminate\Http\Request;

class TarifaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $tarifas = TarifaResource::collection(
                Tarifa::orderBy('id')->get(),
            );

            return response()->json([
                'data' => $tarifas,
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
            $tarifa = json_decode($request->getContent(), true);
            $tarifa = Tarifa::create($tarifa);

            return response()->json([
                'data' => new TarifaResource($tarifa),
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
        $tarifa = Tarifa::findOrFail($id);

        return response()->json([
            'data' => new TarifaResource($tarifa),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $tarifa = Tarifa::findOrFail($id);

        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'duracion' => 'required',
            'precio' => 'required',
        ]);

        $tarifa->nombre = $request->input('nombre');
        $tarifa->descripcion = $request->input('descripcion');
        $tarifa->duracion = $request->input('duracion');
        $tarifa->precio = $request->input('precio');
        $tarifa->save();

        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tarifa = Tarifa::findOrFail($id);

        $tarifa->delete();
        return response('', 204);
    }
}
