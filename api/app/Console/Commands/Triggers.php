<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

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
    protected $description = 'Create the database triggers';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // trigger para asignar fecha_fin dependiendo de cuánto dure la tarifa del socio
        DB::unprepared('
            CREATE OR REPLACE TRIGGER asignar_fecha_fin
            BEFORE INSERT ON socios_tarifas
            FOR EACH ROW
            BEGIN
                DECLARE duracion INTEGER;

                -- consulta para sacar la duración de la tarifa
                SELECT t.duracion
                INTO duracion
                FROM tarifas t
                WHERE t.id = NEW.tarifa_id;

                IF duracion IS NOT NULL THEN

                    -- se le asigna a la fecha_fin la suma de la fecha_inicio y la duración de la tarifa
                    SET NEW.fecha_fin = DATE_ADD(NEW.fecha_inicio, INTERVAL duracion DAY);

                END IF;
            END;
        ');
        $this->info('trigger *asignar_fecha_fin*, creado correctamente');

        $this->info('');
        $this->info('*****************************************');
        $this->info('TODOS LOS TRIGGERS CREADOS CORRECTAMENTE');
        $this->info('*****************************************');
    }
}
