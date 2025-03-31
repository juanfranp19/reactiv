<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {

            $data = $request->validate([
                'name' => ['required', 'string'],
                'password' => ['required', 'min:6'],
            ]);

        } catch(\Exception $ex) {
            return response()->json(['error' => $ex->getMessage()], 400);
        }

        try {

            $user = User::create($data);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 201);

        } catch(\Exception $ex) {
            return response()->json(['error' => $ex->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        try {

            $data = $request->validate([
                'name' => ['required', 'exists:users'],
                'password' => ['required', 'min:6'],
            ]);

        } catch(\Exception $ex) {
            return response()->json(['error' => $ex->getMessage()], 400);
        }

        $user = User::where('name', $data['name'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response([
                'message' => 'Usuario o contraseña incorrectos'
            ], 401);
        }

        try {

            $token = $user->createToken('auth_token')->plainTextToken;

        } catch(\Exception $ex) {
            return response()->json(['error' => $ex->getMessage()], 500);
        }

        return response()->json([
            'message' => 'Has iniciado sesión',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    public function logout()
    {
        try {

            auth()->user()->tokens()->delete(); // el código está bien

            //$user = Auth::user();
            //DB::table('personal_access_tokens')->where('tokenable_id', $user->id)->delete();

        } catch(\Exception $ex) {
            return response()->json(['error' => $ex->getMessage()], 500);
        }

        return response()->json([
            'message' => 'Has cerrado sesión',
        ], 200);
    }
}
