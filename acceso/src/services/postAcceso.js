const API_URL_ACCESOS = import.meta.env.VITE_API_URL_ACCESOS;

import useNotyf from '@hooks/useNotyf.js';
const { notifySuccess, notifyError } = useNotyf();

const postAcceso = async (data) => {

    try {

        // envía a la URL de accesos los datos del acceso por método POST
        const response = await fetch(API_URL_ACCESOS, {
            method: 'POST',
            body: data,
        });

        // error que sale en pantalla si no se ha podido crear el acceso
        if (!response.ok) {

            const errorData = await response.json();
            console.error('Error del servidor:', errorData);
            notifyError(errorData.error);
            return 0;

        } else {

            // coge la respuesta de la API
            const data = await response.json();
            notifySuccess('Has accedido');
            console.log('acceso creado: ', data);
            return data;
        }

    } catch (error) {

        console.error('error al crear acceso:', error.message);
        throw error;
    }
}

export default postAcceso;
