import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_EJERCICIOS = API_URL + '/api/v1/ejercicios';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para obtener datos de todos los ejercicios
export const getEjercicios = async () => {

    //const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener todos los ejercicios
        const response = await fetch(API_URL_EJERCICIOS, {
            method: 'GET',
            headers: {
                //Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos de los ejercicios');
            return 0;
        }

        console.log(`datos de los ejercicios: `, data);
        return data;

    } catch (error) {

        console.error('error en getEjercicio: ', error.message);
        throw error;
    }
}

// servicio para crear un ejercicio
export const postEjercicio = async (data) => {

    try {

        const token = localStorage.getItem('token');
        const formData = new FormData();

        // agrega todos los campos del objeto data al objeto formData,
        // para que el servidor gestione el Objeto de la imagen
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        // envía a la URL de ejercicio los datos del ejercicio por método POST
        const response = await fetch(API_URL_EJERCICIOS, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        // error que sale en pantalla si no se ha podido crear el ejercicio
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

            //alert('Ejercicio creado.');
            notyf.success('Ejercicio creado.');

            console.log('ejercicio creado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al crear el ejercicio.');
        console.error('error al crear ejercicio:', error.message);
        throw error;
    }
}

// servicio para obtener datos de un ejercicio
export const getEjercicio = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener un ejercicio
        const response = await fetch(`${API_URL_EJERCICIOS}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos del ejercicio');
            return 0;
        }

        console.log(`datos del ejercicio ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getEjercicio: ', error.message);
        throw error;
    }
}

// servicio para actualizar un ejercicio
export const putEjercicio = async (data, id) => {

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
        const response = await fetch(`${API_URL_EJERCICIOS}/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        // error que sale en pantalla si no se ha podido actualizar el ejercicio
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

            console.log('ejercicio actualizado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al actualizar el ejercicio.');
        console.error('error al actualizar ejercicio:', error.message);
        throw error;
    }
}

// servicio para eliminar un ejercicio
export const deleteEjercicio = async (id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método DELETE
        const response = await fetch(`${API_URL_EJERCICIOS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // error que sale en pantalla si no se ha podido eliminar el ejercicio
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

            console.log('ejercicio eliminado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al eliminar el ejercicio.');
        console.error('error al eliminar ejercicio:', error.message);
        throw error;
    }
}
