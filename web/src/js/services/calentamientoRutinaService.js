const API_URL = import.meta.env.VITE_API_URL;
const API_URL_CALENTAMIENTOS_RUTINAS = API_URL + '/api/v1/calentamientos-rutinas';

// servicio para obtener los calentamientos de una rutina
export const getCalentamientosRutina = async (id) => {

    //const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener los calentamientos de la rutina
        const response = await fetch(`${API_URL_CALENTAMIENTOS_RUTINAS}/${id}`, {
            method: 'GET',
            headers: {
                //'Authorization': `Bearer ${token}`
            }
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los calentamientos de la rutina');
            return 0;
        }

        console.log(`los calentamientos de la rutina ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getCalentamientosRutina: ', error.message);
        throw error;
    }
}
