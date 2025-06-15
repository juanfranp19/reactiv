import { useCallback, useEffect, useState } from 'react';
import { getTarifas, postTarifa, getTarifa, putTarifa, deleteTarifa } from '@services/tarifaService';

// hook para obtener datos de todas las tarifas
export const useObtenerTarifas = () => {

    const [tarifasData, setTarifasData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerTarifas = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos de los tarifas haciendo petición al servicio
            const serviceResponse = await getTarifas();

            // se guardan los datos de las tarifas
            setTarifasData(serviceResponse.data);
            //console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos de las tarifas:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        obtenerTarifas();
    }, [obtenerTarifas]);

    return ({ tarifasData, cargando, refresh: obtenerTarifas });
}


// hook para crear una tarifa
export const useCrearTarifa = () => {

    const [cargando, setCargando] = useState('');

    const crearTarifa = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await postTarifa(formData);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ crearTarifa, cargando });
}

// hook para obtener datos de una tarifa
export const useObtenerTarifa = (id) => {

    const [tarifaData, setTarifaData] = useState([]); 
    const [cargando, setCargando] = useState('');

    const obtenerTarifa = async (id) => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos de la tarifa haciendo petición al servicio
            const serviceResponse = await getTarifa(id);
            
            // se guardan los datos de la tarifa
            setTarifaData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos de la tarifa:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerTarifa(id);
    }, [id]);

    return ({ tarifaData, cargando });
}

// hook para actualizar una tarifa
export const useActualizarTarifa = () => {

    const [cargando, setCargando] = useState(false);

    const updateTarifa = async (formData, id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putTarifa(formData, id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ updateTarifa, cargando });
}

// hook para eliminar una tarifa
export const useEliminarTarifa = () => {

    const [cargando, setCargando] = useState(false);

    const destroyTarifa = async (id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteTarifa(id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ destroyTarifa, cargando });
}
