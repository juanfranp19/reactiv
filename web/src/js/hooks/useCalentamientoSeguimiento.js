import { useCallback, useEffect, useState } from 'react';
import { getCalentamientosSeguimiento, postCalentamientoSeguimiento, deleteCalentamientoSeguimiento } from '@services/calentamientoSeguimientoService';

// hook para obtener los calentamientos de un seguimiento
export const useObtenerCalentamientosSeguimiento = (id) => {

    const [calentamientosSeguimientoData, setCalentamientosSeguimientoData] = useState([]);
    const [cargando, setCargando] = useState(false);

    const obtenerCalentamientosSeguimiento = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los calentamientos del seguimiento haciendo petición al servicio
            const serviceResponse = await getCalentamientosSeguimiento(id);

            // se guardan los calentamientos del seguimiento
            setCalentamientosSeguimientoData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los calentamientos del seguimiento:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, [id]);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerCalentamientosSeguimiento(id);
    }, [id, obtenerCalentamientosSeguimiento]); // reinicia los datos al ejecutar recargar

    return ({ calentamientosSeguimientoData, cargando, recargar: obtenerCalentamientosSeguimiento });
}

// hook para añadir un calentamiento a un seguimiento
export const useAttachCalentamientoSeguimiento = () => {

    const [cargando, setCargando] = useState(false);

    const attachCalentamientoSeguimiento = async (formData, seguimiento_id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await postCalentamientoSeguimiento(formData, seguimiento_id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recividos del servicio
        return serviceResponse;
    }

    return ({ attachCalentamientoSeguimiento, cargando });
}

// hook para eliminar un calentamiento a un seguimiento
export const useDetachCalentamientoSeguimiento = () => {

    const [cargando, setCargando] = useState(false);

    const detachCalentamientoSeguimiento = async (formData, seguimiento_id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteCalentamientoSeguimiento(formData, seguimiento_id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recividos del servicio
        return serviceResponse;
    }

    return ({ detachCalentamientoSeguimiento, cargando });
}
