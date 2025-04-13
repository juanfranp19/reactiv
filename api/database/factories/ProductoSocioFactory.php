<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductoSocio>
 */
class ProductoSocioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fecha_compra = fake()->dateTimeBetween('-14 days', '-3 days');

        return [
            'fecha_compra' => $fecha_compra,
        ];
    }
}
