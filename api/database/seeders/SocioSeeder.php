<?php

namespace Database\Seeders;

use App\Models\Socio;
use App\Models\User;
use Illuminate\Database\Seeder;

class SocioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // borra todos los datos
        Socio::query()->delete();

        // obtiene los usuarios que no tienen asignado socio
        $users = User::whereNotIn('id', Socio::pluck('user_id'))->get();

        $numSocios = env('FACTORY_SOCIOS_NUM', 100);

        for ($i = 0; $i < $numSocios; $i++) {

            // se inicializa la variable
            $imagen = null;

            // si el ínidice del for está dentro de los índices del array
            if ($i < count(self::$imagenes_array)) {

                // coge una imagen con el mismo índice que el for, así, el socio 1 tendrá user1.webp
                $imagen = self::$imagenes_array[$i];
            }

            Socio::factory()->create([
                'provincia' => 'Murcia',
                'ciudad' => self::$ciudadesMurcia_array[rand(0, count(self::$ciudadesMurcia_array) - 1)],
                'user_id' => $users[$i]->id,
                'imagen' => $imagen,
            ]);

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

    private static $ciudadesMurcia_array = [
        'Abanilla',
        'Abarán',
        'Águilas',
        'Albudeite',
        'Alcantarilla',
        'Los Alcázares',
        'Aledo',
        'Alguazas',
        'Alhama de Murcia',
        'Archena',
        'Beniel',
        'Blanca',
        'Bullas',
        'Calasparra',
        'Campos del Río',
        'Caravaca de la Cruz',
        'Cartagena',
        'Cehegín',
        'Ceutí',
        'Cieza',
        'Fortuna',
        'Fuente Álamo de Murcia',
        'Jumilla',
        'Librilla',
        'Lorca',
        'Lorquí',
        'Mazarrón',
        'Molina de Segura',
        'Moratalla',
        'Mula',
        'Murcia',
        'Ojós',
        'Pliego',
        'Puerto Lumbreras',
        'Ricote',
        'San Javier',
        'San Pedro del Pinatar',
        'Santomera',
        'Torre-Pacheco',
        'Las Torres de Cotillas',
        'Totana',
        'Ulea',
        'La Unión',
        'Villanueva del Río Segura',
        'Yecla',
    ];
}
