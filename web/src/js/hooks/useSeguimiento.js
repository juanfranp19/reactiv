import { useState } from 'react';
import { postSeguimiento } from '@services/seguimientoService';

// hook para crear un seguimiento
export const useCrearSeguimiento = () => {

    const [cargando, setCargando] = useState('');

    const crearSeguimiento = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await postSeguimiento(formData);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recividos del servicio
        return serviceResponse;
    }

    return ({ crearSeguimiento, cargando });
}
