<?php

namespace Database\Seeders;

use App\Models\Ejercicio;
use App\Models\EjercicioRutina;
use App\Models\Rutina;
use Illuminate\Database\Seeder;

class EjercicioRutinaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EjercicioRutina::query()->delete();

        $rutinas = Rutina::all();
        $ejercicios = Ejercicio::all();

        foreach ($rutinas as $rutina) {

            $numEjercicios = rand(3, 7);

            for ($i = 1; $i <= $numEjercicios; $i++) {

                // coge un ejercicio de la tabla ejercicios
                $ejercicio = $ejercicios->random();

                // comprueba si ya existe el ejercicio en la rutina
                $existeEjercicioEnRutina = (
                    EjercicioRutina::where('rutina_id', $rutina->id)
                        ->where('ejercicio_id', $ejercicio->id)
                        ->exists()
                );

                // si no existe, se lo añade
                if (!$existeEjercicioEnRutina) {

                    $rutina->ejercicios()->attach($ejercicio->id, [
                        'num_series' => rand(1, 6),
                        'num_repeticiones' => rand(9, 15),
                    ]);
                }
            }

        }
    }
}
