import { useCallback, useEffect, useState } from 'react';
import { getEjercicios, postEjercicio, getEjercicio, putEjercicio, deleteEjercicio } from '@services/ejercicioService';

// hook para obtener datos de todos los ejercicios
export const useObtenerEjercicios = () => {

    const [ejerciciosData, setEjerciciosData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerEjercicios = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos de los ejercicios haciendo petición al servicio
            const serviceResponse = await getEjercicios();

            // se guardan los datos de los ejercicios
            setEjerciciosData(serviceResponse.data);
            //console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos de los ejercicios:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        obtenerEjercicios();
    }, [obtenerEjercicios]);

    return ({ ejerciciosData, cargando, refresh: obtenerEjercicios });
}

// hook para crear un ejercicio
export const useCrearEjercicio = () => {

    const [cargando, setCargando] = useState('');

    const crearEjercicio = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltor por el servicio de Login
        const serviceResponse = await postEjercicio(formData);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ crearEjercicio, cargando });
}

// hook para obtener datos de un ejercicio
export const useObtenerEjercicio = (id) => {

    const [ejercicioData, setEjercicioData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerEjercicio = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos del ejercicio haciendo petición al servicio
            const serviceResponse = await getEjercicio(id);

            // se guardan los datos del ejercicio
            setEjercicioData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos del ejercicio:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, [id]);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerEjercicio(id);
    }, [id, obtenerEjercicio]);

    return ({ ejercicioData, cargando, refresh: obtenerEjercicio });
}

// hook para actualizar un ejercicio
export const useActualizarEjercicio = () => {

    const [cargando, setCargando] = useState(false);

    const updateEjercicio = async (formData, id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putEjercicio(formData, id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ updateEjercicio, cargando });
}

// hook para eliminar un ejercicio
export const useEliminarEjercicio = () => {

    const [cargando, setCargando] = useState(false);

    const destroyEjercicio = async (id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteEjercicio(id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ destroyEjercicio, cargando });
}
