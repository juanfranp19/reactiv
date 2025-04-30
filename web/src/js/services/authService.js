const API_URL = import.meta.env.VITE_API_URL;
const API_URL_LOGIN = API_URL + '/api/login';

export const loginService = async (formData) => {

    try {

        // envía a la URL de login las credenciales del usuario por método POST
        const response = await fetch(API_URL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // coge la respuesta de la API
        const data = await response.json();

        // error que sale en pantalla si no se ha podido iniciar sesión
        if (!response.ok) {
            throw new Error(data.message || 'Error al iniciar sesión');
        }

        console.log('sesión iniciada: ', data);
        return data;

    } catch (error) {

        console.error('error en login:', error.message);
        throw error;
    }
}
