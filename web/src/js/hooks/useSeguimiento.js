import { useEffect, useState } from 'react';
import { postSeguimiento, getSeguimiento } from '@services/seguimientoService';

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

// hook para obtener datos de un seguimiento
export const useObtenerSeguimiento = (id) => {

    const [seguimientoData, setSeguimientoData] = useState([]); 
    const [cargando, setCargando] = useState('');

    const obtenerSeguimiento = async (id) => {

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
    }

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerSeguimiento(id);
    }, [id]);

    return ({ seguimientoData, cargando });
}
