import { useEffect, useState } from 'react';
import { getGruposMusculares } from '@services/grupoMuscularService';

// hook para obtener todos los grupos musculares
export const useObtenerGruposMusculares = () => {

    const [gruposMuscularesData, setGruposMuscularesData] = useState([]); 
    const [cargando, setCargando] = useState('');

    const obtenerGruposMusculares = async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los grupos musculares haciendo petición al servicio
            const serviceResponse = await getGruposMusculares();
            
            // se guardan los grupos musculares
            setGruposMuscularesData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los grupos musculares:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }

    useEffect(() => {
        obtenerGruposMusculares();
    }, []);

    return ({ gruposMuscularesData, cargando });
}
