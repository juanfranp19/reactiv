<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seguimiento>
 */
class SeguimientoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // crea fecha entre los días indicados con respecto hoy

        $fecha1 = fake()->dateTimeBetween('-30 days', '-25 days')->format('Y-m-d');

        $fecha2 = fake()->dateTimeBetween('-25 days', '-20 days')->format('Y-m-d');

        $fecha3 = fake()->dateTimeBetween('-20 days', '-15 days')->format('Y-m-d');

        $fecha4 = fake()->dateTimeBetween('-15 days', '-10 days')->format('Y-m-d');

        $fecha5 = fake()->dateTimeBetween('-10 days', '-5 days')->format('Y-m-d');

        $fecha6 = fake()->dateTimeBetween('-5 days', '-1 days')->format('Y-m-d');

        return [
            'fecha1' => $fecha1,
            'fecha2' => $fecha2,
            'fecha3' => $fecha3,
            'fecha4' => $fecha4,
            'fecha5' => $fecha5,
            'fecha6' => $fecha6,
        ];
    }
}
