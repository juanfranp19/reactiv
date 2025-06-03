import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_EJERCICIOS_SEGUIMIENTOS = API_URL + '/api/v1/ejercicios-seguimientos';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para obtener los ejercicios de un seguimiento
export const getEjerciciosSeguimiento = async (seguimiento_id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener los ejercicios del seguimiento
        const response = await fetch(`${API_URL_EJERCICIOS_SEGUIMIENTOS}/${seguimiento_id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los ejercicios del seguimiento');
            return 0;
        }

        console.log(`los ejercicios del seguimiento ${seguimiento_id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getEjerciciosSeguimiento: ', error.message);
        throw error;
    }
}

// servicio para añadir un ejercicio a un seguimiento
export const postEjercicioSeguimiento = async (data, rutina_id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método POST
        const response = await fetch(`${API_URL_EJERCICIOS_SEGUIMIENTOS}/${rutina_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // error que sale en pantalla si no se ha podido añadir el ejercicio
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

            console.log('ejercicio añadido: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al añadir el ejercicio.');
        console.error('error al añadir ejercicio:', error.message);
        throw error;
    }
}

// servicio para eliminar un ejercicio a un seguimiento
export const deleteEjercicioSeguimiento = async (data, rutina_id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método DELETE
        const response = await fetch(`${API_URL_EJERCICIOS_SEGUIMIENTOS}/${rutina_id}?ejercicio_id=${data}`, {
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
