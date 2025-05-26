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
            $e->imagen = $ejercicio['imagen'];
            $e->grupo_id = GrupoMuscular::where('nombre', $ejercicio['grupo_muscular'])->first()?->id;
            $e->save();
        }
    }

    private static $ejercicios_array = [

        // pectoral

        [
            'nombre' => 'Press de banca',
            'descripcion' => 'Ejercicio para trabajar el pecho, empujando una barra hacia arriba desde el pecho.',
            'imagen' => 'press-de-banca.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Press inclinado',
            'descripcion' => 'El press inclinado trabaja el pecho superior, empujando la barra hacia arriba en un banco inclinado.',
            'imagen' => 'press-inclinado.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Press declinado',
            'descripcion' => 'Ejercicio para trabajar el pecho bajo, empujando una barra hacia arriba en un banco declinado.',
            'imagen' => 'press-declinado.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Press horizontal',
            'descripcion' => 'Se trabaja el pecho empujando una barra hacia arriba en un banco plano.',
            'imagen' => 'press-horizontal.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Press inclinado con mancuernas',
            'descripcion' => 'Se trabaja el pecho superior abriendo los brazos con una mancuerna en cada mano en banco inclinado.',
            'imagen' => 'press-inclinado-con-mancuernas.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Press declinado con mancuernas',
            'descripcion' => 'Ejercicio para el pecho bajo abriendo los brazos con mancuernas en banco declinado.',
            'imagen' => 'press-declinado-con-mancuernas.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Aperturas horizontales',
            'descripcion' => 'Se trabaja el pecho abriendo los brazos con mancuernas en un banco plano.',
            'imagen' => 'aperturas-horizontales.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Aperturas inclinadas',
            'descripcion' => 'Se hace en banco inclinado abriendo los brazos con mancuernas para trabajar el pecho superior.',
            'imagen' => 'aperturas-inclinadas.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Aperturas declinadas',
            'descripcion' => 'Ejercicio para el pecho bajo abriendo los brazos con mancuernas en banco declinado.',
            'imagen' => 'aperturas-declinadas.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Press en máquina',
            'descripcion' => 'Ejercicio para el pecho usando una máquina para empujar el peso hacia adelante.',
            'imagen' => 'press-en-maquina-pectoral.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Contractor',
            'descripcion' => 'Se trabaja el pecho juntando los brazos al frente en una máquina tipo mariposa.',
            'imagen' => 'contractor.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Cruces de polea',
            'descripcion' => 'Ejercicio donde se cruzan los brazos al frente con poleas para trabajar el pecho.',
            'imagen' => 'cruces-de-polea.webp',
            'grupo_muscular' => 'Pectoral',
        ],
        [
            'nombre' => 'Fondos',
            'descripcion' => 'Se trabaja el pecho bajando y subiendo el cuerpo con los brazos en barras paralelas.',
            'imagen' => 'fondos-pectoral.webp',
            'grupo_muscular' => 'Pectoral',
        ],

        // dorsal

        [
            'nombre' => 'Dominadas dorsal',
            'descripcion' => 'Ejercicio para espalda donde se sube el cuerpo agarrado a una barra.',
            'imagen' => 'dominadas-dorsal.webp',
            'grupo_muscular' => 'Dorsal',
        ],
        [
            'nombre' => 'Jalón polea tras nuca',
            'descripcion' => 'Ejercicio para espalda bajando una barra desde arriba hasta el pecho.',
            'imagen' => 'jalon-polea-tras-nuca.webp',
            'grupo_muscular' => 'Dorsal',
        ],
        [
            'nombre' => 'Jalón polea 45º',
            'descripcion' => 'Similar al jalón normal pero con el torso inclinado para variar el enfoque en la espalda.',
            'imagen' => 'jalon-polea-45.webp',
            'grupo_muscular' => 'Dorsal',
        ],
        [
            'nombre' => 'Remo Gironda',
            'descripcion' => 'Ejercicio de espalda con barra desde el suelo, con el torso inclinado hacia adelante.',
            'imagen' => 'remo-gironda.webp',
            'grupo_muscular' => 'Dorsal',
        ],
        [
            'nombre' => 'Remo con barra',
            'descripcion' => 'Se trabaja la espalda jalando una barra hacia el abdomen con el torso inclinado.',
            'imagen' => 'remo-con-barra.webp',
            'grupo_muscular' => 'Dorsal',
        ],
        [
            'nombre' => 'Remo a una mano',
            'descripcion' => 'Se hace con mancuerna jalando hacia el cuerpo con un brazo, apoyado en banco.',
            'imagen' => 'remo-a-una-mano.webp',
            'grupo_muscular' => 'Dorsal',
        ],
        [
            'nombre' => 'Jalón polea al pecho',
            'descripcion' => 'Se baja la barra hacia el pecho con agarre ancho para trabajar la espalda.',
            'imagen' => 'jalon-polea-al-pecho.webp',
            'grupo_muscular' => 'Dorsal',
        ],
        [
            'nombre' => 'Jalón polea estrecho',
            'descripcion' => 'Se baja la barra con agarre cerrado, enfocando más en la parte central de la espalda.',
            'imagen' => 'jalon-polea-estrecho.webp',
            'grupo_muscular' => 'Dorsal',
        ],
        [
            'nombre' => 'Remo en polea',
            'descripcion' => 'Se jala una barra sentados usando polea baja para trabajar toda la espalda.',
            'imagen' => 'remo-en-polea.webp',
            'grupo_muscular' => 'Dorsal',
        ],
        [
            'nombre' => 'Pullover',
            'descripcion' => 'Ejercicio donde se baja una mancuerna desde atrás de la cabeza para trabajar la espalda y el serrato.',
            'imagen' => 'pullover.webp',
            'grupo_muscular' => 'Dorsal',
        ],

        // hombros

        [
            'nombre' => 'Press tras nuca',
            'descripcion' => 'Ejercicio para los hombros empujando una barra desde detrás de la cabeza hacia arriba.',
            'imagen' => 'press-tras-nuca.webp',
            'grupo_muscular' => 'Hombro',
        ],
        [
            'nombre' => 'Press en máquina',
            'descripcion' => 'Ejercicio para hombros usando una máquina para empujar el peso hacia arriba.',
            'imagen' => 'press-en-maquina-hombro.webp',
            'grupo_muscular' => 'Hombro',
        ],
        [
            'nombre' => 'Press militar',
            'descripcion' => 'Ejercicio para hombros empujando una barra desde la altura del pecho hacia arriba.',
            'imagen' => 'press-militar.webp',
            'grupo_muscular' => 'Hombro',
        ],
        [
            'nombre' => 'Elevaciones laterales',
            'descripcion' => 'Ejercicio para los deltoides laterales levantando mancuernas hacia los lados.',
            'imagen' => 'elevaciones-laterales.webp',
            'grupo_muscular' => 'Hombro',
        ],
        [
            'nombre' => 'Elevaciones frontales',
            'descripcion' => 'Ejercicio para los deltoides frontales levantando mancuernas hacia el frente.',
            'imagen' => 'elevaciones-frontales.webp',
            'grupo_muscular' => 'Hombro',
        ],
        [
            'nombre' => 'Deltoides posterior',
            'descripcion' => 'Ejercicio enfocado en la parte posterior del hombro, trabajando la parte trasera del deltoides.',
            'imagen' => 'deltoides-posterior.webp',
            'grupo_muscular' => 'Hombro',
        ],
        [
            'nombre' => 'Press con mancuernas',
            'descripcion' => 'Se trabaja el hombro empujando mancuernas desde la altura del pecho hacia arriba.',
            'imagen' => 'press-con-mancuernas-hombros.webp',
            'grupo_muscular' => 'Hombro',
        ],
        [
            'nombre' => 'Elevación lateral (lado de la máquina)',
            'descripcion' => 'Ejercicio para los deltoides laterales, levantando mancuernas hacia los lados desde una máquina.',
            'imagen' => 'elevacion-lateral-lado-de-la-maquina.webp',
            'grupo_muscular' => 'Hombro',
        ],
        [
            'nombre' => 'Elevación lateral (espaldas a la máquina)',
            'descripcion' => 'Similar a la elevación lateral, pero con el cuerpo en dirección opuesta a la máquina.',
            'imagen' => 'elevacion-lateral-espaldas-a-la-maquina.webp',
            'grupo_muscular' => 'Hombro',
        ],
        [
            'nombre' => 'Pájaro',
            'descripcion' => 'Ejercicio para los deltoides posteriores abriendo los brazos hacia los lados con mancuernas, generalmente inclinado.',
            'imagen' => 'pajaro.webp',
            'grupo_muscular' => 'Hombro',
        ],

        // bíceps

        [
            'nombre' => 'Curl de bíceps',
            'descripcion' => 'Ejercicio para los bíceps flexionando los codos para levantar una barra.',
            'imagen' => 'curl-de-biceps.webp',
            'grupo_muscular' => 'Bíceps',
        ],
        [
            'nombre' => 'Curl alterno',
            'descripcion' => 'Ejercicio de bíceps alternando el levantamiento de mancuernas en cada brazo.',
            'imagen' => 'curl-alterno.webp',
            'grupo_muscular' => 'Bíceps',
        ],
        [
            'nombre' => 'Curl martillo',
            'descripcion' => 'Ejercicio de bíceps donde se levantan las mancuernas con las palmas enfrentadas, trabajando también los antebrazos.',
            'imagen' => 'curl-martillo.webp',
            'grupo_muscular' => 'Bíceps',
        ],
        [
            'nombre' => 'Curl en máquina',
            'descripcion' => 'Ejercicio para los bíceps realizado en una máquina donde se flexionan los codos contra una resistencia.',
            'imagen' => 'curl-en-maquina.webp',
            'grupo_muscular' => 'Bíceps',
        ],
        [
            'nombre' => 'Curl concentrado',
            'descripcion' => 'Ejercicio de bíceps realizado en un banco, concentrando el esfuerzo en un solo brazo a la vez.',
            'imagen' => 'curl-concentrado.webp',
            'grupo_muscular' => 'Bíceps',
        ],
        [
            'nombre' => 'Curl en polea',
            'descripcion' => 'Ejercicio para bíceps usando poleas para crear resistencia mientras se flexionan los codos.',
            'imagen' => 'curl-en-polea.webp',
            'grupo_muscular' => 'Bíceps',
        ],
        [
            'nombre' => 'Polea a una mano',
            'descripcion' => 'Ejercicio para bíceps usando una polea, levantando la cuerda con un solo brazo.',
            'imagen' => 'polea-a-una-mano.webp',
            'grupo_muscular' => 'Bíceps',
        ],
        [
            'nombre' => 'Curl invertido',
            'descripcion' => 'Ejercicio para los bíceps y antebrazos donde se usa una barra con agarre pronado (palmas hacia abajo).',
            'imagen' => 'curl-invertido.webp',
            'grupo_muscular' => 'Bíceps',
        ],

        // trapecio

        [
            'nombre' => 'Rotaciones de trapecio',
            'descripcion' => 'Ejercicio para el trapecio donde se hacen movimientos circulares con pesas o barra para activar la zona superior de la espalda.',
            'imagen' => 'rotaciones-de-trapecio.webp',
            'grupo_muscular' => 'Trapecio',
        ],
        [
            'nombre' => 'Trapecio con barra',
            'descripcion' => 'Ejercicio para el trapecio donde se levantan los hombros hacia las orejas con una barra, trabajando la parte superior de la espalda.',
            'imagen' => 'trapecio-con-barra.webp',
            'grupo_muscular' => 'Trapecio',
        ],

        // tríceps

        [
            'nombre' => 'Press francés',
            'descripcion' => 'Ejercicio para tríceps donde se extiende una barra desde detrás de la cabeza hasta la posición inicial.',
            'imagen' => 'press-frances.webp',
            'grupo_muscular' => 'Tríceps',
        ],
        [
            'nombre' => 'Press francés de pie',
            'descripcion' => 'Ejercicio para tríceps similar al press francés, pero realizado de pie y con barra o mancuernas.',
            'imagen' => 'press-frances-de-pie.webp',
            'grupo_muscular' => 'Tríceps',
        ],
        [
            'nombre' => 'Press con mancuernas',
            'descripcion' => 'Ejercicio para tríceps realizado empujando mancuernas desde detrás de la cabeza hacia arriba.',
            'imagen' => 'press-con-mancuernas-triceps.webp',
            'grupo_muscular' => 'Tríceps',
        ],
        [
            'nombre' => 'Press a una mano tumbado',
            'descripcion' => 'Ejercicio para tríceps realizado tumbado sobre un banco, empujando una mancuerna con un solo brazo.',
            'imagen' => 'press-a-una-mano-tumbado.webp',
            'grupo_muscular' => 'Tríceps',
        ],
        [
            'nombre' => 'Press a una mano',
            'descripcion' => 'Ejercicio para tríceps similar al press a una mano tumbado, pero realizado de pie o sentado.',
            'imagen' => 'press-a-una-mano.webp',
            'grupo_muscular' => 'Tríceps',
        ],
        [
            'nombre' => 'Extensiones en polea',
            'descripcion' => 'Ejercicio para tríceps donde se extiende la cuerda o barra en polea alta, trabajando todo el músculo.',
            'imagen' => 'extensiones-en-polea.webp',
            'grupo_muscular' => 'Tríceps',
        ],
        [
            'nombre' => 'Fondos',
            'descripcion' => 'Ejercicio para tríceps realizado en barras paralelas, bajando y subiendo el cuerpo usando los brazos.',
            'imagen' => 'fondos-triceps.webp',
            'grupo_muscular' => 'Tríceps',
        ],
        [
            'nombre' => 'Polea invertida',
            'descripcion' => 'Ejercicio para tríceps en polea baja con agarre invertido, tirando hacia el cuerpo.',
            'imagen' => 'polea-invertida.webp',
            'grupo_muscular' => 'Tríceps',
        ],
        [
            'nombre' => 'Patadas de tríceps',
            'descripcion' => 'Ejercicio para tríceps realizando extensiones de brazo hacia atrás con una mancuerna.',
            'imagen' => 'patadas-de-triceps.webp',
            'grupo_muscular' => 'Tríceps',
        ],
        [
            'nombre' => 'Tirón de polea',
            'descripcion' => 'Ejercicio para tríceps en polea alta, tirando hacia abajo con un agarre adecuado para activar los tríceps.',
            'imagen' => 'tiron-de-polea.webp',
            'grupo_muscular' => 'Tríceps',
        ],

        // piernas

        [
            'nombre' => 'Sentadillas 90º',
            'descripcion' => 'Ejercicio para piernas donde se baja el cuerpo hasta formar un ángulo de 90 grados con las rodillas.',
            'imagen' => 'sentadillas-90.webp',
            'grupo_muscular' => 'Piernas',
        ],
        [
            'nombre' => 'Prensa horizontal',
            'descripcion' => 'Ejercicio para piernas donde empujas una plataforma hacia adelante mientras estás sentado en una máquina.',
            'imagen' => 'prensa-horizontal.webp',
            'grupo_muscular' => 'Piernas',
        ],
        [
            'nombre' => 'Prensa declinada',
            'descripcion' => 'Ejercicio para piernas realizado en una prensa en ángulo descendente, trabajando principalmente glúteos y cuádriceps.',
            'imagen' => 'prensa-declinada.webp',
            'grupo_muscular' => 'Piernas',
        ],
        [
            'nombre' => 'Extensiones',
            'descripcion' => 'Ejercicio para cuádriceps donde se extienden las piernas en una máquina especializada.',
            'imagen' => 'extensiones.webp',
            'grupo_muscular' => 'Piernas',
        ],
        [
            'nombre' => 'Prensa inclinada',
            'descripcion' => 'Ejercicio para piernas realizado en una prensa con ángulo inclinado, activando cuádriceps y glúteos.',
            'imagen' => 'prensa-inclinada.webp',
            'grupo_muscular' => 'Piernas',
        ],
        [
            'nombre' => 'Femoral',
            'descripcion' => 'Ejercicio para los isquiotibiales realizado en una máquina donde se flexionan las piernas hacia atrás.',
            'imagen' => 'femoral.webp',
            'grupo_muscular' => 'Piernas',
        ],
        [
            'nombre' => 'Aductores (interna)',
            'descripcion' => 'Ejercicio para la parte interna de los muslos realizado en una máquina donde se abren y cierran las piernas.',
            'imagen' => 'abductores-interna.webp',
            'grupo_muscular' => 'Piernas',
        ],
        [
            'nombre' => 'Abductores (externa)',
            'descripcion' => 'Ejercicio para la parte externa de los muslos, abriendo las piernas en una máquina especializada.',
            'imagen' => 'abductores-externa.webp',
            'grupo_muscular' => 'Piernas',
        ],
        [
            'nombre' => 'Splits',
            'descripcion' => 'Ejercicio de pierna que trabaja cuádriceps y glúteos realizando una zancada profunda con un pie hacia adelante.',
            'imagen' => 'splits.webp',
            'grupo_muscular' => 'Piernas',
        ],
        [
            'nombre' => 'Glúteos',
            'descripcion' => 'Ejercicio para glúteos realizado en una máquina donde se empujan las piernas hacia atrás o hacia arriba.',
            'imagen' => 'gluteos.webp',
            'grupo_muscular' => 'Piernas',
        ],

        // gemelos

        [
            'nombre' => 'Gemelos de pie',
            'descripcion' => 'Ejercicio para gemelos realizado de pie en una máquina, levantando los talones hacia arriba.',
            'imagen' => 'gemelos-de-pie.webp',
            'grupo_muscular' => 'Gemelos',
        ],
        [
            'nombre' => 'Gemelos sentados',
            'descripcion' => 'Ejercicio para gemelos realizado sentado en una máquina, empujando con los pies mientras los talones se levantan.',
            'imagen' => 'gemelos-sentados.webp',
            'grupo_muscular' => 'Gemelos',
        ],

        // abdominales

        [
            'nombre' => 'Elevaciones de tronco',
            'descripcion' => 'Ejercicio para abdomen donde se eleva el tronco desde una posición tumbada, activando los músculos abdominales.',
            'imagen' => 'elevaciones-de-tronco.webp',
            'grupo_muscular' => 'Abdominales',
        ],
        [
            'nombre' => 'Concentraciones',
            'descripcion' => 'Ejercicio abdominal realizado con un solo brazo estirado, concentrando el esfuerzo en la parte lateral del abdomen.',
            'imagen' => 'concentraciones.webp',
            'grupo_muscular' => 'Abdominales',
        ],
        [
            'nombre' => 'Patadas de rana',
            'descripcion' => 'Ejercicio abdominal donde se simula el movimiento de una patada de rana, trabajando los abdominales y flexores de la cadera.',
            'imagen' => 'patadas-de-rana.webp',
            'grupo_muscular' => 'Abdominales',
        ],
        [
            'nombre' => 'Elevaciones de piernas',
            'descripcion' => 'Ejercicio para abdomen donde se elevan las piernas desde una posición tumbada o colgante, enfocándose en los abdominales inferiores.',
            'imagen' => 'elevaciones-de-piernas.webp',
            'grupo_muscular' => 'Abdominales',
        ],
        [
            'nombre' => 'Elevaciones de piernas 2',
            'descripcion' => 'Ejercicio para abdomen realizado en una máquina para elevar las piernas mientras se sostiene el cuerpo en el aire, enfocando los músculos abdominales.',
            'imagen' => 'elevaciones-de-piernas-2.webp',
            'grupo_muscular' => 'Abdominales',
        ],
        [
            'nombre' => 'Elevaciones de piernas 3',
            'descripcion' => 'Ejercicio para abdomen realizado en una máquina para elevar las piernas mientras se sostiene el cuerpo en el aire, enfocando los músculos abdominales.',
            'imagen' => 'elevaciones-de-piernas-3.webp',
            'grupo_muscular' => 'Abdominales',
        ],
        [
            'nombre' => 'Abdominal en máquina',
            'descripcion' => 'Ejercicio para abdomen realizado en una máquina específica para hacer flexiones del torso, enfocando los músculos abdominales.',
            'imagen' => 'abdominal-en-maquina.webp',
            'grupo_muscular' => 'Abdominales',
        ],

        // lumbares

        [
            'nombre' => 'Buenos días',
            'descripcion' => 'Ejercicio para la espalda baja y los isquiotibiales, donde se flexiona el torso hacia adelante manteniendo las piernas rectas y luego se regresa a la posición inicial.',
            'imagen' => 'buenos-dias.webp',
            'grupo_muscular' => 'Lumbares',
        ],
        [
            'nombre' => 'Extensiones lumbares',
            'descripcion' => 'Ejercicio para la espalda baja realizado en una máquina de extensiones lumbares, levantando el torso desde una posición inclinada.',
            'imagen' => 'extensiones-lumbares.webp',
            'grupo_muscular' => 'Lumbares',
        ],
        [
            'nombre' => 'Peso muerto',
            'descripcion' => 'Ejercicio compuesto para trabajar la espalda baja, glúteos y piernas, levantando una barra desde el suelo manteniendo la espalda recta.',
            'imagen' => 'peso-muerto.webp',
            'grupo_muscular' => 'Lumbares',
        ],

        // oblicuos

        [
            'nombre' => 'Giros de cintura',
            'descripcion' => 'Ejercicio para los oblicuos donde se rota el torso de un lado a otro, de pie o sentado.',
            'imagen' => 'giros-de-cintura.webp',
            'grupo_muscular' => 'Oblicuos',
        ],
        [
            'nombre' => 'Twists',
            'descripcion' => 'Ejercicio para oblicuos que consiste en girar el torso de lado a lado, con o sin peso.',
            'imagen' => 'twists.webp',
            'grupo_muscular' => 'Oblicuos',
        ],
        [
            'nombre' => 'Flexiones laterales',
            'descripcion' => 'Ejercicio donde se inclina el torso hacia un costado, enfocándose en los oblicuos.',
            'imagen' => 'flexiones-laterales.webp',
            'grupo_muscular' => 'Oblicuos',
        ],
        [
            'nombre' => 'Elevaciones de tronco con giro',
            'descripcion' => 'Ejercicio para oblicuos donde se eleva el tronco desde el suelo añadiendo una rotación hacia un lado.',
            'imagen' => 'elevaciones-de-tronco-con-giro.webp',
            'grupo_muscular' => 'Oblicuos',
        ],
    ];
}
