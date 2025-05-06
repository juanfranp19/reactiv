import { useState } from 'react';
import { postSocio } from '@services/socioService';

export const useCrearSocio = () => {

    const [cargando, setCargando] = useState(null);

    const crearSocio = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltor por el servicio de Login
        const dataService = await postSocio(formData);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recividos del servicio
        return dataService;
    }

    return ({ crearSocio, cargando });
}
