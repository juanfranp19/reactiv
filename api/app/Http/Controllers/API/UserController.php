<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            Gate::authorize('viewAny', User::class);

            // devuelve el recurso ordenado por id
            $users = UserResource::collection(
                User::orderBy('id')->get(),
            );

            return response()->json([
                'data' => $users,
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    //public function store(Request $request)
    //{
        //
    //}

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // encuentra el ususario
        $user = User::findOrFail($id);

        Gate::authorize('view', [User::class, $user]);

        return response()->json([
            'data' => new UserResource($user),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // encuentra el usuario
        $user = User::findOrFail($id);

        Gate::authorize('update', [User::class, $user]);

        // valida los campos
        $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);

        // los actualiza
        $user->name = $request->input('name');
        $user->password = $request->input('password');
        $user->save();

        return response()->json(['message' => 'Usuario actualizado.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Gate::authorize('delete', User::class);

        // también elimina al socio que pertenece el usuario

        // encuentra el usuario
        $user = User::findOrFail($id);

        // lo elimina
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado.'], 200);
    }
}
