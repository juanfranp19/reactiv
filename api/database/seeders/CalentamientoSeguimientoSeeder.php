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

                $cal_seg = new CalentamientoSeguimiento();
                $cal_seg->seguimiento_id = $seguimiento->id;
                $cal_seg->calentamiento_id = $calentamientos->random()->id;
                $cal_seg->save();

            }

        }
    }
}
