import { useState } from 'react';
import { loginService, logoutService } from '@services/authService';

export const useLogin = () => {

    const [cargando, setCargando] = useState(false);

    const getToken = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio de Login
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

export const useLogout = () => {

    const [cargando, setCargando] = useState(false);

    const logout = async () => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio de Logout
        const dataService = await logoutService();

        //elimina el token del almacenamiento local
        localStorage.removeItem('token');

        //termina de cargar
        setCargando(false);

        return dataService;
    }

    return ({ logout, cargando });
}
