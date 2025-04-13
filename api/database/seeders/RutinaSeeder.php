<?php

namespace Database\Seeders;

use App\Models\Rutina;
use App\Models\Socio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RutinaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rutina::query()->delete();

        $socios = Socio::all();

        foreach ($socios as $socio) {

            $numRutinas = rand(1, 3);

            for ($i = 1; $i <= $numRutinas; $i++) {

                $rutina = new Rutina();

                $rutina->nombre = 'Rutina ' . $i;
                $rutina->descripcion = 'rutina para ' . $socio->nombre;
                $rutina->socio_id = $socio->id;

                $rutina->save();
            }

        }
    }
}
