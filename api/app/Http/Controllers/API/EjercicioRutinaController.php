<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EjercicioRutina;
use App\Models\Rutina;
use Illuminate\Http\Request;

class EjercicioRutinaController extends Controller
{
    /**
     * Muestra los ejercicios de la rutina
     */
    public function index($rutina_id)
    {
        try {

            // si la rutina no está en la tabla ejercicios_rutinas, devuelve error
            if (EjercicioRutina::where('rutina_id', $rutina_id)->exists()) {

                // llama a la rutina con los ejercicios asociados
                //también para que aparezca el nombre del grupo musculara, además de grupo_id
                $rutina = Rutina::with('ejercicios.grupoMuscular')->findOrFail($rutina_id);

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
     * Alacena un ejercicio a la rutina
     */
    public function attach(Request $request, $rutina_id)
    {
        try {

            $rutina = Rutina::findOrFail($rutina_id);

            $request->validate([
                'ejercicio_id' => 'required|exists:ejercicios,id',
                'num_series' => 'required',
                'num_repeticiones' => 'required',
            ]);

            // asocia el ejercicio asociado con los valores pivot de la tabla
            $rutina->ejercicios()->attach($request->ejercicio_id, [
                'num_series' => $request->num_series,
                'num_repeticiones' => $request->num_repeticiones,
            ]);

            return response()->json(['message' => 'attached'], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Actualiza los valores pivot de la tabla
     */
    public function update(Request $request, $rutina_id)
    {
        $rutina = Rutina::with('ejercicios')->findOrFail($rutina_id);

        $request->validate([
            'ejercicio_id' => 'required|exists:ejercicios,id',
            'num_series' => 'required',
            'num_repeticiones' => 'required',
        ]);

        // si el ejercicio está en la rutina, lo actualiza; si no, salta error
        if ($rutina->ejercicios()->where('ejercicio_id', $request->ejercicio_id)->exists()) {

            // actualiza los pivot
            $rutina->ejercicios()->updateExistingPivot($request->ejercicio_id, [
                'num_series' => $request->num_series,
                'num_repeticiones' => $request->num_repeticiones,
            ]);

            return response('', 204);

        } else {

            return response()->json(['message' => 'ejercicio no encontrado'], 404);
        }
    }

    /**
     * Elimina un ejercicio de la rutina
     */
    public function detach(Request $request, $rutina_id)
    {
        $rutina = Rutina::findOrFail($rutina_id);

        $request->validate([
            'ejercicio_id' => 'required|exists:ejercicios,id',
        ]);

        // si el ejercicio está en la rutina, lo elimina; si no, salta error
        if ($rutina->ejercicios()->where('ejercicio_id', $request->ejercicio_id)->exists()) {

            // elimina el ejercicio de la rutina
            $rutina->ejercicios()->detach($request->ejercicio_id);

            return response('', 204);

        } else {

            return response()->json(['message' => 'ejercicio no encontrado'], 404);
        }
    }
}
