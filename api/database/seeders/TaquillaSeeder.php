<?php

namespace Database\Seeders;

use App\Models\Socio;
use App\Models\Taquilla;
use Illuminate\Database\Seeder;

class TaquillaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // elimina los datos de la tabla
        Taquilla::query()->delete();

        // obtiene el número de socios desde el .env
        $numSocios = env('FACTORY_SOCIOS_NUM', 100);

        // número de taquillas
        $numTaquillas = $numSocios * 0.2; // el 20% de los socios

        // todos los socios
        $socios = Socio::all();

        // por cada taquilla
        for ($i = 1; $i <= $numTaquillas; $i++) {

            // 1 de cada 5 taquillas estarán libres
            rand(1, 5) == 1 ? $taquillaNull = true : $taquillaNull = false;

            $socioRandomId = null;
            $fecha_fianza = null;
            $fianza = null;

            if (!$taquillaNull) {

                // se obtienen los datos

                $fecha_fianza = Taquilla::factory()->make()->fecha_fianza;

                $socioRandomId = $socios->random()->id;

                $fianza = 10;

                // si está repetido, la taquilla queda null para evitar otros problemas
                if (Taquilla::where('socio_id', $socioRandomId)->first()) {
                    $socioRandomId = null;
                    $fecha_fianza = null;
                    $fianza = null;
                }
            }

            // se crea la taquilla
            $taq = new Taquilla();
            $taq->socio_id = $socioRandomId;
            $taq->fecha_fianza = $fecha_fianza;
            $taq->fianza = $fianza;
            $taq->save();

        }
    }
}
