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
            if (rand(1, 2) == 1) {

                $fecha_compra = ProductoSocio::factory()->make()->fecha_compra;

                $pro_soc = new ProductoSocio();
                $pro_soc->socio_id = $socio->id;
                $pro_soc->producto_id = $productos->random()->id;
                $pro_soc->fecha_compra = $fecha_compra;
                $pro_soc->cantidad = rand(1, 10);
                $pro_soc->save();

            }
        }
    }
}
