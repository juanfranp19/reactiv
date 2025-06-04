import { useCallback, useEffect, useState } from 'react';
import { postSocio, getSocio } from '@services/socioService';

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

        // devuelve los datos recividos del servicio
        return serviceResponse;
    }

    return ({ crearSocio, cargando });
}

// hook para obtener datos de un socio
export const useObtenerSocio = (id) => {

    const [socioData, setSocioData] = useState([]); 
    const [cargando, setCargando] = useState('');

    const obtenerSocio = useCallback( async () => {

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
