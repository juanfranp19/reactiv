import { useEffect, useState } from 'react';
import { postRutina, getRutina, putRutina, deleteRutina } from '@services/rutinaService';

// hook para crear una rutina
export const useCrearRutina = () => {

    const [cargando, setCargando] = useState('');

    const crearRutina = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await postRutina(formData);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ crearRutina, cargando });
}

// hook para obtener datos de una rutina
export const useObtenerRutina = (id) => {

    const [rutinaData, setRutinaData] = useState([]); 
    const [cargando, setCargando] = useState('');

    const obtenerRutina = async (id) => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos de la rutina haciendo petición al servicio
            const serviceResponse = await getRutina(id);
            
            // se guardan los datos de la rutina
            setRutinaData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos de la rutina:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerRutina(id);
    }, [id]);

    return ({ rutinaData, cargando });
}

// hook para actualizar una rutina
export const useActualizarRutina = () => {

    const [cargando, setCargando] = useState(false);

    const updateRutina = async (formData, id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putRutina(formData, id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ updateRutina, cargando });
}

// hook para eliminar una rutina
export const useEliminarRutina = () => {

    const [cargando, setCargando] = useState(false);

    const destroyRutina = async (id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteRutina(id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ destroyRutina, cargando });
}
