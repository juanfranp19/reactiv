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
        Socio::query()->delete();

        $users = User::whereNotIn('id', Socio::pluck('user_id'))->get();

        $numSocios = env('FACTORY_SOCIOS_NUM', 100);
        for ($i = 0; $i < $numSocios; $i++) {

            Socio::factory()->create([
                'provincia' => 'Murcia',
                'ciudad' => self::$ciudadesMurcia_array[rand(0, count(self::$ciudadesMurcia_array) - 1)],
                'user_id' => $users[$i]->id,
            ]);

        }
    }

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
