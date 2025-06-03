import { useCallback, useEffect, useState } from 'react';
import { getEjerciciosSeguimiento, postEjercicioSeguimiento, deleteEjercicioSeguimiento } from '@services/ejercicioSeguimientoService';

// hook para obtener los ejercicios de un seguimiento
export const useObtenerEjerciciosSeguimiento = (id) => {

    const [ejerciciosSeguimientoData, setEjerciciosSeguimientoData] = useState([]);
    const [cargando, setCargando] = useState(false);

    const obtenerEjerciciosSeguimiento = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los ejercicios del seguimiento haciendo petición al servicio
            const serviceResponse = await getEjerciciosSeguimiento(id);

            // se guardan los ejercicios del seguimiento
            setEjerciciosSeguimientoData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los ejercicios del seguimiento:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, [id]);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerEjerciciosSeguimiento(id);
    }, [id, obtenerEjerciciosSeguimiento]); // reinicia los datos al ejecutar recargar

    return ({ ejerciciosSeguimientoData, cargando, recargar: obtenerEjerciciosSeguimiento });
}

// hook para añadir un ejercicio a un seguimiento
export const useAttachEjercicioSeguimiento = () => {

    const [cargando, setCargando] = useState(false);

    const attachEjercicioSeguimiento = async (formData, rutina_id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await postEjercicioSeguimiento(formData, rutina_id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recividos del servicio
        return serviceResponse;
    }

    return ({ attachEjercicioSeguimiento, cargando });
}

// hook para eliminar un ejercicio a un seguimiento
export const useDetachEjercicioSeguimiento = () => {

    const [cargando, setCargando] = useState(false);

    const detachEjercicioSeguimiento = async (formData, rutina_id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteEjercicioSeguimiento(formData, rutina_id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recividos del servicio
        return serviceResponse;
    }

    return ({ detachEjercicioSeguimiento, cargando });
}
