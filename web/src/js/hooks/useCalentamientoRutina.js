import { useCallback, useEffect, useState } from 'react';
import { getCalentamientosRutina, postCalentamientoRutina, putCalentamientoRutina } from '@services/calentamientoRutinaService';

// hook para obtener los calentamientos de una rutina
export const useObtenerCalentamientosRutina = (id) => {

    const [calentamientosRutinaData, setCalentamientosRutinaData] = useState([]);
    const [cargando, setCargando] = useState(false);

    const obtenerCalentamientosRutina = useCallback(async () => {
        
        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los calentamientos de la rutina haciendo petición al servicio
            const serviceResponse = await getCalentamientosRutina(id);

            // se guardan los calentamientos de la rutina
            setCalentamientosRutinaData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los calentamientos de la rutina:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, [id]);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerCalentamientosRutina(id);
    }, [id, obtenerCalentamientosRutina]); // reinicia los datos al ejecutar recargar

    return ({ calentamientosRutinaData, cargando, recargar: obtenerCalentamientosRutina });
}

// hook para añadir un calentamiento a una rutina
export const useAttachCalentamientoRutina = () => {

    const [cargando, setCargando] = useState(false);

    const attachCalentamientoRutina = async (formData, rutina_id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await postCalentamientoRutina(formData, rutina_id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recividos del servicio
        return serviceResponse;
    }

    return ({ attachCalentamientoRutina, cargando });
}

// hook para actualizar un calentamiento a una rutina
export const useActualizarCalentamientoRutina = () => {

    const [cargando, setCargando] = useState(false);

    const updateCalentamientoRutina = async (formData, rutina_id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putCalentamientoRutina(formData, rutina_id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recividos del servicio
        return serviceResponse;
    }

    return ({ updateCalentamientoRutina, cargando });
}
