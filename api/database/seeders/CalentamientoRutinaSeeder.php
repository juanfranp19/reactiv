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

                $calentamiento = $calentamientos->random();

                // comprueba si ya existe el calentamiento en la rutina
                $existeCalentamientoEnRutina = (
                    CalentamientoRutina::where('rutina_id', $rutina->id)
                        ->where('calentamiento_id', $calentamiento->id)
                        ->exists()
                );

                // si no existe, se lo añade
                if (!$existeCalentamientoEnRutina) {

                    $rutina->calentamientos()->attach($calentamiento->id, [
                        'tiempo' => rand(15, 120),
                    ]);
                }
            }

        }
    }
}
