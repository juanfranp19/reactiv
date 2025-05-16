<?php

namespace Database\Seeders;

use App\Models\Calentamiento;
use App\Models\CalentamientoRutina;
use App\Models\Rutina;
use Illuminate\Database\Seeder;

class CalentamientoRutinaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CalentamientoRutina::query()->delete();

        $rutinas = Rutina::all();
        $calentamientos = Calentamiento::all();

        foreach ($rutinas as $rutina) {

            $numCalentamientos = rand(1, 5);

            for ($i = 1; $i <= $numCalentamientos; $i++) {

                $cal_rut = new CalentamientoRutina();
                $cal_rut->rutina_id = $rutina->id;
                $cal_rut->calentamiento_id = $calentamientos->random()->id;
                $cal_rut->tiempo = rand(15, 120);

                // compeuba si ya existe el calentamiento en la rutina
                $existeCalentamientoEnRutina = (
                    CalentamientoRutina::where('rutina_id', $cal_rut->rutina_id)
                        ->where('calentamiento_id', $cal_rut->calentamiento_id)
                        ->exists()
                );

                // si no existe, se le añade
                if (!$existeCalentamientoEnRutina) $cal_rut->save();
            }

        }
    }
}
