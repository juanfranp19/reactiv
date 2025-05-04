import { useState } from 'react';
import { postSocio } from '@services/socioService';

export const useCrearSocio = () => {

    const [cargando, setCargando] = useState(null);
    const [error, setError] = useState(null);

    const crearSocio = async (formData) => {

        setCargando(true);
        setError(null);

        try {

            // recoge los datos devueltor por el servicio de Login
            const dataService = await postSocio(formData);

            // devuelve los datos recividos del servicio
            return dataService;

        } catch (error) {

            setError(error.message);
            return 0;

        } finally {

            setCargando(false);
        }
    }

    return ({ crearSocio, cargando, error });
}
