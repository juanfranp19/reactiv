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

// servicio para crear un socio
export const postSocio = async (data) => {

    try {

        const token = localStorage.getItem('token');
        const formData = new FormData();

        // agrega todos los campos del objeto data al objeto formData
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        // envía a la URL de socio los datos del socio por método POST
        const response = await fetch(API_URL_SOCIO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        // error que sale en pantalla si no se ha podido crear el socio
        if (!response.ok) {

            // mensaje de error del servidor
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);

            // mensaje del observer
            notyf.error(errorData.error); 

            return 0;

        } else {

            // coge la respuesta de la API
            const okData = await response.json();

            //alert('Socio creado con éxito.');
            notyf.success('Socio creado con éxito.');

            console.log('socio creado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al crear el socio.');
        console.error('error al crear socio:', error.message);
        throw error;
    }
}

// servicio para obtener datos de un socio
export const getSocio = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener un socio
        const response = await fetch(`${API_URL_SOCIO}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos del socio');
            return 0;
        }

        console.log(`datos del socio ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getSocio: ', error.message);
        throw error;
    }
}
