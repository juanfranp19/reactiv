<?php

namespace Database\Seeders;

use App\Models\Producto;
use App\Models\ProductoSocio;
use App\Models\Socio;
use Illuminate\Database\Seeder;

class ProductoSocioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductoSocio::query()->delete();

        $socios = Socio::all();
        $productos = Producto::all();

        foreach ($socios as $socio) {
            if (rand(1, 3) != 1) {

                $numProductos = rand(1, 5);

                for ($i = 0; $i < $numProductos; $i++) {
                    // genera una fecha de compra
                    $fecha_compra = ProductoSocio::factory()->make()->fecha_compra;

                    // coge un producto random de la tabla productos
                    $producto = $productos->random();

                    $socio->productos()->attach($producto->id, [
                        'fecha_compra' => $fecha_compra,
                        'cantidad' => rand(1, 10),
                    ]);
                }

            }
        }
    }
}
