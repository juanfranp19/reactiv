<?php

namespace Database\Seeders;

use App\Models\Rutina;
use App\Models\Seguimiento;
use App\Models\Socio;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SeguimientoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Seguimiento::query()->delete();

        $socios = Socio::all();

        foreach ($socios as $socio) {

            $fechasFactory = Seguimiento::factory()->make()->getAttributes();

            $rutinaIds = Rutina::where('socio_id', $socio->id)->pluck('id');

            for ($i = 1; $i <= count($fechasFactory); $i++) {

                $fecha = $fechasFactory['fecha'.$i];
                $dia = Carbon::parse($fecha)->day;
                $mes = Carbon::parse($fecha)->monthName;

                $seg = new Seguimiento();
                $seg->socio_id = $socio->id;
                $seg->rutina_id = $rutinaIds->random();
                $seg->observaciones = 'seguimiento de ' . $socio->nombre . ' del ' . $dia . ' de ' . $mes;
                $seg->fecha = $fecha;
                $seg->save();

            }

        }
    }
}
