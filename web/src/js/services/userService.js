const API_URL = import.meta.env.VITE_API_URL;
const API_URL_USERS = API_URL + '/api/v1/users';

// servicio para obtener datos de un user
export const getUser = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener un user
        const response = await fetch(`${API_URL_USERS}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos del user');
            return 0;
        }

        console.log(`datos del user ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getUser: ', error.message);
        throw error;
    }
}
