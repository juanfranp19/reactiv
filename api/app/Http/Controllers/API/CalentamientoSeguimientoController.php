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
        try {

            $seguimiento = Seguimiento::findOrFail($seguimiento_id);

            $request->validate([
                'calentamiento_id' => 'required|exists:calentamientos,id',
            ]);

            // comprobar que no se añade un calentamiento repetido en el mismo seguimiento (no se puede en el observer porque es un attach)
            $existeCalentamientoSeguimiento = (CalentamientoSeguimiento::where('seguimiento_id', $seguimiento_id)
                ->where('calentamiento_id', $request->calentamiento_id)
                ->exists()
            );

            // si ya la tiene, lanza mensaje
            if ($existeCalentamientoSeguimiento) return response()->json(['error' => 'Tu seguimiento ya tiene este calentamiento.'], 409);

            // asocia el calentamiento asociado
            $seguimiento->calentamientos()->attach($request->calentamiento_id);

            // devuelve el mensaje que aparece en la notificación
            return response()->json(['message' => 'Calentamiento añadido con éxito.'], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
            return response()->json(['message' => 'Calentamiento eliminado con éxito.'], 200);

        } else {

            return response()->json(['message' => 'Calentamiento no encontrado.'], 404);
        }
    }
}
