import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_SOCIOS_TARIFAS = API_URL + '/api/v1/socios-tarifas';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para añadir una tarifa a un socio
export const postSocioTarifa = async (data, socio_id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método POST
        const response = await fetch(`${API_URL_SOCIOS_TARIFAS}/${socio_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // error que sale en pantalla si no se ha podido añadir la tarifa
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

            console.log('tarifa añadida: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al añadir la tarifa.');
        console.error('error al añadir tarifa:', error.message);
        throw error;
    }
}

// servicio para actualizar una tarifa a un socio
export const putSocioTarifa = async (data, socio_id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método PUT
        const response = await fetch(`${API_URL_SOCIOS_TARIFAS}/${socio_id}`, {
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

            // mensaje del controlador
            notyf.error(errorData.error);

            return null;

        } else {

            // coge la respuesta de la API
            const okData = await response.json();

            // mensaje del controlador
            notyf.success(okData);

            console.log('tarifa actualizada: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al añadir la tarifa.');
        console.error('error al añadir tarifa:', error.message);
        throw error;
    }
}

// servicio para eliminar una tarifa a un socio
export const deleteSocioTarifa = async (tarifa_id, socio_id, fecha_inicio) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método DELETE
        const response = await fetch(`${API_URL_SOCIOS_TARIFAS}/${socio_id}?tarifa_id=${tarifa_id}&fecha_inicio=${fecha_inicio}`, {
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
