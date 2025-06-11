import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_ENTRENADORES = API_URL + '/api/v1/entrenadores';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para obtener datos de todos los entrenadores
export const getEntrenadores = async () => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener todos los entrenadores
        const response = await fetch(API_URL_ENTRENADORES, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos de los entrenadores');
            return 0;
        }

        console.log(`datos de los entrenadores: `, data);
        return data;

    } catch (error) {

        console.error('error en getEntrenadores: ', error.message);
        throw error;
    }
}

// servicio para crear un entrenador
export const postEntrenador = async (data) => {

    try {

        const token = localStorage.getItem('token');
        const formData = new FormData();

        // agrega todos los campos del objeto data al objeto formData,
        // para que el servidor gestione el Objeto de la imagen
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        // envía a la URL de entrenador los datos del entrenador por método POST
        const response = await fetch(API_URL_ENTRENADORES, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        // error que sale en pantalla si no se ha podido crear el entrenador
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

            //alert('Entrenador creado.');
            notyf.success('Entrenador creado.');

            console.log('entrenador creado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al crear el entrenador.');
        console.error('error al crear entrenador:', error.message);
        throw error;
    }
}


// servicio para obtener datos de un entrenador
export const getEntrenador = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener un entrenador
        const response = await fetch(`${API_URL_ENTRENADORES}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos del entrenador');
            return 0;
        }

        console.log(`datos del entrenador ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getEntrenador: ', error.message);
        throw error;
    }
}


// servicio para actualizar un entrenador
export const putEntrenador = async (data, id) => {

    try {

        const token = localStorage.getItem('token');
        const formData = new FormData();

        // agrega todos los campos del objeto data al objeto formData,
        // para que el servidor gestione el Objeto de la imagen
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        // para que Laravel trate la petición como un PUT
        formData.append('_method', 'PUT');

        // envía a la URL los datos por método POST, porque no se pueden tratar imágenes en PUT
        const response = await fetch(`${API_URL_ENTRENADORES}/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        // error que sale en pantalla si no se ha podido actualizar el entrenador
        if (!response.ok) {

            // mensaje de error del servidor
            const errorData = await response.json();
            console.error('Error del servidor:', errorData.erro);

            // mensaje del observer
            notyf.error(errorData.error);

            return null;

        } else {

            // coge la respuesta de la API
            const okData = await response.json();

            notyf.success(okData);

            console.log('entrenador actualizado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al actualizar el entrenador.');
        console.error('error al actualizar entrenador:', error.message);
        throw error;
    }
}

// servicio para eliminar un entrenador
export const deleteEntrenador = async (id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método DELETE
        const response = await fetch(`${API_URL_ENTRENADORES}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // error que sale en pantalla si no se ha podido eliminar el entrenador
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

            console.log('entrenador eliminado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al eliminar el entrenador.');
        console.error('error al eliminar entrenador:', error.message);
        throw error;
    }
}
