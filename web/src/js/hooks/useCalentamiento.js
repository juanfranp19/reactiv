import { useEffect, useState } from 'react';
import { getCalentamientos } from '@services/calentamientoService';

// hook para obtener todos los calentamientos
export const useObtenerCalentamientos = () => {

    const [calentamientosData, setCalentamientosData] = useState([]); 
    const [cargando, setCargando] = useState('');

    const obtenerCalentamientos = async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los calentamientos haciendo petición al servicio
            const serviceResponse = await getCalentamientos();
            
            // se guardan los calentamientos
            setCalentamientosData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los calentamientos:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }

    useEffect(() => {
        obtenerCalentamientos();
    }, []);

    return ({ calentamientosData, cargando });
}
