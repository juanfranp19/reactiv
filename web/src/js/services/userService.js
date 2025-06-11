import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_USERS = API_URL + '/api/v1/users';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// postUser está en authService.js --> registerService

// servicio para obtener datos de un user
export const getUser = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener un user
        const response = await fetch(`${API_URL_USERS}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos del user');
            return 0;
        }

        console.log(`datos del user ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getUser: ', error.message);
        throw error;
    }
}

// servicio para actualizar un usuario
export const putUser = async (data, id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método PUT
        const response = await fetch(`${API_URL_USERS}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // error que sale en pantalla si no se ha podido actualizar el user
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

            console.log('user añadido: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al actualizar el user.');
        console.error('error al actualizar user:', error.message);
        throw error;
    }
}
