<?php

namespace Database\Factories;

use App\Models\Entrenador;
use App\Models\Socio;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class EntrenadorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition() //: array
    {
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
         *  email
         */
        $dominioEmail = '@reactiv.fit';

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
        while (Entrenador::where('email', $email_return)->first()) {

            $email_sinDominio = $email_sinDominio . rand(1, 999);

            $email_return = $email_sinDominio . $dominioEmail;
        }

        /**
         *  telefono
         */

        $randomNumber5 = rand(1, 5);

        // tres de cada cinco número empiezan en 6
        $tlf_primerDigito = ($randomNumber5 <= 3) ? 6 : 7;

        $tlf_demasDigitos = fake()->unique()->numerify('########');
        $telefono_return = $tlf_primerDigito . $tlf_demasDigitos;

        /* como para la table de entrenadores ya se encarga el factory de generar números únicos,
        solo hay que comprobar que no se repiteen en la tabla de socios */
        while (Socio::where('telefono', $telefono_return)->first()) {

            $tlf_demasDigitos = fake()->unique()->numerify('########');
            $telefono_return = $tlf_primerDigito . $tlf_demasDigitos;
        }

        /**
         *  user_id
         */
        do {

            // cocge el id del primer usuario que no esté cogido por ningún socio
            // y además que no se encuentre tampoco en la propia tabla de entrenaodres
            $user_id = User::whereNotIn('id', function ($query) {
                $query->select('user_id')->from('socios');
            })->whereNotIn('id', function ($query) {
                $query->select('user_id')->from('entrenadores');
            })->pluck('id')->first();

        } while (Entrenador::where('user_id', $user_id)->exists());

        /**
         *  return
         */
        return [
            'nombre' => $nombre_return,
            'apellidos' => $apellidos_return,
            'email' => $email_return,
            'telefono' => $telefono_return,
            'user_id' => $user_id,
        ];
    }
}
