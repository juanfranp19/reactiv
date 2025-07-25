import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_RUTINAS = API_URL + '/api/v1/rutinas';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para crear una rutina
export const postRutina = async (data) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL de rutina los datos de la rutina por método POST
        const response = await fetch(API_URL_RUTINAS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // error que sale en pantalla si no se ha podido crear la rutina
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

            notyf.success('Rutina creada.');

            console.log('rutina creada: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al crear la rutina.');
        console.error('error al crear rutina:', error.message);
        throw error;
    }
}

// servicio para obtener datos de una rutina
export const getRutina = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener una rutina
        const response = await fetch(`${API_URL_RUTINAS}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos de la rutina');
            return 0;
        }

        console.log(`datos de la rutina ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getRutina: ', error.message);
        throw error;
    }
}

// servicio para actualizar una rutina
export const putRutina = async (data, id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método PUT
        const response = await fetch(`${API_URL_RUTINAS}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // error que sale en pantalla si no se ha podido actualizar la rutina
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

            console.log('rutina añadida: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al actualizar la rutina.');
        console.error('error al actualizar rutina:', error.message);
        throw error;
    }
}

// servicio para eliminar una rutina
export const deleteRutina = async (id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método DELETE
        const response = await fetch(`${API_URL_RUTINAS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // error que sale en pantalla si no se ha podido eliminar la rutina
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

            console.log('rutina eliminado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al eliminar la rutina.');
        console.error('error al eliminar rutina:', error.message);
        throw error;
    }
}
