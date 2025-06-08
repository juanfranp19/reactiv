<?php

namespace Database\Seeders;

use App\Models\Acceso;
use App\Models\Rutina;
use App\Models\Seguimiento;
use App\Models\Socio;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class SeguimientoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // elimina todos los datos de la tabla
        Seguimiento::query()->delete();

        // todos los socios
        $socios = Socio::all();

        foreach ($socios as $socio) {

            // obtiene las fechas generadas por el factory
            $fechasFactory = Seguimiento::factory()->make()->getAttributes();

            // devuelve todos los IDs de rutinas de ese socio
            $rutinaIds = Rutina::where('socio_id', $socio->id)->pluck('id');

            for ($i = 1; $i <= count($fechasFactory); $i++) {

                // obtiene una fecha de las opciones que ofrece el factory
                $fecha = $fechasFactory['fecha'.$i];
                $dia = Carbon::parse($fecha)->day;
                $mes = Carbon::parse($fecha)->monthName;

                // obtiene el acceso que coincida con la fecha del seguimiento
                $accesoConMismaFecha = Acceso::whereDate('hora_entrada', $fecha)->where('socio_id', $socio->id)->first();

                Log::info($accesoConMismaFecha);

                // averigua si la fecha generada por el factory ya existe entre los seguimientos del socio
                $fechaExistente = Seguimiento::where('socio_id', $socio->id)->where('fecha', $fecha)->exists();

                Log::info($fechaExistente);

                // si se ha obtenido acceso con misma fecha y NO hay fecha repetida, crea el nuevo seguimiento
                if ($accesoConMismaFecha && !$fechaExistente) {

                    $seg = new Seguimiento();
                    $seg->socio_id = $socio->id;
                    $seg->rutina_id = $rutinaIds->random();
                    $seg->acceso_id = $accesoConMismaFecha->id;
                    $seg->observaciones = 'seguimiento de ' . $socio->nombre . ' del ' . $dia . ' de ' . $mes;
                    $seg->fecha = $fecha;
                    $seg->save();
                }

            }

        }
    }
}
