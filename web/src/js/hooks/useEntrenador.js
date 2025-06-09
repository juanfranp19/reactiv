import { useCallback, useEffect, useState } from 'react';
import { getEntrenador } from '@services/entrenadorService';

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
