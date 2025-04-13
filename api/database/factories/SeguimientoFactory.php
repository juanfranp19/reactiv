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
        $fecha1 = fake()->dateTimeBetween('-7 days', '-6 days')->format('Y-m-d');

        $fecha2 = fake()->dateTimeBetween('-5 days', '-4 days')->format('Y-m-d');

        $fecha3 = fake()->dateTimeBetween('-3 days', '-2 days')->format('Y-m-d');

        $fecha4 = fake()->dateTimeBetween('-1 days', 'now')->format('Y-m-d');

        return [
            'fecha1' => $fecha1,
            'fecha2' => $fecha2,
            'fecha3' => $fecha3,
            'fecha4' => $fecha4,
        ];
    }
}
