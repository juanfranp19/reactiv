<?php

namespace Database\Seeders;

use App\Models\Acceso;
use App\Models\Socio;
use Illuminate\Database\Seeder;

class AccesoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Acceso::query()->delete();

        $socios = Socio::all();

        foreach ($socios as $socio) {

            $numAccesos = rand(5, 20);

            Acceso::factory($numAccesos)->create([
                'socio_id' => $socio->id,
            ]);

        }
    }
}
