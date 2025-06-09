import { useEffect, useState } from 'react';
import { getTaquilla } from '@services/taquillaService';

// hook para obtener datos de una taquilla
export const useObtenerTaquilla = (id) => {

    const [taquillaData, setTaquillaData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerTaquilla = async (id) => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos de la taquilla haciendo petición al servicio
            const serviceResponse = await getTaquilla(id);

            // se guardan los datos de la taquilla
            setTaquillaData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos de la taquilla:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerTaquilla(id);
    }, [id]);

    return ({ taquillaData, cargando });
}
