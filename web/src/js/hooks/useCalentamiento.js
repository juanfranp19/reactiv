import { useCallback, useEffect, useState } from 'react';
import { getCalentamientos, postCalentamiento, getCalentamiento, putCalentamiento, deleteCalentamiento } from '@services/calentamientoService';

// hook para obtener datos de todos los calentamientos
export const useObtenerCalentamientos = () => {

    const [calentamientosData, setCalentamientosData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerCalentamientos = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos de los calentamientos haciendo petición al servicio
            const serviceResponse = await getCalentamientos();

            // se guardan los datos de los calentamientos
            setCalentamientosData(serviceResponse.data);
            //console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos de los calentamientos:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        obtenerCalentamientos();
    }, [obtenerCalentamientos]);

    return ({ calentamientosData, cargando, refresh: obtenerCalentamientos });
}

// hook para crear un calentamiento
export const useCrearCalentamiento = () => {

    const [cargando, setCargando] = useState('');

    const crearCalentamiento = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltor por el servicio de Login
        const serviceResponse = await postCalentamiento(formData);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ crearCalentamiento, cargando });
}

// hook para obtener datos de un calentamiento
export const useObtenerCalentamiento = (id) => {

    const [calentamientoData, setCalentamientoData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerCalentamiento = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos del calentamiento haciendo petición al servicio
            const serviceResponse = await getCalentamiento(id);

            // se guardan los datos del calentamiento
            setCalentamientoData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos del calentamiento:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, [id]);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerCalentamiento(id);
    }, [id, obtenerCalentamiento]);

    return ({ calentamientoData, cargando, refresh: obtenerCalentamiento });
}

// hook para actualizar un calentamiento
export const useActualizarCalentamiento = () => {

    const [cargando, setCargando] = useState(false);

    const updateCalentamiento = async (formData, id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putCalentamiento(formData, id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ updateCalentamiento, cargando });
}

// hook para eliminar un calentamiento
export const useEliminarCalentamiento = () => {

    const [cargando, setCargando] = useState(false);

    const destroyCalentamiento = async (id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteCalentamiento(id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ destroyCalentamiento, cargando });
}
