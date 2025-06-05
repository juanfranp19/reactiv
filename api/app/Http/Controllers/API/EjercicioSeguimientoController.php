<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EjercicioSeguimiento;
use App\Models\Seguimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class EjercicioSeguimientoController extends Controller
{
    /**
     * Muestra los ejercicios del seguimiento
     */
    public function index($seguimiento_id)
    {
        try {

            Gate::authorize('view', [EjercicioSeguimiento::class, $seguimiento_id]);

            // si el seguimiento no está en la tabla ejercicios_seguimientos, devuelve error
            if (EjercicioSeguimiento::where('seguimiento_id', $seguimiento_id)->exists()) {

                // llama al seguimiento específico con los ejercicios que están asociados
                //también para que aparezca el nombre del grupo musculara, además de grupo_id
                $seguimiento = Seguimiento::with('ejercicios.grupoMuscular')->findOrFail($seguimiento_id);

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
        try {

            Gate::authorize('create', EjercicioSeguimiento::class);

            // encuentra el seguimiento
            $seguimiento = Seguimiento::findOrFail($seguimiento_id);

            // valida campos
            $request->validate([
                'ejercicio_id' => 'required|exists:ejercicios,id',
            ]);

            // comprobar que no se añade un ejercicio repetido en el mismo seguimiento (no se puede en el observer porque es un attach)
            $existeEjercicioSeguimiento = (EjercicioSeguimiento::where('seguimiento_id', $seguimiento_id)
                ->where('ejercicio_id', $request->ejercicio_id)
                ->exists()
            );

            // si ya la tiene, lanza mensaje
            if ($existeEjercicioSeguimiento) return response()->json(['error' => 'Tu seguimiento ya tiene este ejercicio.'], 409);

            // asocia el ejercicio asociado
            $seguimiento->ejercicios()->attach($request->ejercicio_id);

            // devuelve el mensaje que aparece en la notificación
            return response()->json(['message' => 'Ejercicio añadido.'], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Elimina un ejercicio del seguimiento
     */
    public function detach(Request $request, $seguimiento_id)
    {
        Gate::authorize('delete', [EjercicioSeguimiento::class, $seguimiento_id]);

        // encuentra el seguimiento
        $seguimiento = Seguimiento::findOrFail($seguimiento_id);

        // valida campos
        $request->validate([
            'ejercicio_id' => 'required|exists:ejercicios,id',
        ]);

        // si el ejercicio está en el seguimiento, lo elimina; si no, salta error
        if ($seguimiento->ejercicios()->where('ejercicio_id', $request->ejercicio_id)->exists()) {

            // lo elimina
            $seguimiento->ejercicios()->detach($request->ejercicio_id);

            // devuelve el mensaje que aparece en la notificación
            return response()->json(['message' => 'Ejercicio eliminado.'], 200);

        } else {

            return response()->json(['message' => 'Ejercicio no encontrado.'], 404);
        }
    }
}
