import { useState } from 'react';
import { postSocioTarifa, putSocioTarifa, deleteSocioTarifa } from '@services/socioTarifaService';

// hook para añadir una tarifa a un socio
export const useAttachSocioTarifa = () => {

    const [cargando, setCargando] = useState(false);

    const attachSocioTarifa = async (formData, socio_id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await postSocioTarifa(formData, socio_id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ attachSocioTarifa, cargando });
}

// hook para actualizar una tarifa a un socio
export const useActualizarSocioTarifa = () => {

    const [cargando, setCargando] = useState(false);

    const updateSocioTarifa = async (formData, socio_id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putSocioTarifa(formData, socio_id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ updateSocioTarifa, cargando });
}

// hook para eliminar una tarifa a un socio
export const useDetachSocioTarifa = () => {

    const [cargando, setCargando] = useState(false);

    const detachSocioTarifa = async (tarifa_id, socio_id, fecha_inicio) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteSocioTarifa(tarifa_id, socio_id, fecha_inicio);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ detachSocioTarifa, cargando });
}
