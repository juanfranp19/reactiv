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

                $ej_rut = new EjercicioRutina();
                $ej_rut->rutina_id = $rutina->id;
                $ej_rut->ejercicio_id = $ejercicios->random()->id;
                $ej_rut->num_series = rand(1, 6);
                $ej_rut->num_repeticiones = rand(9, 15);

                // compeuba si ya existe el ejercicio en la rutina
                $existeEjercicioEnRutina = (
                    EjercicioRutina::where('rutina_id', $ej_rut->rutina_id)
                        ->where('ejercicio_id', $ej_rut->ejercicio_id)
                        ->exists()
                );

                // si no existe, se le añade
                if (!$existeEjercicioEnRutina) $ej_rut->save();
            }

        }
    }
}
