import { useState } from 'react';
import { loginService } from '@services/authService';

export const useLogin = () => {

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const getToken = async (formData) => {

        setCargando(true);
        setError(null);

        try {

            // recoge los datos devueltor por el servicio de Login
            const dataService = await loginService(formData);

            // guarda el token en el almacenamiento local
            localStorage.setItem('usertoken', dataService.token);

            // devuelve el token
            //return dataService.token;

        } catch (error) {

            setError(error.message || 'Error al iniciar sesión');
            return 0;

        } finally {

            setCargando(false);
        }
    };

    return ({ getToken, cargando, error });
}
