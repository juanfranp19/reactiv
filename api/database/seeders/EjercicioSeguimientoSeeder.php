<?php

namespace Database\Seeders;

use App\Models\Ejercicio;
use App\Models\EjercicioSeguimiento;
use App\Models\Seguimiento;
use Illuminate\Database\Seeder;

class EjercicioSeguimientoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EjercicioSeguimiento::query()->delete();

        $seguimientos = Seguimiento::all();
        $ejercicios = Ejercicio::all();

        foreach ($seguimientos as $seguimiento) {

            $numEjercicios = rand(0, 5);

            for ($i = 1; $i <= $numEjercicios; $i++) {

                // coge un ejercicio de la tabla ejercicios
                $ejercicio = $ejercicios->random();

                // comprueba si ya existe el ejercicio en el seguimiento
                $existeEjercicioEnSeguimiento = (
                    EjercicioSeguimiento::where('seguimiento_id', $seguimiento->id)
                        ->where('ejercicio_id', $ejercicio->id)
                        ->exists()
                );

                // si no existe, se lo añade
                if (!$existeEjercicioEnSeguimiento) {

                    $seguimiento->ejercicios()->attach($ejercicio->id);
                }
            }

        }
    }
}
