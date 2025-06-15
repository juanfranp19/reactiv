import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_TARIFAS = API_URL + '/api/v1/tarifas';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para obtener datos de todas las tarifas
export const getTarifas = async () => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener todos los ejercicios
        const response = await fetch(API_URL_TARIFAS, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos de las tarifas');
            return 0;
        }

        console.log(`datos de las tarifas: `, data);
        return data;

    } catch (error) {

        console.error('error en getTarifas: ', error.message);
        throw error;
    }
}

// servicio para crear una tarifa
export const postTarifa = async (data) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL de tarifa los datos de la tarifa por método POST
        const response = await fetch(API_URL_TARIFAS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // error que sale en pantalla si no se ha podido crear la tarifa
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

            notyf.success('Tarifa creada.');

            console.log('tarifa creada: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al crear la tarifa.');
        console.error('error al crear tarifa:', error.message);
        throw error;
    }
}

// servicio para obtener datos de una tarifa
export const getTarifa = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener una tarifa
        const response = await fetch(`${API_URL_TARIFAS}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos de la tarifa');
            return 0;
        }

        console.log(`datos de la tarifa ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getTarifa: ', error.message);
        throw error;
    }
}

// servicio para actualizar una tarifa
export const putTarifa = async (data, id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método PUT
        const response = await fetch(`${API_URL_TARIFAS}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // error que sale en pantalla si no se ha podido actualizar la tarifa
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

            console.log('tarifa añadida: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al actualizar la tarifa.');
        console.error('error al actualizar tarifa:', error.message);
        throw error;
    }
}

// servicio para eliminar una tarifa
export const deleteTarifa = async (id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método DELETE
        const response = await fetch(`${API_URL_TARIFAS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // error que sale en pantalla si no se ha podido eliminar la tarifa
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

            console.log('tarifa eliminada: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al eliminar la tarifa.');
        console.error('error al eliminar tarifa:', error.message);
        throw error;
    }
}
