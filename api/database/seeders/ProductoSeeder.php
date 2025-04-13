<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Producto::query()->delete();

        foreach (self::$producto_array as $producto) {
            $pro = new Producto();
            $pro->nombre = $producto['nombre'];
            $pro->descripcion = $producto['descripcion'];
            $pro->precio = $producto['precio'];
            $pro->save();
        }
    }

    private static $producto_array = [
        ['nombre' => 'Proteína Whey Chocolate 2kg', 'descripcion' => 'Proteína de suero sabor chocolate para crecimiento muscular.', 'precio' => 39.99],
        ['nombre' => 'Creatina Monohidratada 300g', 'descripcion' => 'Creatina pura para aumentar fuerza y volumen.', 'precio' => 24.50],
        ['nombre' => 'Pre-Entreno Explosive Power', 'descripcion' => 'Pre-entreno con cafeína y beta-alanina para energía máxima.', 'precio' => 29.95],
        ['nombre' => 'BCAA 2:1:1 Sabor Sandía', 'descripcion' => 'Aminoácidos esenciales para recuperación y anticatabolismo.', 'precio' => 21.99],
        ['nombre' => 'Glutamina Micronizada 500g', 'descripcion' => 'Apoya la recuperación muscular y el sistema inmune.', 'precio' => 18.75],
        ['nombre' => 'Proteína Vegana Vainilla 1kg', 'descripcion' => 'Proteína vegetal sin lactosa ni gluten.', 'precio' => 27.90],
        ['nombre' => 'Multivitamínico Deportivo', 'descripcion' => 'Vitaminas y minerales para deportistas intensos.', 'precio' => 14.99],
        ['nombre' => 'Proteína Whey Fresa 1kg', 'descripcion' => 'Suplemento de proteína sabor fresa, ideal post-entreno.', 'precio' => 22.90],
        ['nombre' => 'Omega 3 Ultra Concentrado', 'descripcion' => 'Ácidos grasos esenciales para salud cardiovascular.', 'precio' => 17.45],
        ['nombre' => 'Colágeno Hidrolizado con Magnesio', 'descripcion' => 'Apoya articulaciones, piel y tendones.', 'precio' => 19.50],
        ['nombre' => 'Proteína Isolate Neutra 1kg', 'descripcion' => 'Aislado de suero puro, sin sabor, rápida absorción.', 'precio' => 31.20],
        ['nombre' => 'Caseína Micelar 1kg', 'descripcion' => 'Proteína de liberación lenta ideal para la noche.', 'precio' => 28.30],
        ['nombre' => 'Termogénico Hardcore', 'descripcion' => 'Suplemento para quema de grasa y energía extrema.', 'precio' => 26.99],
        ['nombre' => 'ZMA (Zinc, Magnesio, B6)', 'descripcion' => 'Apoya la recuperación muscular y la testosterona.', 'precio' => 15.75],
        ['nombre' => 'Proteína Whey Cookies & Cream', 'descripcion' => 'Delicioso sabor galleta, ideal para post-entreno.', 'precio' => 34.80],
        ['nombre' => 'Carbohidratos Rápidos 2kg', 'descripcion' => 'Gainer para volumen con maltodextrina y dextrosa.', 'precio' => 23.99],
        ['nombre' => 'Isotónico en Polvo Cítrico 1kg', 'descripcion' => 'Hidratación rápida con electrolitos.', 'precio' => 13.50],
        ['nombre' => 'Vitamina C 1000mg', 'descripcion' => 'Antioxidante fuerte para reforzar el sistema inmune.', 'precio' => 9.99],
        ['nombre' => 'Proteína Hidrolizada 1kg', 'descripcion' => 'Rápida absorción, ideal para después del ejercicio.', 'precio' => 36.50],
        ['nombre' => 'Barritas Proteicas (Caja x12)', 'descripcion' => 'Snack alto en proteína para después de entrenar.', 'precio' => 20.99],
        ['nombre' => 'BCAA 4:1:1 en Polvo', 'descripcion' => 'Proporción avanzada para crecimiento muscular.', 'precio' => 25.00],
        ['nombre' => 'Pre-Entreno Sin Estimulantes', 'descripcion' => 'Fórmula sin cafeína para entrenamiento nocturno.', 'precio' => 27.30],
        ['nombre' => 'L-Carnitina Líquida 500ml', 'descripcion' => 'Ayuda a la quema de grasa como fuente de energía.', 'precio' => 16.60],
        ['nombre' => 'Ácido Hialurónico Deportivo', 'descripcion' => 'Apoya articulaciones y piel saludable.', 'precio' => 18.99],
        ['nombre' => 'Gainer Hipercalórico 3kg', 'descripcion' => 'Para aumento de masa y fuerza.', 'precio' => 34.99],
        ['nombre' => 'Magnesio Citrato 200g', 'descripcion' => 'Mejora el sueño y reduce calambres musculares.', 'precio' => 12.80],
        ['nombre' => 'Cafeína Anhidra 200mg', 'descripcion' => 'Energía mental y física rápida.', 'precio' => 10.50],
        ['nombre' => 'Beta-Alanina en Polvo 250g', 'descripcion' => 'Reduce fatiga muscular, ideal para entrenamientos intensos.', 'precio' => 19.99],
        ['nombre' => 'Ashwagandha 500mg', 'descripcion' => 'Adaptógeno natural para reducir el estrés.', 'precio' => 14.75],
        ['nombre' => 'Proteína Vegana Chocolate 1kg', 'descripcion' => 'Sin lácteos, ideal para veganos.', 'precio' => 28.20],
        ['nombre' => 'Reforzador de Testosterona Natural', 'descripcion' => 'Aumenta la vitalidad y fuerza.', 'precio' => 22.45],
        ['nombre' => 'Vitamina D3 5000IU', 'descripcion' => 'Apoya el sistema inmune y salud ósea.', 'precio' => 11.99],
        ['nombre' => 'Minerales Quelados Complejos', 'descripcion' => 'Complejo de minerales de alta absorción.', 'precio' => 16.99],
        ['nombre' => 'Batido Recuperador Post-Entreno', 'descripcion' => 'Carbohidratos + proteínas + BCAA.', 'precio' => 30.40],
        ['nombre' => 'Proteína de Huevo en Polvo', 'descripcion' => 'Alta biodisponibilidad, sin lactosa.', 'precio' => 29.75],
        ['nombre' => 'Dextrosa en Polvo 1kg', 'descripcion' => 'Fuente rápida de energía post entrenamiento.', 'precio' => 8.99],
        ['nombre' => 'Harina de Avena Instantánea 2kg', 'descripcion' => 'Ideal para batidos y desayunos fitness.', 'precio' => 12.99],
        ['nombre' => 'L-Arginina 500mg Cápsulas', 'descripcion' => 'Mejora la circulación y el bombeo muscular.', 'precio' => 15.49],
        ['nombre' => 'Electrolitos en Polvo', 'descripcion' => 'Previene calambres y deshidratación.', 'precio' => 13.90],
        ['nombre' => 'Proteína Clear Whey Sabor Limón', 'descripcion' => 'Proteína ligera, tipo bebida refrescante.', 'precio' => 32.20],
        ['nombre' => 'Intra-Workout Sabor Frutas', 'descripcion' => 'Mantiene el rendimiento durante el entrenamiento.', 'precio' => 19.99],
        ['nombre' => 'HMB 1000mg', 'descripcion' => 'Previene el catabolismo y mejora la fuerza.', 'precio' => 26.00],
        ['nombre' => 'Pre-Entreno Nitro Boost', 'descripcion' => 'Fórmula intensa con arginina y cafeína.', 'precio' => 31.50],
        ['nombre' => 'Super Greens en Polvo', 'descripcion' => 'Mezcla de vegetales verdes para vitalidad.', 'precio' => 22.99],
        ['nombre' => 'Proteína de Arroz Integral', 'descripcion' => 'Fuente vegetal hipoalergénica.', 'precio' => 25.60],
        ['nombre' => 'CLA (Ácido Linoleico Conjugado)', 'descripcion' => 'Ayuda a controlar el peso y definir.', 'precio' => 18.90],
        ['nombre' => 'Mezcla Detox en Polvo', 'descripcion' => 'Limpieza natural del organismo.', 'precio' => 17.50],
        ['nombre' => 'Bebida Recuperadora Instantánea', 'descripcion' => 'Fórmula completa post-entreno.', 'precio' => 28.70],
        ['nombre' => 'L-Tirosina 500mg', 'descripcion' => 'Mejora el enfoque y combate la fatiga.', 'precio' => 14.99],
        ['nombre' => 'Caseína Sabor Vainilla 900g', 'descripcion' => 'Proteína de digestión lenta, ideal para consumir antes de dormir.', 'precio' => 26.90],
        ['nombre' => 'Proteína Clear Mango 1kg', 'descripcion' => 'Proteína aislada con textura ligera y sabor a mango.', 'precio' => 33.50],
        ['nombre' => 'Galletas Proteicas (Caja x6)', 'descripcion' => 'Galletas blandas con alto contenido en proteínas.', 'precio' => 15.99],
        ['nombre' => 'Colágeno con Ácido Hialurónico', 'descripcion' => 'Fórmula para articulaciones, piel y uñas saludables.', 'precio' => 19.80],
        ['nombre' => 'EAA (Aminoácidos Esenciales)', 'descripcion' => 'Aminoácidos completos para apoyar el desarrollo muscular.', 'precio' => 23.45],
        ['nombre' => 'Proteína de Guisante 1kg', 'descripcion' => 'Alternativa vegana rica en proteínas y sin alérgenos.', 'precio' => 24.60],
        ['nombre' => 'Gel Energético Sabor Cola', 'descripcion' => 'Aporte rápido de energía para entrenamientos intensos.', 'precio' => 2.99],
        ['nombre' => 'Shaker Mezclador 600ml', 'descripcion' => 'Vaso mezclador con rejilla para batidos sin grumos.', 'precio' => 6.50],
        ['nombre' => 'Rehidratante en Polvo Sabor Limón', 'descripcion' => 'Recuperación de electrolitos post entrenamiento.', 'precio' => 12.70],
        ['nombre' => 'Batido Sustitutivo de Comida', 'descripcion' => 'Fórmula equilibrada para reemplazo ocasional de comidas.', 'precio' => 27.30],
    ];
}
