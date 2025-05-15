import { useEffect, useState } from 'react';
import { getRutina } from '@services/rutinaService';

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
