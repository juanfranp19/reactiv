<?php

namespace Database\Seeders;

use App\Models\Calentamiento;
use App\Models\CalentamientoSeguimiento;
use App\Models\Seguimiento;
use Illuminate\Database\Seeder;

class CalentamientoSeguimientoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CalentamientoSeguimiento::query()->delete();

        $seguimientos = Seguimiento::all();
        $calentamientos = Calentamiento::all();

        foreach ($seguimientos as $seguimiento) {

            $numCalentamientos = rand(0, 2);

            for ($i = 1; $i <= $numCalentamientos; $i++) {

                // coge un calentamiento de la tabla calentamientos
                $calentamiento = $calentamientos->random();

                // comprueba si ya existe el calentamiento en el seguimiento
                $existeCalentamientoEnSeguimiento = (
                    CalentamientoSeguimiento::where('seguimiento_id', $seguimiento->id)
                        ->where('calentamiento_id', $calentamiento->id)
                        ->exists()
                );

                // si no existe, se lo añade
                if (!$existeCalentamientoEnSeguimiento) {

                    $seguimiento->calentamientos()->attach($calentamiento->id);
                }
            }

        }
    }
}
