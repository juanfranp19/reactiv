<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()->delete();

        $numUsers = env('FACTORY_SOCIOS_NUM', 100) + env('FACTORY_ENTRENADORES_NUM', 3);

        User::factory($numUsers)->create();
    }
}
