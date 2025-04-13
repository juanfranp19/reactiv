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

                $ej_seg = new EjercicioSeguimiento();
                $ej_seg->seguimiento_id = $seguimiento->id;
                $ej_seg->ejercicio_id = $ejercicios->random()->id;
                $ej_seg->save();

            }

        }
    }
}
