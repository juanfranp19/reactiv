<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EjercicioSeguimiento;
use App\Models\Seguimiento;
use Illuminate\Http\Request;

class EjercicioSeguimientoController extends Controller
{
    /**
     * Muestra los ejercicios del seguimiento
     */
    public function index($seguimiento_id)
    {
        try {

            // si el seguimiento no está en la tabla ejercicios_seguimientos, devuelve error
            if (EjercicioSeguimiento::where('seguimiento_id', $seguimiento_id)->exists()) {

                // llama al seguimiento específico con los ejercicios que están asociados
                $seguimiento = Seguimiento::with('ejercicios')->findOrFail($seguimiento_id);

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
     * Almacena un ejercicio al seguimiento
     */
    public function attach(Request $request, $seguimiento_id)
    {
        $seguimiento = Seguimiento::findOrFail($seguimiento_id);

        $request->validate([
            'ejercicio_id' => 'required|exists:ejercicios,id',
        ]);

        try {

            // asocia el ejercicio asociado
            $seguimiento->ejercicios()->attach($request->ejercicio_id);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'attached'], 201);
    }

    /**
     * Elimina un ejercicio del seguimiento
     */
    public function detach(Request $request, $seguimiento_id)
    {
        $seguimiento = Seguimiento::findOrFail($seguimiento_id);

        $request->validate([
            'ejercicio_id' => 'required|exists:ejercicios,id',
        ]);

        // si el ejercicio está en el seguimiento, lo elimina; si no, salta error
        if ($seguimiento->ejercicios()->where('ejercicio_id', $request->ejercicio_id)->exists()) {

            // lo elimina
            $seguimiento->ejercicios()->detach($request->ejercicio_id);
            return response('', 204);

        } else {

            return response()->json(['message' => 'ejercicio no encontrado'], 404);
        }
    }
}
