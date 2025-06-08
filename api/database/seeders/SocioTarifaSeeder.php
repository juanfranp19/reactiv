<?php

namespace Database\Seeders;

use App\Models\Socio;
use App\Models\SocioTarifa;
use Illuminate\Database\Seeder;

class SocioTarifaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SocioTarifa::query()->delete();

        $socios = Socio::all();

        foreach ($socios as $socio) {

            // coge todos los datos del factory
            $factoryData = SocioTarifa::factory()->make()->toArray();

            $socio->tarifas()->attach(2, [
                'fecha_inicio' => '2025-01-13',
                'fecha_fin' => '2025-04-13',
            ]);

            $socio->tarifas()->attach(1, [
                'fecha_inicio' => '2025-04-28',
                'fecha_fin' => '2025-05-28',
            ]);

            $socio->tarifas()->attach($factoryData['tarifa_id'], [
                'fecha_inicio' => $factoryData['fecha_inicio'],
                'fecha_fin' => $factoryData['fecha_fin'],
            ]);
        }
    }
}
