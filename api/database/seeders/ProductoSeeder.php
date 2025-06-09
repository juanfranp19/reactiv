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
        // elimina los datos de la tabla
        Producto::query()->delete();

        // llena la tabla con los datos del array
        foreach (self::$producto_array as $producto) {
            $pro = new Producto();
            $pro->nombre = $producto['nombre'];
            $pro->descripcion = $producto['descripcion'];
            $pro->precio = $producto['precio'];
            $pro->imagen = $producto['imagen'];
            $pro->save();
        }
    }

    private static $producto_array = [
        [
            'nombre' => 'Proteína Whey Chocolate 2kg',
            'descripcion' => 'Proteína de suero sabor chocolate para crecimiento muscular.',
            'precio' => 39.99,
            'imagen' => 'proteina-whey-chocolate-2kg.webp',
        ],
        [
            'nombre' => 'Creatina Monohidratada 300g',
            'descripcion' => 'Creatina pura para aumentar fuerza y volumen.',
            'precio' => 24.50,
            'imagen' => 'creatina-monohidratada-300g.webp',
        ],
        [
            'nombre' => 'Pre-Entreno Explosive Power',
            'descripcion' => 'Pre-entreno con cafeína y beta-alanina para energía máxima.',
            'precio' => 29.95,
            'imagen' => 'pre-entreno explosive-power.webp',
        ],
        [
            'nombre' => 'BCAA 2:1:1 Sabor Sandía',
            'descripcion' => 'Aminoácidos esenciales para recuperación y anticatabolismo.',
            'precio' => 21.99,
            'imagen' => 'bcaa-2-1-1-sabor-sandia.webp',
        ],
        [
            'nombre' => 'Glutamina Micronizada 500g',
            'descripcion' => 'Apoya la recuperación muscular y el sistema inmune.',
            'precio' => 18.75,
            'imagen' => 'glutamina-micronizada-500g.webp',
        ],
        [
            'nombre' => 'Proteína Vegana Vainilla 1kg',
            'descripcion' => 'Proteína vegetal sin lactosa ni gluten.',
            'precio' => 27.90,
            'imagen' => 'proteina-vegana-vainilla-1kg.webp',
        ],
        [
            'nombre' => 'Multivitamínico Deportivo',
            'descripcion' => 'Vitaminas y minerales para deportistas intensos.',
            'precio' => 14.99,
            'imagen' => 'multivitaminico-deportivo.webp',
        ],
        [
            'nombre' => 'Proteína Whey Fresa 1kg',
            'descripcion' => 'Suplemento de proteína sabor fresa, ideal post-entreno.',
            'precio' => 22.90,
            'imagen' => 'proteina-whey-fresa-1kg.webp',
        ],
        [
            'nombre' => 'Omega 3 Ultra Concentrado',
            'descripcion' => 'Ácidos grasos esenciales para salud cardiovascular.',
            'precio' => 17.45,
            'imagen' => 'omega-3-ultra-concentrado.webp',
        ],
        [
            'nombre' => 'Colágeno Hidrolizado con Magnesio',
            'descripcion' => 'Apoya articulaciones, piel y tendones.',
            'precio' => 19.50,
            'imagen' => 'colageno-hidrolizado-con-magnesio.webp',
        ],
        [
            'nombre' => 'Proteína Isolate Neutra 1kg',
            'descripcion' => 'Aislado de suero puro, sin sabor, rápida absorción.',
            'precio' => 31.20,
            'imagen' => 'proteina-isolate-neutra-1kg.webp',
        ],
        [
            'nombre' => 'Caseína Micelar 1kg',
            'descripcion' => 'Proteína de liberación lenta ideal para la noche.',
            'precio' => 28.30,
            'imagen' => 'caseina-micelar-1kg.webp',
        ],
        [
            'nombre' => 'Termogénico Hardcore',
            'descripcion' => 'Suplemento para quema de grasa y energía extrema.',
            'precio' => 26.99,
            'imagen' => 'termogenico-hardcore.webp',
        ],
        [
            'nombre' => 'ZMA (Zinc, Magnesio, B6)',
            'descripcion' => 'Apoya la recuperación muscular y la testosterona.',
            'precio' => 15.75,
            'imagen' => 'zma-zinc-magnesio-b6.webp',
        ],
        [
            'nombre' => 'Proteína Whey Cookies & Cream',
            'descripcion' => 'Delicioso sabor galleta, ideal para post-entreno.',
            'precio' => 34.80,
            'imagen' => 'proteina-whey-cookies-y-cream.webp',
        ],
        [
            'nombre' => 'Carbohidratos Rápidos 2kg',
            'descripcion' => 'Gainer para volumen con maltodextrina y dextrosa.',
            'precio' => 23.99,
            'imagen' => 'carbohidratos-rapidos-2kg.webp',
        ],
        [
            'nombre' => 'Isotónico en Polvo Cítrico 1kg',
            'descripcion' => 'Hidratación rápida con electrolitos.',
            'precio' => 13.50,
            'imagen' => 'isotonico-en-polvo-citrico-1kg.webp',
        ],
        [
            'nombre' => 'Vitamina C 1000mg',
            'descripcion' => 'Antioxidante fuerte para reforzar el sistema inmune.',
            'precio' => 9.99,
            'imagen' => 'vitamina-c-1000mg.webp',
        ],
        [
            'nombre' => 'Proteína Hidrolizada 1kg',
            'descripcion' => 'Rápida absorción, ideal para después del ejercicio.',
            'precio' => 36.50,
            'imagen' => 'proteina-hidrolizada-1kg.webp',
        ],
        [
            'nombre' => 'Barritas Proteicas (Caja x12)',
            'descripcion' => 'Snack alto en proteína para después de entrenar.',
            'precio' => 20.99,
            'imagen' => 'barritas-proteicas-x12.webp',
        ],
        [
            'nombre' => 'BCAA 4:1:1 en Polvo',
            'descripcion' => 'Proporción avanzada para crecimiento muscular.',
            'precio' => 25.00,
            'imagen' => 'bcaa-4-1-1-en-polvo.webp',
        ],
        [
            'nombre' => 'Pre-Entreno Sin Estimulantes',
            'descripcion' => 'Fórmula sin cafeína para entrenamiento nocturno.',
            'precio' => 27.30,
            'imagen' => 'pre-entreno-sin-estimulantes.webp',
        ],
        [
            'nombre' => 'L-Carnitina Líquida 500ml',
            'descripcion' => 'Ayuda a la quema de grasa como fuente de energía.',
            'precio' => 16.60,
            'imagen' => 'l-carnitina-liquida-500ml.webp',
        ],
        [
            'nombre' => 'Ácido Hialurónico Deportivo',
            'descripcion' => 'Apoya articulaciones y piel saludable.',
            'precio' => 18.99,
            'imagen' => 'acido-hialuronico-deportivo.webp',
        ],
        [
            'nombre' => 'Gainer Hipercalórico 3kg',
            'descripcion' => 'Para aumento de masa y fuerza.',
            'precio' => 34.99,
            'imagen' => 'gainer-hipercalorico-3kg.webp',
        ],
        [
            'nombre' => 'Magnesio Citrato 200g',
            'descripcion' => 'Mejora el sueño y reduce calambres musculares.',
            'precio' => 12.80,
            'imagen' => 'magnesio-citrato-200g.webp',
        ],
        [
            'nombre' => 'Cafeína Anhidra 200mg',
            'descripcion' => 'Energía mental y física rápida.',
            'precio' => 10.50,
            'imagen' => 'cafeina-anhidra-200mg.webp',
        ],
        [
            'nombre' => 'Beta-Alanina en Polvo 250g',
            'descripcion' => 'Reduce fatiga muscular, ideal para entrenamientos intensos.',
            'precio' => 19.99,
            'imagen' => 'beta-alanina-en-polvo-250g.webp',
        ],
        [
            'nombre' => 'Ashwagandha 500mg',
            'descripcion' => 'Adaptógeno natural para reducir el estrés.',
            'precio' => 14.75,
            'imagen' => 'ashwagandha-500mg.webp',
        ],
        [
            'nombre' => 'Proteína Vegana Chocolate 1kg',
            'descripcion' => 'Sin lácteos, ideal para veganos.',
            'precio' => 28.20,
            'imagen' => 'proteina-vegana-chocolate-1kg.webp',
        ],
        [
            'nombre' => 'Reforzador de Testosterona Natural',
            'descripcion' => 'Aumenta la vitalidad y fuerza.',
            'precio' => 22.45,
            'imagen' => 'reforzador-de-testosterona-natural.webp',
        ],
        [
            'nombre' => 'Vitamina D3 5000IU',
            'descripcion' => 'Apoya el sistema inmune y salud ósea.',
            'precio' => 11.99,
            'imagen' => 'vitamina-d3-5000iu.webp',
        ],
        [
            'nombre' => 'Minerales Quelados Complejos',
            'descripcion' => 'Complejo de minerales de alta absorción.',
            'precio' => 16.99,
            'imagen' => 'minerales-quelados-complejos.webp',
        ],
        [
            'nombre' => 'Batido Recuperador Post-Entreno',
            'descripcion' => 'Carbohidratos + proteínas + BCAA.',
            'precio' => 30.40,
            'imagen' => 'batido-recuperador-post-entreno.webp',
        ],
        [
            'nombre' => 'Proteína de Huevo en Polvo',
            'descripcion' => 'Alta biodisponibilidad, sin lactosa.',
            'precio' => 29.75,
            'imagen' => 'proteina-de-huevo-en-polvo.webp',
        ],
        [
            'nombre' => 'Dextrosa en Polvo 1kg',
            'descripcion' => 'Fuente rápida de energía post entrenamiento.',
            'precio' => 8.99,
            'imagen' => 'dextrosa-en-polvo-1kg.webp',
        ],
        [
            'nombre' => 'Harina de Avena Instantánea 1.5kg',
            'descripcion' => 'Ideal para batidos y desayunos fitness.',
            'precio' => 12.99,
            'imagen' => 'harina-de-avena-instantanea-1-5kg.webp',
        ],
        [
            'nombre' => 'L-Arginina 500mg Cápsulas',
            'descripcion' => 'Mejora la circulación y el bombeo muscular.',
            'precio' => 15.49,
            'imagen' => 'l-arginina-500mg-capsulas.webp',
        ],
        [
            'nombre' => 'Electrolitos en Polvo',
            'descripcion' => 'Previene calambres y deshidratación.',
            'precio' => 13.90,
            'imagen' => 'electrolitos-en-polvo.webp',
        ],
        [
            'nombre' => 'Proteína Clear Whey Sabor Limón',
            'descripcion' => 'Proteína ligera, tipo bebida refrescante.',
            'precio' => 32.20,
            'imagen' => 'proteina-clear-whey-sabor-limon.webp',
        ],
        [
            'nombre' => 'Intra-Workout Sabor Frutas',
            'descripcion' => 'Mantiene el rendimiento durante el entrenamiento.',
            'precio' => 19.99,
            'imagen' => 'intra-workout-sabor-frutas.webp',
        ],
        [
            'nombre' => 'HMB 1000mg',
            'descripcion' => 'Previene el catabolismo y mejora la fuerza.',
            'precio' => 26.00,
            'imagen' => 'hmb-1000mg.webp',
        ],
        [
            'nombre' => 'Pre-Entreno Nitro Boost',
            'descripcion' => 'Fórmula intensa con arginina y cafeína.',
            'precio' => 31.50,
            'imagen' => 'pre-entreno-nitro-boost.webp',
        ],
        [
            'nombre' => 'Super Greens en Polvo',
            'descripcion' => 'Mezcla de vegetales verdes para vitalidad.',
            'precio' => 22.99,
            'imagen' => 'super-greens-en-polvo.webp',
        ],
        [
            'nombre' => 'Proteína de Arroz Integral',
            'descripcion' => 'Fuente vegetal hipoalergénica.',
            'precio' => 25.60,
            'imagen' => 'proteina-de-arroz-integral.webp',
        ],
        [
            'nombre' => 'CLA (Ácido Linoleico Conjugado)',
            'descripcion' => 'Ayuda a controlar el peso y definir.',
            'precio' => 18.90,
            'imagen' => 'cla-acido-linoleico-conjugado.webp',
        ],
        [
            'nombre' => 'Mezcla Detox en Polvo',
            'descripcion' => 'Limpieza natural del organismo.',
            'precio' => 17.50,
            'imagen' => 'mezcla-detox-en-polvo.webp',
        ],
        [
            'nombre' => 'Bebida Recuperadora Instantánea',
            'descripcion' => 'Fórmula completa post-entreno.',
            'precio' => 28.70,
            'imagen' => 'bebida-recuperadora-instantanea.webp',
        ],
        [
            'nombre' => 'L-Tirosina 500mg',
            'descripcion' => 'Mejora el enfoque y combate la fatiga.',
            'precio' => 14.99,
            'imagen' => 'l-tirosina-500mg.webp',
        ],
        [
            'nombre' => 'Caseína Sabor Vainilla 900g',
            'descripcion' => 'Proteína de digestión lenta, ideal para consumir antes de dormir.',
            'precio' => 26.90,
            'imagen' => 'caseina-sabor-vainilla-900g.webp',
        ],
        [
            'nombre' => 'Galletas Proteicas (Caja x8)',
            'descripcion' => 'Galletas blandas con alto contenido en proteínas.',
            'precio' => 15.99,
            'imagen' => 'galletas-proteicas-x8.webp',
        ],

        [
            'nombre' => 'EAA (Aminoácidos Esenciales)',
            'descripcion' => 'Aminoácidos completos para apoyar el desarrollo muscular.',
            'precio' => 23.45,
            'imagen' => 'eaa-aminoacidos-esenciales.webp',
        ],
        [
            'nombre' => 'Proteína vegama 1kg',
            'descripcion' => 'Alternativa vegana rica en proteínas y sin alérgenos.',
            'precio' => 24.60,
            'imagen' => 'proteina-vegana-1kg.webp',
        ],
        [
            'nombre' => 'Gel Energético Sabor Cola',
            'descripcion' => 'Aporte rápido de energía para entrenamientos intensos.',
            'precio' => 2.99,
            'imagen' => 'gel-energetico-sabor-cola.webp',
        ],
        [
            'nombre' => 'Shaker Mezclador 600ml',
            'descripcion' => 'Vaso mezclador con rejilla para batidos sin grumos.',
            'precio' => 6.50,
            'imagen' => 'shaker-mezclador-600ml.webp',
        ],
        [
            'nombre' => 'Hidratante en Polvo Sabor Limón',
            'descripcion' => 'Recuperación de electrolitos post entrenamiento.',
            'precio' => 12.70,
            'imagen' => 'hidratante-en-polvo-sabor-limon.webp',
        ],
        [
            'nombre' => 'Batido Sustitutivo de Comida',
            'descripcion' => 'Fórmula equilibrada para reemplazo ocasional de comidas.',
            'precio' => 27.30,
            'imagen' => 'batido-sustitutivo-de-comida.webp',
        ],
    ];
}
