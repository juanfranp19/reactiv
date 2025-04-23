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
            Entrenador::factory()->create();
        }
    }
}
