import { useEffect, useState } from 'react';

import CalendarSocioTarifas from '@components/common/CalendarSocioTarifas/CalendarSocioTarifas';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import DatosTarifa from '@components/common/DatosTarifa/DatosTarifa';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

import getTodayDate from '@utils/getTodayDate';

const SocioTarifa = () => {

    const { socioId } = useToken();
    const { socioData, cargando: cargandoSocioData } = useObtenerSocio(socioId);

    const [tarifas, setTarifas] = useState([]);

    useEffect(() => {

        // mete todas las tarifas en su estado

        if (!cargandoSocioData) {

            setTarifas(socioData?.tarifas);
        }
    }, [cargandoSocioData, socioData?.tarifas]);

    function obtenerTarifaActual() {

        const tarifaActual = (
            tarifas
                // encuentra la tarifa cuya fecha sea mayor a la de hoy
                ?.find(tarifa => {
                    return tarifa.pivot.fecha_fin > getTodayDate()
                })
        );

        return tarifaActual;
    }

    return (
        <main>
            <DashboardCabecera>
                Tu tarifa actual
            </DashboardCabecera>

            <DatosTarifa tarifa={obtenerTarifaActual()} />

            {/* cabecera sin breadcrumb */}
            <DashboardCabecera breadcrumb={'false'}>
                Tus tarifas pasadas
            </DashboardCabecera>

            <CalendarSocioTarifas
                socioTarifas={tarifas}
                cargando={cargandoSocioData}
            />
        </main>
    );
}

export default SocioTarifa;
