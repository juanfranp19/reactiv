<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TaquillaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fecha_fianza = fake()->dateTimeBetween('-60 days', '-1 days')->format('Y-m-d');

        return [
            'fecha_fianza' => $fecha_fianza,
        ];
    }
}
