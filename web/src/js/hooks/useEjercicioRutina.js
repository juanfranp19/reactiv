import { useCallback, useEffect, useState } from 'react';
import { getEjerciciosRutina, postEjercicioRutina, putEjercicioRutina, deleteEjercicioRutina } from '@services/ejercicioRutinaService';

// hook para obtener los ejercicios de una rutina
export const useObtenerEjerciciosRutina = (id) => {

    const [ejerciciosRutinaData, setEjerciciosRutinaData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerEjerciciosRutina = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los ejercicios de la rutina haciendo petición al servicio
            const serviceResponse = await getEjerciciosRutina(id);

            // se guardan los ejercicios de la rutina
            setEjerciciosRutinaData(serviceResponse.data);
            console.log(serviceResponse.data);


        } catch (error) {
            console.error('error al obtener los ejercicios de la rutina:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, [id]);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerEjerciciosRutina(id);
    }, [id, obtenerEjerciciosRutina]);

    return ({ ejerciciosRutinaData, cargando, recargar: obtenerEjerciciosRutina });
}

// hook para añadir un ejercicio a una rutina
export const useAttachEjercicioRutina = () => {

    const [cargando, setCargando] = useState(false);

    const attachEjercicioRutina = async (formData, rutina_id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await postEjercicioRutina(formData, rutina_id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ attachEjercicioRutina, cargando });
}

// hook para actualizar un ejercicio a una rutina
export const useActualizarEjercicioRutina = () => {

    const [cargando, setCargando] = useState(false);

    const updateEjercicioRutina = async (formData, rutina_id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putEjercicioRutina(formData, rutina_id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ updateEjercicioRutina, cargando });
}

// hook para eliminar un ejercicio a una rutina
export const useDetachEjercicioRutina = () => {

    const [cargando, setCargando] = useState(false);

    const detachEjercicioRutina = async (formData, rutina_id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteEjercicioRutina(formData, rutina_id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ detachEjercicioRutina, cargando });
}
