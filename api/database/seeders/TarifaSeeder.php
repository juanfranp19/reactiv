<?php

namespace Database\Seeders;

use App\Models\Tarifa;
use Illuminate\Database\Seeder;

class TarifaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tarifa::query()->delete();

        foreach (self::$tarifa_array as $tarifa) {
            $tar = new Tarifa();
            $tar->nombre = $tarifa['nombre'];
            $tar->descripcion = $tarifa['descripcion'];
            $tar->duracion = $tarifa['duracion'];
            $tar->precio = $tarifa['precio'];
            $tar->save();
        }
    }

    private static $tarifa_array = [
        [
            'nombre' => 'Mensual',
            'descripcion' => 'Acceso ilimitado durante 30 días a todas las instalaciones.',
            'duracion' => 30,
            'precio' => 39.99,
        ],
        [
            'nombre' => 'Trimestral',
            'descripcion' => 'Acceso completo por 90 días, ideal para compromisos a corto plazo.',
            'duracion' => 90,
            'precio' => 109.99,
        ],
        [
            'nombre' => 'Semestral',
            'descripcion' => '6 meses de entrenamiento con acceso libre a todas las áreas.',
            'duracion' => 180,
            'precio' => 199.99,
        ],
        [
            'nombre' => 'Anual',
            'descripcion' => 'Plan económico con 1 año de acceso sin restricciones.',
            'duracion' => 365,
            'precio' => 349.99,
        ],
        [
            'nombre' => 'Día Suelto',
            'descripcion' => 'Acceso por un solo día, sin compromiso de permanencia.',
            'duracion' => 1,
            'precio' => 5.00,
        ],
        [
            'nombre' => 'Semanal',
            'descripcion' => 'Acceso libre durante 7 días, ideal para visitantes ocasionales.',
            'duracion' => 7,
            'precio' => 14.99,
        ],
        [
            'nombre' => 'Mensual con Entrenador',
            'descripcion' => 'Incluye acceso completo y 4 sesiones con entrenador personal al mes.',
            'duracion' => 30,
            'precio' => 74.99,
        ],
        [
            'nombre' => 'Plan Pareja Mensual',
            'descripcion' => 'Tarifa especial para dos personas durante un mes.',
            'duracion' => 30,
            'precio' => 69.99,
        ],
        [
            'nombre' => 'Plan Estudiante',
            'descripcion' => 'Descuento especial para estudiantes con acreditación válida.',
            'duracion' => 30,
            'precio' => 29.99,
        ],
        [
            'nombre' => 'Plan Senior',
            'descripcion' => 'Tarifa reducida para personas mayores de 60 años.',
            'duracion' => 30,
            'precio' => 27.50,
        ],
    ];
}
