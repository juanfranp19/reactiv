const API_URL = import.meta.env.VITE_API_URL;
const API_URL_EJERCICIOS_RUTINAS = API_URL + '/api/v1/ejercicios-rutinas';

// servicio para obtener los ejercicios de una rutina
export const getEjerciciosRutina = async (id) => {

    //const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener los ejercicios de la rutina
        const response = await fetch(`${API_URL_EJERCICIOS_RUTINAS}/${id}`, {
            method: 'GET',
            headers: {
                //'Authorization': `Bearer ${token}`
            }
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los ejercicios de la rutina');
            return 0;
        }

        console.log(`los ejercicios de la rutina ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getEjerciciosRutina: ', error.message);
        throw error;
    }
}
