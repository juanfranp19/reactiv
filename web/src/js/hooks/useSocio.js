import { useCallback, useEffect, useState } from 'react';
import { getSocios, postSocio, getSocio, putSocio, deleteSocio } from '@services/socioService';

// hook para obtener datos de todos los socios
export const useObtenerSocios = () => {

    const [sociosData, setSociosData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerSocios = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos de los socios haciendo petición al servicio
            const serviceResponse = await getSocios();

            // se guardan los datos de los socios
            setSociosData(serviceResponse.data);
            //console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos de los socios:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        obtenerSocios();
    }, [obtenerSocios]);

    return ({ sociosData, cargando, refresh: obtenerSocios });
}

// hook para crear un socio
export const useCrearSocio = () => {

    const [cargando, setCargando] = useState('');

    const crearSocio = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltor por el servicio de Login
        const serviceResponse = await postSocio(formData);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ crearSocio, cargando });
}

// hook para obtener datos de un socio
export const useObtenerSocio = (id) => {

    const [socioData, setSocioData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerSocio = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos del socio haciendo petición al servicio
            const serviceResponse = await getSocio(id);

            // se guardan los datos del socio
            setSocioData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos del socio:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, [id]);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerSocio(id);
    }, [id, obtenerSocio]);

    return ({ socioData, cargando, refresh: obtenerSocio });
}

// hook para actualizar un socio
export const useActualizarSocio = () => {

    const [cargando, setCargando] = useState(false);

    const updateSocio = async (formData, id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putSocio(formData, id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ updateSocio, cargando });
}

// hook para eliminar un socio
export const useEliminarSocio = () => {

    const [cargando, setCargando] = useState(false);

    const destroySocio = async (id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteSocio(id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ destroySocio, cargando });
}
