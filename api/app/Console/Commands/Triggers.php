<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class Triggers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:triggers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create the database triggers from database/triggers/';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        /**
         *
         * trigger para asignar fecha_fin dependiendo de cuánto dure la tarifa del socio
         *
         */

        // coge el archivo dependiendo de si la conexión es en mysql (mariadb) o postgresql
        switch (env('DB_CONNECTION')) {
            case 'mysql':
            case 'mariadb':
                $asignar_fecha_fin_tarifa = database_path('triggers/mysql/asignar_fecha_fin_tarifa.sql');
                break;
            case 'pgsql':
                $asignar_fecha_fin_tarifa = database_path('triggers/postgresql/asignar_fecha_fin_tarifa.sql');
                break;
            default:
                $this->error('hay problemas con los triggers');
                break;
        }

        // verifica si existe
        if (!File::exists($asignar_fecha_fin_tarifa)) {
            $this->error('no existe asignar_fecha_fin_tarifa.sql');
            return 0;
        }

        // obtiene el código del trigger
        $trigger_asignar_fecha_fin_tarifa = File::get($asignar_fecha_fin_tarifa);

        // lo ejecuta en la base de datos
        DB::unprepared($trigger_asignar_fecha_fin_tarifa);

        $this->info('trigger *asignar_fecha_fin_tarifa*, creado correctamente');


        /**
         *
         * trigger para asignar acceso_id a la tabla seguimientos cuando se crea un seguimiento
         *
         */

        // coge el archivo dependiendo de si la conexión es en mysql (mariadb) o postgresql
        switch (env('DB_CONNECTION')) {
            case 'mysql':
            case 'mariadb':
                $asignar_acceso_id = database_path('triggers/mysql/asignar_acceso_id.sql');
                break;
            case 'pgsql':
                $asignar_acceso_id = database_path('triggers/postgresql/asignar_acceso_id.sql');
                break;
            default:
                $this->error('hay problemas con los triggers');
                break;
        }

        // verifica si existe
        if (!File::exists($asignar_acceso_id)) {
            $this->error('no existe asignar_acceso_id.sql');
            return 0;
        }

        // obtiene el código del trigger
        $trigger_asignar_acceso_id = File::get($asignar_acceso_id);

        // lo ejecuta en la base de datos
        DB::unprepared($trigger_asignar_acceso_id);

        $this->info('trigger *asignar_acceso_id*, creado correctamente');

        //$this->info('');
        // $this->info('*****************************************');
        // $this->info('TODOS LOS TRIGGERS CREADOS CORRECTAMENTE');
        // $this->info('*****************************************');
    }
}
