import { useEffect, useState } from 'react';
import { getEjerciciosRutina } from '@services/ejercicioRutinaService';

// hook para obtener los ejercicios de una rutina
export const useObtenerEjerciciosRutina = (id) => {

    const [ejerciciosRutinaData, setEjerciciosRutinaData] = useState([]); 
    const [cargando, setCargando] = useState('');

    const obtenerEjerciciosRutina = async (id) => {

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
    }

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerEjerciciosRutina(id);
    }, [id]);

    return ({ ejerciciosRutinaData, cargando });
}
