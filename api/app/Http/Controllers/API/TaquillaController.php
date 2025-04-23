<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaquillaResource;
use App\Models\Taquilla;
use Illuminate\Http\Request;

class TaquillaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

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

            // obtiene la información de $request y la convierte a un array asociativo
            $taquilla = json_decode($request->getContent(), true);
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
        $taquilla = Taquilla::findOrFail($id);

        return response()->json([
            'data' => new TaquillaResource($taquilla),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $taquilla = Taquilla::findOrFail($id);

        $request->validate([
            //'socio_id' => 'required',
            //'fecha_fianza' => 'required',
        ]);

        $taquilla->socio_id = $request->input('socio_id');
        $taquilla->fecha_fianza = $request->input('fecha_fianza');
        $taquilla->save();

        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $taquilla = Taquilla::findOrFail($id);

        $taquilla->delete();
        return response('', 204);
    }
}
