const API_URL = import.meta.env.VITE_API_URL;
const API_URL_EJERCICIOS = API_URL + '/api/v1/ejercicios';

// servicio para obtener todos los ejercicios
export const getEjercicios = async () => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener los ejercicios
        const response = await fetch(API_URL_EJERCICIOS, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los ejercicios');
            return 0;
        }

        console.log('los ejercicios', data);
        return data;

    } catch (error) {

        console.error('error en getEjercicios: ', error.message);
        throw error;
    }
}
