import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_LOGIN = API_URL + '/api/login';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

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

            notyf.error('Acceso inválido.');
            console.error(data.message || 'error al iniciar sesión');
            return 0;
        }

        notyf.success('Has iniciado sesión.');
        console.log('sesión iniciada: ', data);
        return data;

    } catch (error) {

        console.error('error en login:', error.message);
        throw error;
    }
}
