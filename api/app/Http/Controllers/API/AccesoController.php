<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\AccesoResource;
use App\Models\Acceso;
use App\Models\Socio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AccesoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            Gate::authorize('viewAny', Acceso::class);

            // devuelve el recurso, ordenado por id
            $accesos = AccesoResource::collection(
                Acceso::orderBy('id')->get(),
            );

            return response()->json([
                'data' => $accesos,
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
            $datosAcceso = json_decode($request->getContent(), true);

            // obtiene el código de acceso
            $cod_acceso = $datosAcceso['cod_acceso'];

            // obtiene el socio de ese código
            $socio = Socio::where('cod_acceso', $cod_acceso)->first();

            if (!$socio) {
                return response()->json(['error' => 'Código de acceso inválido.'], 409);
            }

            // crea el acceso
            $acceso = Acceso::create([
                'hora_entrada' => $datosAcceso['hora_entrada'],
                'socio_id' => $socio->id,
            ]);

            return response()->json([
                'message' => 'Acceso creado.',
                'data' => new AccesoResource($acceso),
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
        // encuentra el acceso
        $acceso = Acceso::findOrFail($id);

        Gate::authorize('view', [Acceso::class, $acceso]);

        return response()->json([
            'data' => new AccesoResource($acceso),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // obtiene el código de acceso
        $cod_acceso = $request->input('cod_acceso');

        // obtiene el socio de ese código
        $socio = Socio::where('cod_acceso', $cod_acceso)->first();

        if (!$socio) {
            return response()->json(['error' => 'Código de acceso inválido.'], 409);
        }

        // encuentra el acceso sin salir de ese socio
        $acceso = (
            Acceso::where('socio_id', $socio->id)
                ->whereNull('hora_salida')
                ->first()
        );

        if (!$acceso) {
            return response()->json(['error' => 'Imposible salir sin haber entrado.'], 409);
        }

        // actualiza valores
        //$acceso->hora_entrada = $request->input('hora_entrada');
        $acceso->hora_salida = $request->input('hora_salida');
        $acceso->socio_id = $socio->id;

        $acceso->save();

        return response()->json(['message' => 'Acceso actualizado.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // encuentra el acceso
        $acceso = Acceso::findOrFail($id);

        Gate::authorize('delete', [Acceso::class, $acceso]);

        // lo elimina
        $acceso->delete();

        return response()->json(['message' => 'Acceso eliminado.'], 200);
    }
}
