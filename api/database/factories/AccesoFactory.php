<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Acceso>
 */
class AccesoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        /**
         *  hora_entrada
         */
        $hora_entrada = fake()->dateTimeBetween('-30 days', '-1 days');

        /**
         *  hora_salida
         */
        $tiempoEstancia = rand(100, 300) / 100; // para que sea decimal

        $horaEntradaCarbon = Carbon::parse($hora_entrada);

        $hora_salida = $horaEntradaCarbon->addHours($tiempoEstancia);

        /**
         *  return
         */
        return [
            'hora_entrada' => $hora_entrada,
            'hora_salida' => $hora_salida,
        ];
    }
}
