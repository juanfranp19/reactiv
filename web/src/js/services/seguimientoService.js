import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_SEGUIMIENTOS = API_URL + '/api/v1/seguimientos';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para crear un seguimiento
export const postSeguimiento = async (data) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL de seguimiento los datos del seguimiento por método POST
        const response = await fetch(API_URL_SEGUIMIENTOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // error que sale en pantalla si no se ha podido crear el seguimiento
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

            notyf.success('Seguimiento creado con éxito.');

            console.log('seguimiento creado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al crear el seguimiento.');
        console.error('error al crear seguimiento:', error.message);
        throw error;
    }
}

// servicio para obtener datos de un seguimiento
export const getSeguimiento = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener un seguimiento
        const response = await fetch(`${API_URL_SEGUIMIENTOS}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos del seguimiento');
            return 0;
        }

        console.log(`datos del seguimiento ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getSeguimiento: ', error.message);
        throw error;
    }
}

// servicio para actualizar un seguimiento
export const putSeguimiento = async (data, id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método PUT
        const response = await fetch(`${API_URL_SEGUIMIENTOS}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // error que sale en pantalla si no se ha podido actualizar el seguimiento
        if (!response.ok) {

            // mensaje de error del servidor
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);

            // mensaje del observer
            notyf.error(errorData.error);

            return null;

        } else {

            // coge la respuesta de la API
            const okData = await response.json();

            notyf.success(okData);

            console.log('seguimiento añadido: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al actualizar el seguimiento.');
        console.error('error al actualizar seguimiento:', error.message);
        throw error;
    }
}

// servicio para eliminar un seguimiento
export const deleteSeguimiento = async (id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método DELETE
        const response = await fetch(`${API_URL_SEGUIMIENTOS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // error que sale en pantalla si no se ha podido eliminar el seguimiento
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

            console.log('seguimiento eliminado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al eliminar el seguimiento.');
        console.error('error al eliminar seguimiento:', error.message);
        throw error;
    }
}
