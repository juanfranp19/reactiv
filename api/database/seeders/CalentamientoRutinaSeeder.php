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

            $numCalentamientos = rand(1, 3);

            for ($i = 1; $i <= $numCalentamientos; $i++) {

                $cal_rut = new CalentamientoRutina();
                $cal_rut->rutina_id = $rutina->id;
                $cal_rut->calentamiento_id = $calentamientos->random()->id;
                $cal_rut->tiempo = rand(15, 120);
                $cal_rut->save();

            }

        }
    }
}
