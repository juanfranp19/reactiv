const API_URL = import.meta.env.VITE_API_URL;
const API_URL_ENTRENADORES = API_URL + '/api/v1/entrenadores';

// servicio para obtener datos de un entrenador
export const getEntrenador = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener un entrenador
        const response = await fetch(`${API_URL_ENTRENADORES}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos del entrenador');
            return 0;
        }

        console.log(`datos del entrenador ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getEntrenador: ', error.message);
        throw error;
    }
}
