import { useState } from 'react';
import { registerService, loginService, logoutService, permissionService, checkAuth } from '@services/authService';

// hook para registrar un usuario
export const useRegister = () => {

    const [cargando, setCargando] = useState('');

    const register = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await registerService(formData);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ register, cargando });
}

// hook para el login
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

// hook para el logout
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

// hook para obtener los permisos que tiene el usuario autenticado
export const usePermissions = () => {

    const [cargando, setCargando] = useState(true);

    const permissions = async () => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio de permissions
        const dataService = await permissionService();

        // deja de cargar
        setCargando(true);

        return dataService;
    }

    return ({ permissions, cargando });
}

// hook para comprobar si el usuario sigue siendo válido
export const useCheckAuth = () => {

    const user = async () => {

        // llama al servicio y recoge los datos que recibe del servidor
        const dataService = await checkAuth();

        return dataService;
    }

    return ({ user });
}
