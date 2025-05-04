import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_SOCIO = API_URL + '/api/v1/socios';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

export const postSocio = async (data) => {

    try {

        const formData = new FormData();

        // agrega todos los campos del objeto data al objeto formData
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        // envía a la URL de socio los datos del socio por método POST
        const response = await fetch(API_URL_SOCIO, {
            method: 'POST',
            /* headers: {
                'Content-Type': 'application/json', // AÑADIR BEARER
            }, */
            body: formData,
        });

        // error que sale en pantalla si no se ha podido crear el usuario
        if (!response.ok) {

            const errorData = await response.json();
            console.error('Error del servidor:', errorData);

            //alert('Error al crear el socio.');
            notyf.error('Error al crear el socio.');
            //notyf.error(errorData.error); para cuando haya una excapcion para cada campo

        } else {

            // coge la respuesta de la API
            const data = await response.json();

            //alert('Socio creado con éxito.');
            notyf.success('Socio creado con éxito.');

            console.log('usuario creado: ', data);
            return data;
        }

    } catch (error) {

        notyf.error('Error al crear el usuario.');
        console.error('error al crear usuario:', error.message);
        throw error;
    }
}
