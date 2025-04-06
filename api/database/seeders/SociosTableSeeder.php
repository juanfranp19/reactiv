<?php

namespace Database\Seeders;

use App\Models\Socio;
use App\Models\User;
use Illuminate\Database\Seeder;

class SociosTableSeeder extends Seeder
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
                'user_id' => $users[$i]->id,
            ]);

        }
    }
}
