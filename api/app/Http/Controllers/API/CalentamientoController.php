<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CalentamientoResource;
use App\Models\Calentamiento;
use Illuminate\Http\Request;

class CalentamientoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $calentamientos = CalentamientoResource::collection(
                Calentamiento::orderBy('nombre')->get(),
            );

            return response()->json([
                'data' => $calentamientos,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $calentamiento = json_decode($request->getContent(), true);
            $calentamiento = Calentamiento::create($calentamiento);

            return response()->json([
                'data' => new CalentamientoResource($calentamiento),
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
        $calentamiento = Calentamiento::findOrFail($id);

        return response()->json([
            'data' => new CalentamientoResource($calentamiento),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $calentamiento = Calentamiento::find($id);

        if ($calentamiento) {

            $request->validate([
                'nombre' => 'required',
                'descripcion' => 'required',
            ]);

            $calentamiento->nombre = $request->input('nombre');
            $calentamiento->descripcion = $request->input('descripcion');
            $calentamiento->imagen = $request->input('imagen');
            $calentamiento->save();

            return response('', 204);

        } else {
            return response()->json([
                'message' => 'calentamiento no encontrado',
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $calentamiento = Calentamiento::find($id);

        if ($calentamiento) {

            $calentamiento->delete();
            return response('', 204);

        } else {
            return response()->json([
                'message' => 'calentamiento no encontrado',
            ], 404);
        }
    }
}
