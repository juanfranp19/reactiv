const API_URL = import.meta.env.VITE_API_URL;
const API_URL_GRUPOSMUSCULARES = API_URL + '/api/v1/grupos-musculares';

// servicio para obtener todos los grupos musculares
export const getGruposMusculares = async () => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener los grupos musculares
        const response = await fetch(API_URL_GRUPOSMUSCULARES, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los grupos musculares');
            return 0;
        }

        console.log('los grupos musculares', data);
        return data;

    } catch (error) {

        console.error('error en getGruposMusculares: ', error.message);
        throw error;
    }
}
