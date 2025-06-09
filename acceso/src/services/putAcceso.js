const API_URL_ACCESOS = import.meta.env.VITE_API_URL_ACCESOS;

import useNotyf from '@hooks/useNotyf.js';
const { notifySuccess, notifyError } = useNotyf();

const putAcceso = async (data) => {

    try {

        // envía a la URL de accesos los datos del acceso por método PUT
        const response = await fetch(API_URL_ACCESOS, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
        });

        // error que sale en pantalla si no se ha podido actualizar el acceso
        if (!response.ok) {

            const errorData = await response.json();
            console.error('Error del servidor:', errorData);

            notifyError(errorData.error);

            return 0;

        } else {

            // coge la respuesta de la API
            const data = await response.json();

            notifySuccess('Has salido');

            console.log('acceso actualizado: ', data);
            return data;
        }

    } catch (error) {

        console.error('error al actualizar acceso:', error.message);
        throw error;
    }
}

export default putAcceso;
