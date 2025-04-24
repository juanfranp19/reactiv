<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CalentamientoRutina;
use App\Models\Rutina;
use Illuminate\Http\Request;

class CalentamientoRutinaController extends Controller
{
    /**
     * Muestra los calentamientos de la rutina
     */
    public function index($rutina_id)
    {
        try {

            // si la rutina no está en la tabla calentamientos_rutinas, devuelve error
            if (CalentamientoRutina::where('rutina_id', $rutina_id)->exists()) {

                // llama a la turina específica con los calentamientos que están asociados
                $rutina = Rutina::with('calentamientos')->findOrFail($rutina_id);

                return response()->json([
                    'data' => $rutina,
                ], 200);

            } else {

                return response()->json(['message' => 'rutina no encontrada'], 404);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Almacena un calentamiento a la rutina
     */
    public function attach(Request $request, $rutina_id)
    {
        $rutina = Rutina::findOrFail($rutina_id);

        $request->validate([
            'calentamiento_id' => 'required|exists:calentamientos,id',
            'tiempo' => 'required',
        ]);

        // asocia el calentamiento asociado con el valor extra de la tabla, el tiempo
        $rutina->calentamientos()->attach($request->calentamiento_id, [
            'tiempo' => $request->tiempo,
        ]);

        return response()->json(['message' => 'attached'], 201);
    }

    /**
     * Actualiza el valor pivot de la tabla: tiempo
     */
    public function update(Request $request, $rutina_id)
    {
        $rutina = Rutina::with('calentamientos')->findOrFail($rutina_id);

        $request->validate([
            'calentamiento_id' => 'required|exists:calentamientos,id',
            'tiempo' => 'required',
        ]);

        // si el calentamiento está en la rutina, lo actualiza; si no, salta error
        if ($rutina->calentamientos()->where('calentamiento_id', $request->calentamiento_id)->exists()) {

            // actualiza el tiempo del calentamiento especificado de la rutina
            $rutina->calentamientos()->updateExistingPivot($request->calentamiento_id, [
                'tiempo' => $request->tiempo,
            ]);

            return response('', 204);

        } else {

            return response()->json(['message' => 'calentamiento no encontrado'], 404);
        }
    }

    /**
     * Elimina un calentamiento de la rutina
     */
    public function detach(Request $request, $rutina_id)
    {
        $rutina = Rutina::findOrFail($rutina_id);

        $request->validate([
            'calentamiento_id' => 'required|exists:calentamientos,id',
        ]);

        // si el calentamiendo está en la rutina, lo elimina; si no, salta error
        if ($rutina->calentamientos()->where('calentamiento_id', $request->calentamiento_id)->exists()) {

            $rutina->calentamientos()->detach($request->calentamiento_id);
            return response('', 204);

        } else {

            return response()->json(['message' => 'calentamiento no encontrado'], 404);
        }
    }
}
