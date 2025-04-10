<?php

namespace Database\Seeders;

use App\Models\Ejercicio;
use App\Models\GrupoMuscular;
use Illuminate\Database\Seeder;

class EjercicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ejercicio::query()->delete();



        foreach (self::$ejercicios_array as $ejercicio) {
            $e = new Ejercicio();
            $e->nombre = $ejercicio['nombre'];
            $e->descripcion = $ejercicio['descripcion'];
            //$e->imagen = $ejercicio['imagen'];
            $e->grupo_id = GrupoMuscular::where('nombre', $ejercicio['grupo_muscular'])->first()?->id;
            $e->save();
        }
    }

    private static $ejercicios_array = [

        // pectoral

        [
            'nombre' => 'Press de banca',
            'descripcion' => 'Ejercicio para trabajar el pecho, empujando una barra hacia arriba desde el pecho.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Press inclinado',
            'descripcion' => 'El press inclinado trabaja el pecho superior, empujando la barra hacia arriba en un banco inclinado.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Press declinado',
            'descripcion' => 'Ejercicio para trabajar el pecho bajo, empujando una barra hacia arriba en un banco declinado.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Press horizontal',
            'descripcion' => 'Se trabaja el pecho empujando una barra hacia arriba en un banco plano.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Press inclinado con mancuernas',
            'descripcion' => 'Se trabaja el pecho superior abriendo los brazos con una mancuerna en cada mano en banco inclinado.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Press declinado con mancuernas',
            'descripcion' => 'Ejercicio para el pecho bajo abriendo los brazos con mancuernas en banco declinado.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Aperturas horizontales',
            'descripcion' => 'Se trabaja el pecho abriendo los brazos con mancuernas en un banco plano.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Aperturas inclinadas',
            'descripcion' => 'Se hace en banco inclinado abriendo los brazos con mancuernas para trabajar el pecho superior.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Aperturas declinadas',
            'descripcion' => 'Ejercicio para el pecho bajo abriendo los brazos con mancuernas en banco declinado.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Press en máquina',
            'descripcion' => 'Ejercicio para el pecho usando una máquina para empujar el peso hacia adelante.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Contractor',
            'descripcion' => 'Se trabaja el pecho juntando los brazos al frente en una máquina tipo mariposa.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Cruces de polea',
            'descripcion' => 'Ejercicio donde se cruzan los brazos al frente con poleas para trabajar el pecho.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],
        [
            'nombre' => 'Fondos',
            'descripcion' => 'Se trabaja el pecho bajando y subiendo el cuerpo con los brazos en barras paralelas.',
            //'imagen' => '',
            'grupo_muscular' => 'pectoral',
        ],

        // dorsal

        [
            'nombre' => 'Dominada dorsal',
            'descripcion' => 'Ejercicio para espalda donde se sube el cuerpo agarrado a una barra.',
            //'imagen' => '',
            'grupo_muscular' => 'dorsal',
        ],
        [
            'nombre' => 'Jalón en polea',
            'descripcion' => 'Ejercicio para espalda bajando una barra desde arriba hasta el pecho.',
            //'imagen' => '',
            'grupo_muscular' => 'dorsal',
        ],
        [
            'nombre' => 'Jalón en polea 45º',
            'descripcion' => 'Similar al jalón normal pero con el torso inclinado para variar el enfoque en la espalda.',
            //'imagen' => '',
            'grupo_muscular' => 'dorsal',
        ],
        [
            'nombre' => 'Remo Gironda',
            'descripcion' => 'Ejercicio de espalda con barra desde el suelo, con el torso inclinado hacia adelante.',
            //'imagen' => '',
            'grupo_muscular' => 'dorsal',
        ],
        [
            'nombre' => 'Remo con barra',
            'descripcion' => 'Se trabaja la espalda jalando una barra hacia el abdomen con el torso inclinado.',
            //'imagen' => '',
            'grupo_muscular' => 'dorsal',
        ],
        [
            'nombre' => 'Remo a una mano',
            'descripcion' => 'Se hace con mancuerna jalando hacia el cuerpo con un brazo, apoyado en banco.',
            //'imagen' => '',
            'grupo_muscular' => 'dorsal',
        ],
        [
            'nombre' => 'Jalón en polea al pecho',
            'descripcion' => 'Se baja la barra hacia el pecho con agarre ancho para trabajar la espalda.',
            //'imagen' => '',
            'grupo_muscular' => 'dorsal',
        ],
        [
            'nombre' => 'Jalón en polea estrecho',
            'descripcion' => 'Se baja la barra con agarre cerrado, enfocando más en la parte central de la espalda.',
            //'imagen' => '',
            'grupo_muscular' => 'dorsal',
        ],
        [
            'nombre' => 'Remo en polea',
            'descripcion' => 'Se jala una barra sentados usando polea baja para trabajar toda la espalda.',
            //'imagen' => '',
            'grupo_muscular' => 'dorsal',
        ],
        [
            'nombre' => 'Pullover',
            'descripcion' => 'Ejercicio donde se baja una mancuerna desde atrás de la cabeza para trabajar la espalda y el serrato.',
            //'imagen' => '',
            'grupo_muscular' => 'dorsal',
        ],

        // hombros

        [
            'nombre' => 'Pres tras nuca',
            'descripcion' => 'Ejercicio para los hombros empujando una barra desde detrás de la cabeza hacia arriba.',
            //'imagen' => '',
            'grupo_muscular' => 'hombros',
        ],
        [
            'nombre' => 'Press en máquina',
            'descripcion' => 'Ejercicio para hombros usando una máquina para empujar el peso hacia arriba.',
            //'imagen' => '',
            'grupo_muscular' => 'hombros',
        ],
        [
            'nombre' => 'Press militar',
            'descripcion' => 'Ejercicio para hombros empujando una barra desde la altura del pecho hacia arriba.',
            //'imagen' => '',
            'grupo_muscular' => 'hombros',
        ],
        [
            'nombre' => 'Elevaciones laterales',
            'descripcion' => 'Ejercicio para los deltoides laterales levantando mancuernas hacia los lados.',
            //'imagen' => '',
            'grupo_muscular' => 'hombros',
        ],
        [
            'nombre' => 'Elevaciones frontales',
            'descripcion' => 'Ejercicio para los deltoides frontales levantando mancuernas hacia el frente.',
            //'imagen' => '',
            'grupo_muscular' => 'hombros',
        ],
        [
            'nombre' => 'Deltoides posterior',
            'descripcion' => 'Ejercicio enfocado en la parte posterior del hombro, trabajando la parte trasera del deltoides.',
            //'imagen' => '',
            'grupo_muscular' => 'hombros',
        ],
        [
            'nombre' => 'Press con mancuernas',
            'descripcion' => 'Se trabaja el hombro empujando mancuernas desde la altura del pecho hacia arriba.',
            //'imagen' => '',
            'grupo_muscular' => 'hombros',
        ],
        [
            'nombre' => 'Elevación lateral (lado de la máquina)',
            'descripcion' => 'Ejercicio para los deltoides laterales, levantando mancuernas hacia los lados desde una máquina.',
            //'imagen' => '',
            'grupo_muscular' => 'hombros',
        ],
        [
            'nombre' => 'Elevación lateral (espaldas a la máquina)',
            'descripcion' => 'Similar a la elevación lateral, pero con el cuerpo en dirección opuesta a la máquina.',
            //'imagen' => '',
            'grupo_muscular' => 'hombros',
        ],
        [
            'nombre' => 'Pájaro',
            'descripcion' => 'Ejercicio para los deltoides posteriores abriendo los brazos hacia los lados con mancuernas, generalmente inclinado.',
            //'imagen' => '',
            'grupo_muscular' => 'hombros',
        ],

        // bíceps

        [
            'nombre' => 'Curl de bíceps',
            'descripcion' => 'Ejercicio para los bíceps flexionando los codos para levantar una barra.',
            //'imagen' => '',
            'grupo_muscular' => 'bíceps',
        ],
        [
            'nombre' => 'Curl alterno',
            'descripcion' => 'Ejercicio de bíceps alternando el levantamiento de mancuernas en cada brazo.',
            //'imagen' => '',
            'grupo_muscular' => 'bíceps',
        ],
        [
            'nombre' => 'Curl martillo',
            'descripcion' => 'Ejercicio de bíceps donde se levantan las mancuernas con las palmas enfrentadas, trabajando también los antebrazos.',
            //'imagen' => '',
            'grupo_muscular' => 'bíceps',
        ],
        [
            'nombre' => 'Curl en máquina',
            'descripcion' => 'Ejercicio para los bíceps realizado en una máquina donde se flexionan los codos contra una resistencia.',
            //'imagen' => '',
            'grupo_muscular' => 'bíceps',
        ],
        [
            'nombre' => 'Curl concentrado',
            'descripcion' => 'Ejercicio de bíceps realizado en un banco, concentrando el esfuerzo en un solo brazo a la vez.',
            //'imagen' => '',
            'grupo_muscular' => 'bíceps',
        ],
        [
            'nombre' => 'Curl en polea',
            'descripcion' => 'Ejercicio para bíceps usando poleas para crear resistencia mientras se flexionan los codos.',
            //'imagen' => '',
            'grupo_muscular' => 'bíceps',
        ],
        [
            'nombre' => 'Polea a una mano',
            'descripcion' => 'Ejercicio para bíceps usando una polea, levantando la cuerda con un solo brazo.',
            //'imagen' => '',
            'grupo_muscular' => 'bíceps',
        ],
        [
            'nombre' => 'Curl invertido',
            'descripcion' => 'Ejercicio para los bíceps y antebrazos donde se usa una barra con agarre pronado (palmas hacia abajo).',
            //'imagen' => '',
            'grupo_muscular' => 'bíceps',
        ],

        // trapecio

        [
            'nombre' => 'Rotaciones de trapecio',
            'descripcion' => 'Ejercicio para el trapecio donde se hacen movimientos circulares con pesas o barra para activar la zona superior de la espalda.',
            //'imagen' => '',
            'grupo_muscular' => 'trapecio',
        ],
        [
            'nombre' => 'Trapecio con barra',
            'descripcion' => 'Ejercicio para el trapecio donde se levantan los hombros hacia las orejas con una barra, trabajando la parte superior de la espalda.',
            //'imagen' => '',
            'grupo_muscular' => 'trapecio',
        ],

        // tríceps

        [
            'nombre' => 'Press francés',
            'descripcion' => 'Ejercicio para tríceps donde se extiende una barra desde detrás de la cabeza hasta la posición inicial.',
            //'imagen' => '',
            'grupo_muscular' => 'tríceps',
        ],
        [
            'nombre' => 'Press francés de pie',
            'descripcion' => 'Ejercicio para tríceps similar al press francés, pero realizado de pie y con barra o mancuernas.',
            //'imagen' => '',
            'grupo_muscular' => 'tríceps',
        ],
        [
            'nombre' => 'Press con mancuernas',
            'descripcion' => 'Ejercicio para tríceps realizado empujando mancuernas desde detrás de la cabeza hacia arriba.',
            //'imagen' => '',
            'grupo_muscular' => 'tríceps',
        ],
        [
            'nombre' => 'Press a una mano tumbado',
            'descripcion' => 'Ejercicio para tríceps realizado tumbado sobre un banco, empujando una mancuerna con un solo brazo.',
            //'imagen' => '',
            'grupo_muscular' => 'tríceps',
        ],
        [
            'nombre' => 'Press a una mano',
            'descripcion' => 'Ejercicio para tríceps similar al press a una mano tumbado, pero realizado de pie o sentado.',
            //'imagen' => '',
            'grupo_muscular' => 'tríceps',
        ],
        [
            'nombre' => 'Extensiones en polea',
            'descripcion' => 'Ejercicio para tríceps donde se extiende la cuerda o barra en polea alta, trabajando todo el músculo.',
            //'imagen' => '',
            'grupo_muscular' => 'tríceps',
        ],
        [
            'nombre' => 'Fondos',
            'descripcion' => 'Ejercicio para tríceps realizado en barras paralelas, bajando y subiendo el cuerpo usando los brazos.',
            //'imagen' => '',
            'grupo_muscular' => 'tríceps',
        ],
        [
            'nombre' => 'Polea invertida',
            'descripcion' => 'Ejercicio para tríceps en polea baja con agarre invertido, tirando hacia el cuerpo.',
            //'imagen' => '',
            'grupo_muscular' => 'tríceps',
        ],
        [
            'nombre' => 'Patadas de tríceps',
            'descripcion' => 'Ejercicio para tríceps realizando extensiones de brazo hacia atrás con una mancuerna.',
            //'imagen' => '',
            'grupo_muscular' => 'tríceps',
        ],
        [
            'nombre' => 'Tirón de polea',
            'descripcion' => 'Ejercicio para tríceps en polea alta, tirando hacia abajo con un agarre adecuado para activar los tríceps.',
            //'imagen' => '',
            'grupo_muscular' => 'tríceps',
        ],

        // piernas

        [
            'nombre' => 'Sentadillas 90º',
            'descripcion' => 'Ejercicio para piernas donde se baja el cuerpo hasta formar un ángulo de 90 grados con las rodillas.',
            //'imagen' => '',
            'grupo_muscular' => 'piernas',
        ],
        [
            'nombre' => 'Prensa horizontal',
            'descripcion' => 'Ejercicio para piernas donde empujas una plataforma hacia adelante mientras estás sentado en una máquina.',
            //'imagen' => '',
            'grupo_muscular' => 'piernas',
        ],
        [
            'nombre' => 'Prensa declinada',
            'descripcion' => 'Ejercicio para piernas realizado en una prensa en ángulo descendente, trabajando principalmente glúteos y cuádriceps.',
            //'imagen' => '',
            'grupo_muscular' => 'piernas',
        ],
        [
            'nombre' => 'Extensiones',
            'descripcion' => 'Ejercicio para cuádriceps donde se extienden las piernas en una máquina especializada.',
            //'imagen' => '',
            'grupo_muscular' => 'piernas',
        ],
        [
            'nombre' => 'Prensa inclinada',
            'descripcion' => 'Ejercicio para piernas realizado en una prensa con ángulo inclinado, activando cuádriceps y glúteos.',
            //'imagen' => '',
            'grupo_muscular' => 'piernas',
        ],
        [
            'nombre' => 'Femoral',
            'descripcion' => 'Ejercicio para los isquiotibiales realizado en una máquina donde se flexionan las piernas hacia atrás.',
            //'imagen' => '',
            'grupo_muscular' => 'piernas',
        ],
        [
            'nombre' => 'Aductores',
            'descripcion' => 'Ejercicio para la parte interna de los muslos realizado en una máquina donde se abren y cierran las piernas.',
            //'imagen' => '',
            'grupo_muscular' => 'piernas',
        ],
        [
            'nombre' => 'Abductores',
            'descripcion' => 'Ejercicio para la parte externa de los muslos, abriendo las piernas en una máquina especializada.',
            //'imagen' => '',
            'grupo_muscular' => 'piernas',
        ],
        [
            'nombre' => 'Splits',
            'descripcion' => 'Ejercicio de pierna que trabaja cuádriceps y glúteos realizando una zancada profunda con un pie hacia adelante.',
            //'imagen' => '',
            'grupo_muscular' => 'piernas',
        ],
        [
            'nombre' => 'Glúteos',
            'descripcion' => 'Ejercicio para glúteos realizado en una máquina donde se empujan las piernas hacia atrás o hacia arriba.',
            //'imagen' => '',
            'grupo_muscular' => 'piernas',
        ],

        // gemelos

        [
            'nombre' => 'Gemelos de pie',
            'descripcion' => 'Ejercicio para gemelos realizado de pie en una máquina, levantando los talones hacia arriba.',
            //'imagen' => '',
            'grupo_muscular' => 'gemelos',
        ],
        [
            'nombre' => 'Gemelos sentados',
            'descripcion' => 'Ejercicio para gemelos realizado sentado en una máquina, empujando con los pies mientras los talones se levantan.',
            //'imagen' => '',
            'grupo_muscular' => 'gemelos',
        ],

        // abdominales

        [
            'nombre' => 'Elevaciones de tronco',
            'descripcion' => 'Ejercicio para abdomen donde se eleva el tronco desde una posición tumbada, activando los músculos abdominales.',
            //'imagen' => '',
            'grupo_muscular' => 'abdominales',
        ],
        [
            'nombre' => 'Concentraciones',
            'descripcion' => 'Ejercicio abdominal realizado con un solo brazo estirado, concentrando el esfuerzo en la parte lateral del abdomen.',
            //'imagen' => '',
            'grupo_muscular' => 'abdominales',
        ],
        [
            'nombre' => 'Elevaciones de piernas',
            'descripcion' => 'Ejercicio para abdomen donde se elevan las piernas desde una posición tumbada o colgante, enfocándose en los abdominales inferiores.',
            //'imagen' => '',
            'grupo_muscular' => 'abdominales',
        ],
        [
            'nombre' => 'Patadas de rana',
            'descripcion' => 'Ejercicio abdominal donde se simula el movimiento de una patada de rana, trabajando los abdominales y flexores de la cadera.',
            //'imagen' => '',
            'grupo_muscular' => 'abdominales',
        ],
        [
            'nombre' => 'Abdominal en máquina',
            'descripcion' => 'Ejercicio para abdomen realizado en una máquina específica para hacer flexiones del torso, enfocando los músculos abdominales.',
            //'imagen' => '',
            'grupo_muscular' => 'abdominales',
        ],

        // lumbares

        [
            'nombre' => 'Buenos días',
            'descripcion' => 'Ejercicio para la espalda baja y los isquiotibiales, donde se flexiona el torso hacia adelante manteniendo las piernas rectas y luego se regresa a la posición inicial.',
            //'imagen' => '',
            'grupo_muscular' => 'lumbares',
        ],
        [
            'nombre' => 'Extensiones lumbares',
            'descripcion' => 'Ejercicio para la espalda baja realizado en una máquina de extensiones lumbares, levantando el torso desde una posición inclinada.',
            //'imagen' => '',
            'grupo_muscular' => 'lumbares',
        ],
        [
            'nombre' => 'Peso muerto',
            'descripcion' => 'Ejercicio compuesto para trabajar la espalda baja, glúteos y piernas, levantando una barra desde el suelo manteniendo la espalda recta.',
            //'imagen' => '',
            'grupo_muscular' => 'lumbares',
        ],
    ];
}
