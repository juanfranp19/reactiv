<?php

namespace Database\Factories;

use App\Models\Tarifa;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SocioTarifa>
 */
class SocioTarifaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        /**
         *  tarifa_id
         */
        $tarifas = Tarifa::all();

        $tarifa_id = $tarifas->random()->id;

        /**
         *  fecha_inicio
         */
        $fecha_inicio = fake()->dateTimeBetween('-20 days, -1 days')->format('Y-m-d');

        /**
         *  fecha_fin
         */
        $duracion = Tarifa::where('id', $tarifa_id)->first()->duracion;

        $fechaInicioCarbon = Carbon::parse($fecha_inicio);
        $fecha_fin = $fechaInicioCarbon->addDays($duracion);

        /**
         *  return
         */
        return [
            'tarifa_id' => $tarifa_id,
            'fecha_inicio' => $fecha_inicio,
            'fecha_fin' => $fecha_fin,
        ];
    }
}
