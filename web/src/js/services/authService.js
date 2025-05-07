import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_LOGIN = API_URL + '/api/login';
const API_URL_LOGOUT = API_URL + '/api/logout';
const API_URL_PERMISSIONS = API_URL + '/api/permissions';
const API_URL_USER = API_URL + '/api/user'

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

        console.error('error en login: ', error.message);
        throw error;
    }
}

export const logoutService = async () => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL de logout
        const response = await fetch(API_URL_LOGOUT, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            notyf.error('Error al cerrar sesión.');
            console.error(data.message || 'error al cerrar sesión');
            return 0;
        }

        notyf.success('Has cerrado sesión.');
        console.log('sesión cerrada: ', data);
        return data;

    } catch (error) {

        console.error('error en logout: ', error.message);
        throw error;
    }
}

export const permissionService = async () => {

    try {

        const token = localStorage.getItem('token');

        // envía la URL al servidor
        const response = await fetch(API_URL_PERMISSIONS, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {
            console.error(data.message || 'token no válido');
            return 0;
        }

        console.log('token válido', data);
        return data;

    } catch (error) {

        console.error('error en userService: ', error.message);
        throw error;
    }
}

export const checkAuth = async () => {

    try {

        const token = localStorage.getItem('token');

        // envía la URL al servidor
        const response = await fetch(API_URL_USER, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {
            console.error(data.message || 'token no válido');
            return 0;
        }

        console.log('token válido', data);
        return data;

    } catch (error) {

        console.error('error en userService: ', error.message);
        throw error;
    }
}
