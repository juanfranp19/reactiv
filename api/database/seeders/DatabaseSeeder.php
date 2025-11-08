<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Entrenador;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(GrupoMuscularSeeder::class);
        $this->command->info('registros de tabla *grupos_musculares* cargados correctamentes');

        $this->call(EjercicioSeeder::class);
        $this->command->info('registros de tabla *ejercicios* cargados correctamentes');

        $this->call(CalentamientoSeeder::class);
        $this->command->info('registros de tabla *calentamientos* cargados correctamentes');

        $this->call(TarifaSeeder::class);
        $this->command->info('registros de tabla *tarifas* cargados correctamentes');

        if (env('APP_ENV') === 'local') {

            $this->call(UserSeeder::class);
            $this->command->info('registros de tabla *users* cargados correctamentes');

            $this->call(SocioSeeder::class);
            $this->command->info('registros de tabla *socios* cargados correctamentes');

            $this->call(EntrenadorSeeder::class);
            $this->command->info('registros de tabla *entrenadores* cargados correctamentes');

            $this->call(RutinaSeeder::class);
            $this->command->info('registros de tabla *rutinas* cargados correctamentes');

            $this->call(AccesoSeeder::class);
            $this->command->info('registros de tabla *accesos* cargados correctamentes');

            $this->call(SeguimientoSeeder::class);
            $this->command->info('registros de tabla *seguimientos* cargados correctamentes');

            $this->call(EjercicioRutinaSeeder::class);
            $this->command->info('registros de tabla *ejercicios_rutinas* cargados correctamentes');

            $this->call(EjercicioSeguimientoSeeder::class);
            $this->command->info('registros de tabla *ejercicios_seguimientos* cargados correctamentes');

            $this->call(TaquillaSeeder::class);
            $this->command->info('registros de tabla *taquillas* cargados correctamentes');

            $this->call(ProductoSeeder::class);
            $this->command->info('registros de tabla *productos* cargados correctamentes');

            $this->call(ProductoSocioSeeder::class);
            $this->command->info('registros de tabla *productos_socios* cargados correctamentes');

            $this->call(SocioTarifaSeeder::class);
            $this->command->info('registros de tabla *socios_tarifas* cargados correctamentes');

            $this->call(CalentamientoRutinaSeeder::class);
            $this->command->info('registros de tabla *calentamientos_rutinas* cargados correctamentes');

            $this->call(CalentamientoSeguimientoSeeder::class);
            $this->command->info('registros de tabla *calentamientos_seguimientos* cargados correctamentes');
        }

        //llena un entrenador y su usuario
        if (env('APP_ENV') === 'production') {

            User::query()->delete();

            $user = new User();
            $user->name = env('ADMIN_USERNAME');
            $user->password = env('ADMIN_PASSWORD');

            Entrenador::query()->delete();

            $en = new Entrenador();
            $en->nombre = 'admin';
            $en->apellidos = 'admin';
            $en->email = 'admin@reactiv.fit';
            $en->telefono = 999999999;
            $en->admin = 1;
            $en->imagen = null;
            $en->user_id = 1;
            $en->save();

            $this->command->info('registros de *admin* cargados correctamente');
        }

        // $this->command->info('*****************************************');
        // $this->command->info('TODOS LOS SEEDERS CARGADOS CORRECTAMENTE');
        // $this->command->info('*****************************************');
    }
}
