<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Socio;
use App\Models\SocioTarifa;
use Illuminate\Http\Request;

class SocioTarifaController extends Controller
{
    /**
     * Muestra las tarifas del socio
     */
    public function index($socio_id)
    {
        try {

            // si el socio no está en la tabla socios_tarifas, devuelve error
            if (SocioTarifa::where('socio_id', $socio_id)->exists()) {

                // llama al socio con las tarifas asociadas
                $socio = Socio::with('tarifas')->findOrFail($socio_id);

                return response()->json([
                    'data' => $socio,
                ], 200);

            } else {

                return response()->json(['message' => 'socio no encontrado'], 404);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Almacena una tarifa al socio
     */
    public function attach(Request $request, $socio_id)
    {
        try {

            $socio = Socio::findOrFail($socio_id);

            $request->validate([
                'tarifa_id' => 'required|exists:tarifas,id',
                'fecha_inicio' => 'required',
                //'fecha_fin' => 'required',
            ]);

            // asocia la tarifa junto con los valores pivot
            $socio->tarifas()->attach($request->tarifa_id, [
                'fecha_inicio' => $request->fecha_inicio,
                //'fecha_fin' => $request->fecha_fin,
            ]);

            return response()->json(['message' => 'attached'], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Actualiza los valores pivot de la tabla
     */
    public function update(Request $request, $socio_id)
    {
        $socio = Socio::with('tarifas')->findOrFail($socio_id);

        $request->validate([
            'tarifa_id' => 'required|exists:tarifas,id',
            'fecha_inicio' => 'required',
            'fecha_fin' => 'required',
        ]);

        // si la tarifa está en el socio, lo actualiza; si no, salta error
        if ($socio->tarifas()->where('tarifa_id', $request->tarifa_id)->exists()) {

            // actualiza los valores pivot
            $socio->tarifas()->updateExistingPivot($request->tarifa_id, [
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_fin' => $request->fecha_fin,
            ]);

            return response('', 204);

        } else {

            return response()->json(['message' => 'tarifa no encontrada'], 404);
        }
    }

    /**
     * Elimina una tarifa del socio
     */
    public function detach(Request $request, $socio_id)
    {
        $socio = Socio::findOrFail($socio_id);

        $request->validate([
            'tarifa_id' => 'required|exists:tarifas,id',
        ]);

        // si la tarifa está en el socio, lo elimina; si no, salta error
        if ($socio->tarifas()->where('tarifa_id', $request->tarifa_id)->exists()) {

            // elimina la tarifa del socio
            $socio->tarifas()->detach($request->tarifa_id);

            return response('', 204);

        } else {

            return response()->json(['message' => 'tarifa no encontrada'], 404);
        }
    }
}
