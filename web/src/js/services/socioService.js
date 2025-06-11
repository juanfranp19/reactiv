import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_SOCIOS = API_URL + '/api/v1/socios';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para obtener datos de todos los socios
export const getSocios = async () => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener todos los socios
        const response = await fetch(API_URL_SOCIOS, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos de los socios');
            return 0;
        }

        console.log(`datos de los socios: `, data);
        return data;

    } catch (error) {

        console.error('error en getSocio: ', error.message);
        throw error;
    }
}

// servicio para crear un socio
export const postSocio = async (data) => {

    try {

        const token = localStorage.getItem('token');
        const formData = new FormData();

        // agrega todos los campos del objeto data al objeto formData,
        // para que el servidor gestione el Objeto de la imagen
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        // envía a la URL de socio los datos del socio por método POST
        const response = await fetch(API_URL_SOCIOS, {
            method: 'POST',
            headers: {
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

            //alert('Socio creado.');
            notyf.success('Socio creado.');

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
        const response = await fetch(`${API_URL_SOCIOS}/${id}`, {
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

// servicio para actualizar un socio
export const putSocio = async (data, id) => {

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
        const response = await fetch(`${API_URL_SOCIOS}/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        // error que sale en pantalla si no se ha podido actualizar el socio
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

            console.log('socio actualizado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al actualizar el socio.');
        console.error('error al actualizar socio:', error.message);
        throw error;
    }
}

// servicio para eliminar un socio
export const deleteSocio = async (id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método DELETE
        const response = await fetch(`${API_URL_SOCIOS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // error que sale en pantalla si no se ha podido eliminar el socio
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

            console.log('socio eliminado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al eliminar el socio.');
        console.error('error al eliminar socio:', error.message);
        throw error;
    }
}
