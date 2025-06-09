<?php

namespace Database\Seeders;

use App\Models\Entrenador;
use Illuminate\Database\Seeder;

class EntrenadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // borra todos los datos de la tabla
        Entrenador::query()->delete();

        $numEntrenadores = env('FACTORY_ENTRENADORES_NUM', 3);

        // de esta forma con el for porque sinó da error de clave única con los user_id
        for ($i = 0; $i < $numEntrenadores; $i++) {

            // se inicializa la variable
            $imagen = null;

            // si el ínidice del for está dentro de los índices del array
            if ($i < count(self::$imagenes_array)) {

                // coge una imagen con el mismo índice que el for, así, el entrenador 1 tendrá user1.webp
                $imagen = self::$imagenes_array[$i];
            }

            // el primer entrenador es admin
            if ($i === 0) {

                Entrenador::factory()->create([
                    'nombre' => 'admin',
                    'apellidos' => 'admin',
                    'email' => 'admin@reactiv.fit',
                    'telefono' => 999999999,
                    'admin' => 1,
                    'imagen' => $imagen,
                ]);

            } else {
                Entrenador::factory()->create([
                    'imagen' => $imagen,
                ]);
            }
        }
    }

    // lista de imágenes que hay en el storage
    private static $imagenes_array = [
        'user1.webp',
        'user2.webp',
        'user3.webp',
        'user4.webp',
        'user5.webp',
        'user6.webp',
        'user7.webp',
        'user8.webp',
        'user9.webp',
        'user10.webp',
        'user11.webp',
        'user12.webp',
        'user13.webp',
        'user14.webp',
        'user15.webp',
        'user16.webp',
    ];
}
