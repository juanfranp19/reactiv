const API_URL = import.meta.env.VITE_API_URL;
const API_URL_RUTINAS = API_URL + '/api/v1/rutinas';

// servicio para obtener datos de una rutina
export const getRutina = async (id) => {

    //const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener una rutina
        const response = await fetch(`${API_URL_RUTINAS}/${id}`, {
            method: 'GET',
            headers: {
                //'Authorization': `Bearer ${token}`
            }
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos de la rutina');
            return 0;
        }

        console.log(`datos de la rutina ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getRutina: ', error.message);
        throw error;
    }
}
