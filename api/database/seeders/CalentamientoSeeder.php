<?php

namespace Database\Seeders;

use App\Models\Calentamiento;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CalentamientoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Calentamiento::query()->delete();

        foreach (self::$calentamiento_array as $calentamiento) {
            $cal = new Calentamiento();
            $cal->nombre = $calentamiento['nombre'];
            $cal->descripcion = $calentamiento['descripcion'];
            //$cal->imagen = $calentamiento['imagen'];
            $cal->save();
        }
    }

    private static $calentamiento_array = [
        [
            'nombre' => 'Bicicleta vertical',
            'descripcion' => 'Ideal para entrenamiento cardiovascular de bajo impacto, centrado principalmente en el tren inferior (cuádriceps, isquiotibiales, glúteos y pantorrillas). Permite mantener una postura erguida, facilitando sesiones de intensidad moderada a alta. Recomendada para mejorar la resistencia aeróbica y la quema de grasa sin exigir demasiado a las articulaciones.',
            'imagen' => '',
        ],
        [
            'nombre' => 'Bicicleta horizontal',
            'descripcion' => 'Ofrece una posición más relajada gracias a su respaldo, reduciendo la carga en la zona lumbar y rodillas. Es excelente para personas en rehabilitación, con sobrepeso o que buscan sesiones de cardio más prolongadas sin incomodidad. Activa principalmente el tren inferior, con menor implicación de core y sin impacto articular.',
            'imagen' => '',
        ],
        [
            'nombre' => 'Remo',
            'descripcion' => 'Equipo de cardio de cuerpo completo. Involucra piernas (cuádriceps, glúteos), espalda (dorsales), hombros, brazos y core. Permite entrenamientos HIIT o LISS con alta eficiencia calórica. Muy útil para mejorar resistencia, fuerza muscular general y coordinación, con bajo impacto articular si se usa con buena técnica.',
            'imagen' => '',
        ],
        [
            'nombre' => 'Elíptica',
            'descripcion' => 'Apta para entrenamientos aeróbicos de bajo impacto, combinando el trabajo de tren inferior y superior gracias a sus manillares móviles. Activa cuádriceps, glúteos, bíceps, tríceps y hombros. Ideal para sesiones prolongadas o como parte de rutinas de quema de grasa sin sobrecargar rodillas o tobillos.',
            'imagen' => '',
        ],
        [
            'nombre' => 'Cinta de correr',
            'descripcion' => 'Versátil y ajustable. Permite caminar, trotar o correr, con posibilidad de cambiar inclinación para simular pendientes. Excelente para mejorar el VO2 max, aumentar la quema calórica y trabajar resistencia. A mayor velocidad o inclinación, mayor activación muscular en glúteos, isquios y core.',
            'imagen' => '',
        ],
        [
            'nombre' => 'Total Arc Trainer',
            'descripcion' => 'Combina el movimiento de escalada, zancada y elíptica, con un patrón en forma de arco que reduce el impacto articular. Ofrece un entrenamiento eficiente de cuerpo completo, enfocado especialmente en glúteos, cuádriceps y core. Ideal para cardio de alta intensidad con menor riesgo de lesión.',
            'imagen' => '',
        ],
        [
            'nombre' => 'Step - Escalera',
            'descripcion' => 'Simula el gesto de subir escaleras de manera continua. Activa de forma intensa glúteos, cuádriceps e isquiotibiales. Perfecto para sesiones de resistencia muscular y cardio enfocadas en el tren inferior. Muy útil para mejorar potencia, fuerza y capacidad pulmonar sin impacto en tobillos o rodillas.',
            'imagen' => '',
        ],
        [
            'nombre' => 'Arc Trainer',
            'descripcion' => 'Movimiento suave en trayectoria de arco, combinando elementos de la elíptica y el stepper. Permite un trabajo cardiovascular intenso con bajo impacto. Activa tanto tren inferior como superior, ideal para sesiones HIIT o entrenamientos prolongados sin fatiga articular.',
            'imagen' => '',
        ],
    ];
}
