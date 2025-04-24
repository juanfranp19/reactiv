<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

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
        $user = User::findOrFail($id);

        return response()->json([
            'data' => new UserResource($user),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);

        $user->name = $request->input('name');
        $user->password = $request->input('password');
        $user->save();

        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // también elimina al socio que pertenece el usuario

        $user = User::findOrFail($id);

        $user->delete();
        return response('', 204);
    }
}
