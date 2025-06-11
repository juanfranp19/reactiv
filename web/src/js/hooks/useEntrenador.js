import { useCallback, useEffect, useState } from 'react';
import { getEntrenadores, postEntrenador, getEntrenador, putEntrenador, deleteEntrenador } from '@services/entrenadorService';

// hook para obtener datos de todos los entrenadores
export const useObtenerEntrenadores = () => {

    const [entrenadoresData, setEntrenadorData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerEntrenadores = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos de los entrenadores haciendo petición al servicio
            const serviceResponse = await getEntrenadores();

            // se guardan los datos de los entrenadores
            setEntrenadorData(serviceResponse.data);
            //console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos de los entrenadores:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        obtenerEntrenadores();
    }, [obtenerEntrenadores]);

    return ({ entrenadoresData, cargando, refresh: obtenerEntrenadores });
}

// hook para crear un entrenador
export const useCrearEntrenador = () => {

    const [cargando, setCargando] = useState('');

    const crearEntrenador = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltor por el servicio de Login
        const serviceResponse = await postEntrenador(formData);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ crearEntrenador, cargando });
}

// hook para obtener datos de un entrenador
export const useObtenerEntrenador = (id) => {

    const [entrenadorData, setEntrenadorData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerEntrenador = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos del entrenador haciendo petición al servicio
            const serviceResponse = await getEntrenador(id);

            // se guardan los datos del entrenador
            setEntrenadorData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos del entrenador:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, [id]);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerEntrenador(id);
    }, [id, obtenerEntrenador]);

    return ({ entrenadorData, cargando, refresh: obtenerEntrenador });
}

// hook para actualizar un entrenador
export const useActualizarEntrenador = () => {

    const [cargando, setCargando] = useState(false);

    const updateEntrenador = async (formData, id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putEntrenador(formData, id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ updateEntrenador, cargando });
}

// hook para eliminar un entrenador
export const useEliminarEntrenador = () => {

    const [cargando, setCargando] = useState(false);

    const destroyEntrenador = async (id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteEntrenador(id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ destroyEntrenador, cargando });
}
