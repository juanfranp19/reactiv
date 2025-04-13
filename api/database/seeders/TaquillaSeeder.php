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
        Taquilla::query()->delete();

        $numSocios = env('FACTORY_SOCIOS_NUM', 100);
        $numTaquillas = $numSocios * 0.2; // el 20% de los socios

        $socios = Socio::all();

        for ($i = 1; $i <= $numTaquillas; $i++) {

            rand(1, 5) == 1 ? $taquillaNull = true : $taquillaNull = false;

            $socioRandomId = null;
            $fecha_fianza = null;

            if (!$taquillaNull) {

                $fecha_fianza = Taquilla::factory()->make()->fecha_fianza;

                $socioRandomId = $socios->random()->id;

                // si está repetido, la taquilla queda null para evitar otros problemas
                if (Taquilla::where('socio_id', $socioRandomId)->first()) {
                    $socioRandomId = null;
                    $fecha_fianza = null;
                }
            }

            $taq = new Taquilla();
            $taq->socio_id = $socioRandomId;
            $taq->fecha_fianza = $fecha_fianza;
            $taq->save();

        }
    }
}
