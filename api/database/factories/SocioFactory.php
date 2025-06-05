<?php

namespace Database\Factories;

use App\Models\Socio;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SocioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        /**
         *  dni
         */
        $dni_numero = fake()->unique()->numerify('########');
        $dni_calcularLetra = $dni_numero % 23;
        $dni_letra = match ($dni_calcularLetra) {
            0 => 'T',
            1 => 'R',
            2 => 'W',
            3 => 'A',
            4 => 'G',
            5 => 'M',
            6 => 'Y',
            7 => 'F',
            8 => 'P',
            9 => 'D',
            10 => 'X',
            11 => 'B',
            12 => 'N',
            13 => 'J',
            14 => 'Z',
            15 => 'S',
            16 => 'Q',
            17 => 'V',
            18 => 'H',
            19 => 'L',
            20 => 'C',
            21 => 'K',
            22 => 'E',
            default => '',
        };
        $dni_return = $dni_numero . $dni_letra;

        /**
         *  nombre
         */
        $nombre_return = fake()->firstName();

        /**
         *  apellidos
         */
        $apellido1 = fake()->lastName();
        $apellido2 = fake()->lastName();
        $apellidos_return = $apellido1 . ' ' . $apellido2;

        /**
         *  telefono
         */
        $randomNumber5 = rand(1, 5);

        // tres de cada cinco número empiezan en 6
        $tlf_primerDigito = ($randomNumber5 <= 3) ? 6 : 7;

        $tlf_demasDigitos = fake()->unique()->numerify('########');
        $telefono_return = $tlf_primerDigito . $tlf_demasDigitos;

        /**
         *  email
         */
        $randomNumber100 = rand(1, 100);

        // el 60, 20 y 20 por ciento de los dominios, respectivamente
        switch (true) {
            case ($randomNumber100 <= 60):
                $dominioEmail = '@gmail.com';
                break;
            case ($randomNumber100 >= 80):
                $dominioEmail = '@outlook.com';
                break;
            default:
                $dominioEmail = '@yahoo.com';
                break;
        }

        //$socios = Socio::all();
        $nombreEmail = $nombre_return;

        // si el nombre ya está repetido, se le asigna un numero de una a tres cifras
        /* do {
            $nombre_ocupado = false;

            foreach($socios as $socio) {
                if ($socio->nombre == $nombreEmail) $nombre_ocupado = true;
            }

            if ($nombre_ocupado == true) $nombreEmail = $nombreEmail . rand(1, 999);

        } while ($nombre_ocupado == true); */

        // combierte a minúscula todo y reemplaza cada letra con acento a su letra sin acento
        $nombreEmail_convertido = strtolower(
            str_replace(
                ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ', 'á', 'é', 'í', 'ó', 'ú', 'ñ', ' '], // espacio porque sinó, Miguel Ángel => miguel.Ángel
                ['a', 'e', 'i', 'o', 'u', 'n', 'a', 'e', 'i', 'o', 'u', 'n', ' '],
                $nombreEmail
            )
        );

        // se pasan a array el nombre
        $array_nombresEmail = explode(' ', $nombreEmail_convertido);

        // si es compuesto el email tiene sus dos nombres juntos por un punto (solo los dos primeros nombres)
        if (count($array_nombresEmail) > 1) {
            $email_sinDominio = $array_nombresEmail[0] . '.' . $array_nombresEmail[1];
        } else {
            $email_sinDominio = $array_nombresEmail[0];
        }

        $email_return = $email_sinDominio . $dominioEmail;

        // Si el email ya está cogido, se le asiga un número hasta que deje de estár repetido el email
        while (Socio::where('email', $email_return)->first()) {

            $email_sinDominio = $email_sinDominio . rand(1, 999);

            $email_return = $email_sinDominio . $dominioEmail;
        }

        /**
         *  direccion
         */

        $nombreCalle = fake()->streetName;
        $numeroCalle = fake()->buildingNumber;

        $direccion_return = $nombreCalle . ', ' . $numeroCalle;

        /**
         * cod_acceso
         */
        do  {
            // asigna un código de acceso hasta que no se repita con otro
            $cod_acceso = Str::random(15);

        } while (Socio::where('cod_acceso', $cod_acceso)->exists());

        /**
         *  RETURN del Factory
         */
        return [
            'dni' => $dni_return,
            'nombre' => $nombre_return,
            'apellidos' => $apellidos_return,
            'email' => $email_return,
            'telefono' => $telefono_return,
            'fecha_nac' => fake()->dateTimeBetween('-60 years', '-14 years')->format('Y-m-d'),
            'direccion' => $direccion_return,
            'cod_acceso' => $cod_acceso,
        ];
    }
}
