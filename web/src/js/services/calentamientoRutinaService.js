import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_CALENTAMIENTOS_RUTINAS = API_URL + '/api/v1/calentamientos-rutinas';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para obtener los calentamientos de una rutina
export const getCalentamientosRutina = async (rutina_id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener los calentamientos de la rutina
        const response = await fetch(`${API_URL_CALENTAMIENTOS_RUTINAS}/${rutina_id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los calentamientos de la rutina');
            return 0;
        }

        console.log(`los calentamientos de la rutina ${rutina_id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getCalentamientosRutina: ', error.message);
        throw error;
    }
}

// servicio para añadir un calentamiento a una rutina
export const postCalentamientoRutina = async (data, rutina_id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método POST
        const response = await fetch(`${API_URL_CALENTAMIENTOS_RUTINAS}/${rutina_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // error que sale en pantalla si no se ha podido añadir el calentamiento
        if (!response.ok) {

            // mensaje de error del servidor
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);

            // mensaje del controlador
            notyf.error(errorData.error); 

            return null;

        } else {

            // coge la respuesta de la API
            const okData = await response.json();

            // mensaje del controlador
            notyf.success(okData);

            console.log('calentamiento añadido: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al añadir el calentamiento.');
        console.error('error al añadir calentamiento:', error.message);
        throw error;
    }
}

// servicio para actualizar un calentamiento a una rutina
export const putCalentamientoRutina = async (data, rutina_id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método PUT
        const response = await fetch(`${API_URL_CALENTAMIENTOS_RUTINAS}/${rutina_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // error que sale en pantalla si no se ha podido actualizar el calentamiento
        if (!response.ok) {

            // mensaje de error del servidor
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);

            // mensaje del controlador
            notyf.error(errorData.error); 

            return null;

        } else {

            // coge la respuesta de la API
            const okData = await response.json();

            // mensaje del controlador
            notyf.success(okData);

            console.log('calentamiento añadido: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al añadir el calentamiento.');
        console.error('error al añadir calentamiento:', error.message);
        throw error;
    }
}
