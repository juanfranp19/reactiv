import { useState } from 'react';
import { loginService } from '@services/authService';

export const useLogin = () => {

    const [cargando, setCargando] = useState(false);

    const getToken = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltor por el servicio de Login
        const dataService = await loginService(formData);

        // guarda el token en el almacenamiento local
        localStorage.setItem('token', dataService.token);

        // termina de cargar
        setCargando(false);

        // devuelve el token
        return dataService.token;
    }

    return ({ getToken, cargando });
}
