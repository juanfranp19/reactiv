import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_CALENTAMIENTOS_SEGUIMIENTOS = API_URL + '/api/v1/calentamientos-seguimientos';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para obtener los calentamientos de un seguimiento
export const getCalentamientosSeguimiento = async (seguimiento_id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener los calentamientos del seguimiento
        const response = await fetch(`${API_URL_CALENTAMIENTOS_SEGUIMIENTOS}/${seguimiento_id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los calentamientos del seguimiento');
            return 0;
        }

        console.log(`los calentamientos del seguimiento ${seguimiento_id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getCalentamientosSeguimiento: ', error.message);
        throw error;
    }
}

// servicio para añadir un calentamiento a un seguimiento
export const postCalentamientoSeguimiento = async (data, seguimiento_id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método POST
        const response = await fetch(`${API_URL_CALENTAMIENTOS_SEGUIMIENTOS}/${seguimiento_id}`, {
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

// servicio para eliminar un calentamiento a un seguimiento
export const deleteCalentamientoSeguimiento = async (data, seguimiento_id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método DELETE
        const response = await fetch(`${API_URL_CALENTAMIENTOS_SEGUIMIENTOS}/${seguimiento_id}?calentamiento_id=${data}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // error que sale en pantalla si no se ha podido eliminar el calentamiento
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

            console.log('calentamiento eliminado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al eliminar el calentamiento.');
        console.error('error al eliminar calentamiento:', error.message);
        throw error;
    }
}
