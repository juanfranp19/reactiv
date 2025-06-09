const API_URL = import.meta.env.VITE_API_URL;
const API_URL_TAQUILLAS = API_URL + '/api/v1/taquillas';

// servicio para obtener datos de una taquilla
export const getTaquilla = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener una taquilla
        const response = await fetch(`${API_URL_TAQUILLAS}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos de la taquilla');
            return 0;
        }

        console.log(`datos de la taquilla ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getTaquilla: ', error.message);
        throw error;
    }
}
