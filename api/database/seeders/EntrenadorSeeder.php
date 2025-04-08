<?php

namespace Database\Seeders;

use App\Models\Entrenador;
use App\Models\User;
use Illuminate\Database\Seeder;

class EntrenadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Entrenador::query()->delete();

        $users = User::whereNotIn('id', Entrenador::pluck('user_id'))->get();

        $numEntrenadores = env('FACTORY_ENTRENADORES_NUM', 3);
        for ($i = 0; $i < $numEntrenadores; $i++) {

            Entrenador::factory()->create([
                'user_id' => $users[$i]->id,
            ]);

        }
    }
}
