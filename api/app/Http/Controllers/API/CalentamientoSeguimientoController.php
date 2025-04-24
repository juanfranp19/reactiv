<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CalentamientoSeguimiento;
use App\Models\Seguimiento;
use Illuminate\Http\Request;

class CalentamientoSeguimientoController extends Controller
{
    /**
     * Muestra los calentamientos del seguimiento
     */
    public function index($seguimiento_id)
    {
        try {

            // si el seguimiento no está en la tabla calentamientos_seguimientos, devuelve error
            if (CalentamientoSeguimiento::where('seguimiento_id', $seguimiento_id)->exists()) {

                // llama al seguimiento específico con los calentamientos que están asociados
                $seguimiento = Seguimiento::with('calentamientos')->findOrFail($seguimiento_id);

                return response()->json([
                    'data' => $seguimiento,
                ], 200);

            } else {

                return response()->json(['message' => 'seguimiento no encontrado'], 404);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Almacena un calentamiento al seguimiento
     */
    public function attach(Request $request, $seguimiento_id)
    {
        $seguimiento = Seguimiento::findOrFail($seguimiento_id);

        $request->validate([
            'calentamiento_id' => 'required|exists:calentamientos,id',
        ]);

        try {

            // asocia el calentamiento asociado
            $seguimiento->calentamientos()->attach($request->calentamiento_id);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'attached'], 201);
    }

    /**
     * Elimina un calentamiento del seguimiento
     */
    public function detach(Request $request, $seguimiento_id)
    {
        $seguimiento = Seguimiento::findOrFail($seguimiento_id);

        $request->validate([
            'calentamiento_id' => 'required|exists:calentamientos,id',
        ]);

        // si el calentamiendo está en el seguimiento, lo elimina; si no, salta error
        if ($seguimiento->calentamientos()->where('calentamiento_id', $request->calentamiento_id)->exists()) {

            $seguimiento->calentamientos()->detach($request->calentamiento_id);
            return response('', 204);

        } else {

            return response()->json(['message' => 'calentamiento no encontrado'], 404);
        }
    }
}
