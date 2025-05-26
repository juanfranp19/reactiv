<?php

namespace Database\Seeders;

use App\Models\GrupoMuscular;
use Illuminate\Database\Seeder;

class GrupoMuscularSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GrupoMuscular::query()->delete();

        foreach (self::$gruposMusculares_array as $grupo) {
            $gm = new GrupoMuscular();
            $gm->nombre = $grupo['nombre'];
            $gm->save();
        }

    }

    private static $gruposMusculares_array = [
        [
            'nombre' => 'Pectoral',
        ],
        [
            'nombre' => 'Dorsal',
        ],
        [
            'nombre' => 'Hombro',
        ],
        [
            'nombre' => 'Bíceps',
        ],
        [
            'nombre' => 'Trapecio',
        ],
        [
            'nombre' => 'Tríceps',
        ],
        [
            'nombre' => 'Piernas',
        ],
        [
            'nombre' => 'Gemelos',
        ],
        [
            'nombre' => 'Abdominales',
        ],
        [
            'nombre' => 'Lumbares',
        ],
        [
            'nombre' => 'Oblicuos',
        ],
    ];
}
