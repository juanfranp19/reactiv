import { useEffect, useState } from 'react';
import { getEjercicios } from '@services/ejercicioService';

// hook para obtener todos los ejercicios
export const useObtenerEjercicios = () => {

    const [ejerciciosData, setEjerciciosData] = useState([]); 
    const [cargando, setCargando] = useState('');

    const obtenerEjercicios = async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los ejercicios haciendo petición al servicio
            const serviceResponse = await getEjercicios();
            
            // se guardan los ejercicios
            setEjerciciosData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los ejercicios:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }

    useEffect(() => {
        obtenerEjercicios();
    }, []);

    return ({ ejerciciosData, cargando });
}
