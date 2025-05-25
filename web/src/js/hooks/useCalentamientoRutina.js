import { useEffect, useState } from 'react';
import { getCalentamientosRutina, postCalentamientoRutina } from '@services/calentamientoRutinaService';

// hook para obtener los calentamientos de una rutina
export const useObtenerCalentamientosRutina = (id) => {

    const [calentamientosRutinaData, setCalentamientosRutinaData] = useState([]);
    const [cargando, setCargando] = useState(false);

    const obtenerCalentamientosRutina = async (id) => {

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
    }

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerCalentamientosRutina(id);
    }, [id]);

    return ({ calentamientosRutinaData, cargando });
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
