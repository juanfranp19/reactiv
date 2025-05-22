const API_URL = import.meta.env.VITE_API_URL;
const API_URL_CALENTAMIENTOS = API_URL + '/api/v1/calentamientos';

// servicio para obtener todos los calentamientos
export const getCalentamientos = async () => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener los calentamientos
        const response = await fetch(API_URL_CALENTAMIENTOS, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los calentamientos');
            return 0;
        }

        console.log('los calentamientos', data);
        return data;

    } catch (error) {

        console.error('error en getCalentamientos: ', error.message);
        throw error;
    }
}
