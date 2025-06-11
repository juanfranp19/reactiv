import { useEffect, useState } from 'react';
import { getUser, putUser } from '@services/userService';

// useCrearUser está en useAuth.js --> useRegister

// hook para obtener datos de un user
export const useObtenerUser = (id) => {

    const [userData, setUserData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerUser = async (id) => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos del user haciendo petición al servicio
            const serviceResponse = await getUser(id);

            // se guardan los datos del user
            setUserData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos del user:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerUser(id);
    }, [id]);

    return ({ userData, cargando });
}

// hook para actualizar un usuario
export const useActualizarUser = () => {

    const [cargando, setCargando] = useState(false);

    const updateUser = async (formData, id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putUser(formData, id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ updateUser, cargando });
}
