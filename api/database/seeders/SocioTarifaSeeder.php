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
            SocioTarifa::factory()->create([
                'socio_id' => $socio->id,
            ]);
        }
    }
}
