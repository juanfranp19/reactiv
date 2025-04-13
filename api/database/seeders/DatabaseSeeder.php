<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(SocioSeeder::class);
        $this->call(EntrenadorSeeder::class);
        $this->call(GrupoMuscularSeeder::class);
        $this->call(EjercicioSeeder::class);
        $this->call(RutinaSeeder::class);
        $this->call(SeguimientoSeeder::class);
        $this->call(EjercicioRutinaSeeder::class);
        $this->call(EjercicioSeguimientoSeeder::class);
        $this->call(TaquillaSeeder::class);
        $this->call(ProductoSeeder::class);
    }
}
