import { useCallback, useEffect, useState } from 'react';
import { postSeguimiento, getSeguimiento, putSeguimiento, deleteSeguimiento } from '@services/seguimientoService';

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

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ crearSeguimiento, cargando });
}

// hook para obtener datos de un seguimiento
export const useObtenerSeguimiento = (id) => {

    const [seguimientoData, setSeguimientoData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerSeguimiento = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos del seguimiento haciendo petición al servicio
            const serviceResponse = await getSeguimiento(id);

            // se guardan los datos del seguimiento
            setSeguimientoData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos del seguimiento:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, [id]);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerSeguimiento(id);
    }, [id, obtenerSeguimiento]);

    return ({ seguimientoData, cargando, refresh: obtenerSeguimiento });
}

// hook para actualizar un seguimiento
export const useActualizarSeguimiento = () => {

    const [cargando, setCargando] = useState(false);

    const updateSeguimiento = async (formData, id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putSeguimiento(formData, id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ updateSeguimiento, cargando });
}

// hook para eliminar un seguimiento
export const useEliminarSeguimiento = () => {

    const [cargando, setCargando] = useState(false);

    const destroySeguimiento = async (id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteSeguimiento(id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ destroySeguimiento, cargando });
}
