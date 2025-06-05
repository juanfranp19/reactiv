<?php

namespace Database\Seeders;

use App\Models\Entrenador;
use Illuminate\Database\Seeder;

class EntrenadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Entrenador::query()->delete();

        $numEntrenadores = env('FACTORY_ENTRENADORES_NUM', 3);

        // de esta forma con el for porque sinó da error de clave única con los user_id
        for ($i = 0; $i < $numEntrenadores; $i++) {

            // el primer entrenador es admin
            if ($i === 0) {

                Entrenador::factory()->create([
                    'nombre' => 'admin',
                    'apellidos' => 'admin',
                    'email' => 'admin@reactiv.fit',
                    'telefono' => 999999999,
                    'admin' => 1,
                ]);

            } else {
                Entrenador::factory()->create();
            }
        }
    }
}
