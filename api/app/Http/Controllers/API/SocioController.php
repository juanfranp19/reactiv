<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\SocioResource;
use App\Models\Socio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class SocioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            Gate::authorize('viewAny', Socio::class);

            // devuelve el recurso ordenado por nombre
            $socios = SocioResource::collection(
                Socio::orderBy('nombre')->get(),
            );

            return response()->json([
                'data' => $socios,
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

            Gate::authorize('create', Socio::class);

            // obtiene la información de $request y la convierte a un array asociativo
            $socio = $request->all();

            // crea el socio
            $socio = Socio::create($socio);

            return response()->json([
                'message' => 'Socio creado.',
                'data' => new SocioResource($socio),
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
        // encuentra el socio
        $socio = Socio::findOrFail($id);

        Gate::authorize('view', [Socio::class, $socio]);

        return response()->json([
            'data' => new SocioResource($socio),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        Gate::authorize('update', Socio::class);

        // encuentra el socio
        $socio = Socio::findOrFail($id);

        // valida los campos
        $request->validate([
            'dni' => 'required',
            'nombre' => 'required',
            'apellidos' => 'required',
            'fecha_nac' => 'required',
            'email' => 'required | email',
            'telefono' => 'required',
            'direccion' => 'required',
            'provincia' => 'required',
            'ciudad' => 'required',
            //'imagen' => 'required',
            //'user_id' => 'required | exists:users,id',
        ]);

        // los actualiza
        $socio->dni = $request->input('dni');
        $socio->nombre = $request->input('nombre');
        $socio->apellidos = $request->input('apellidos');
        $socio->fecha_nac = $request->input('fecha_nac');
        $socio->email = $request->input('email');
        $socio->telefono = $request->input('telefono');
        $socio->direccion = $request->input('direccion');
        $socio->provincia = $request->input('provincia');
        $socio->ciudad = $request->input('ciudad');
        //$socio->imagen = $request->input('imagen');
        //$socio->user_id = $request->input('user_id');
        $socio->save();

        return response()->json(['message' => 'Socio actualizado.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Gate::authorize('delete', Socio::class);

        // encuentra el socio
        $socio = Socio::findOrFail($id);

        // lo elimina
        $socio->delete();

        return response()->json(['message' => 'Socio eliminado.'], 200);
    }
}
