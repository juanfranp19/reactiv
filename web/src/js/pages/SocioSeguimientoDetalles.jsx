import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import DatosSeguimiento from '@components/common/DatosSeguimiento/DatosSeguimiento';
import ListaSeguimientoCalentamientos from '@components/common/ListaSeguimientoCalentamientos/ListaSeguimientoCalentamientos';
import ListaSeguimientoEjercicios from '@components/common/ListaSeguimientoEjercicios/ListaSeguimientoEjercicios';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

import formatearFechaCorta from '@utils/formatearFechaCorta';
import formatearFechaLarga from '@utils/formatearFechaLarga';

const SocioSeguimientoDetalles = () => {

    const navigateTo = useNavigate();
    const { rutaIdSeguimiento } = useParams();
    const { id } = useToken();
    const { socioData, cargando } = useObtenerSocio(id);

    const [idSeguimiento, setIdSeguimiento] = useState(null);
    const [fechaSeguimiento, setFechaSeguimiento] = useState(null);

    // useCallback para funciones que luego se pasan a componentes hijos que memorizan datos,
    // por ejemplo: idSeguimiento, que se obtiene aquí dentro y luego pasa a un componente hijo
    const obtenerSeguimientoId = useCallback(() => {

        if (Array.isArray(socioData?.seguimientos)) {

            // encuentra el seguimiento por el nombre de la ruta
            const encontrarSeguimiento = socioData.seguimientos.find(
                (seguimiento) => (seguimiento.id === +rutaIdSeguimiento)
            );

            if (encontrarSeguimiento) {
                // añade al estado el id del seguimiento encontrado
                setIdSeguimiento(encontrarSeguimiento.id);
            } else {
                // si el seguimiento no lo encuentra en el socio, redirije a la ruta anterior
                navigateTo('/dashboard/seguimiento');
            }
        }
    }, [navigateTo, rutaIdSeguimiento, socioData]);

    useEffect(obtenerSeguimientoId, [obtenerSeguimientoId]);

    if (cargando || !idSeguimiento) return (
        <div className='row'>cargando</div>
    );

    console.log(rutaIdSeguimiento);

    return (
        <main>
            <div className='row'>
                <div className='col-12 d-md-none'>
                    <DashboardCabecera propLastBC='Detalles'>
                        Seguimiento <span className='destacado'>{formatearFechaCorta(fechaSeguimiento)}</span>
                    </DashboardCabecera>
                </div>

                <div className='col-12 d-none d-md-block'>
                    <DashboardCabecera propLastBC='Detalles'>
                        Seguimiento <span className='destacado'>{formatearFechaLarga(fechaSeguimiento)}</span>
                    </DashboardCabecera>
                </div>
            </div>

            {/* componente donde se trabajan datos de la tabla de seguimientos */}
            <DatosSeguimiento setFechaSeguimiento={setFechaSeguimiento} idSeguimiento={idSeguimiento} />

            {/* componentes donde se trabajan datos de las tablas de calentamientos_seguimientos y ejercicios_seguimientos */}
            <ListaSeguimientoCalentamientos seguimiento={idSeguimiento} />
            <ListaSeguimientoEjercicios seguimiento={idSeguimiento} />
        </main>
    );
}

export default SocioSeguimientoDetalles;
