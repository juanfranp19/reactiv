import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_CALENTAMIENTOS = API_URL + '/api/v1/calentamientos';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para obtener datos de todos los calentamientos
export const getCalentamientos = async () => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener todos los calentamientos
        const response = await fetch(API_URL_CALENTAMIENTOS, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos de los calentamientos');
            return 0;
        }

        console.log(`datos de los calentamientos: `, data);
        return data;

    } catch (error) {

        console.error('error en getCalentamiento: ', error.message);
        throw error;
    }
}

// servicio para crear un calentamiento
export const postCalentamiento = async (data) => {

    try {

        const token = localStorage.getItem('token');
        const formData = new FormData();

        // agrega todos los campos del objeto data al objeto formData,
        // para que el servidor gestione el Objeto de la imagen
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        // envía a la URL de calentamiento los datos del calentamiento por método POST
        const response = await fetch(API_URL_CALENTAMIENTOS, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        // error que sale en pantalla si no se ha podido crear el calentamiento
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

            //alert('Calentamiento creado.');
            notyf.success('Calentamiento creado.');

            console.log('calentamiento creado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al crear el calentamiento.');
        console.error('error al crear calentamiento:', error.message);
        throw error;
    }
}

// servicio para obtener datos de un calentamiento
export const getCalentamiento = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener un calentamiento
        const response = await fetch(`${API_URL_CALENTAMIENTOS}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos del calentamiento');
            return 0;
        }

        console.log(`datos del calentamiento ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getCalentamiento: ', error.message);
        throw error;
    }
}

// servicio para actualizar un calentamiento
export const putCalentamiento = async (data, id) => {

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
        const response = await fetch(`${API_URL_CALENTAMIENTOS}/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        // error que sale en pantalla si no se ha podido actualizar el calentamiento
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

            console.log('calentamiento actualizado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al actualizar el calentamiento.');
        console.error('error al actualizar calentamiento:', error.message);
        throw error;
    }
}

// servicio para eliminar un calentamiento
export const deleteCalentamiento = async (id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método DELETE
        const response = await fetch(`${API_URL_CALENTAMIENTOS}/${id}`, {
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
