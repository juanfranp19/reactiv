import { useParams } from 'react-router-dom';

import CalendarSocioTarifas from '@components/common/CalendarSocioTarifas/CalendarSocioTarifas';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import DatosTarifa from '@components/common/DatosTarifa/DatosTarifa';

import { useObtenerSocio } from '@hooks/useSocio';

import getTodayDate from '@utils/getTodayDate';

const EntrenadorSocioTarifa = () => {

    const { socioId } = useParams();
    const { socioData, cargando, refresh } = useObtenerSocio(socioId);

    function obtenerTarifaActual() {

        const tarifaActual = (
            socioData?.tarifas
                // encuentra la tarifa cuya fecha sea mayor a la de hoy
                ?.find(tarifa => {
                    return tarifa.pivot.fecha_fin > getTodayDate()
                })
        );

        console.log(tarifaActual);

        return tarifaActual;
    }

    if (cargando) return 'cargando';

    return (
        <main>
            <DashboardCabecera>
                Tarifa de {socioData.nombre} {socioData.apellidos}
            </DashboardCabecera>

            <DatosTarifa actions={true} refresh={refresh} tarifa={obtenerTarifaActual()} />

            {/* cabecera sin breadcrumb */}
            <DashboardCabecera breadcrumb={'false'}>
                Historial de tarifas
            </DashboardCabecera>

            <CalendarSocioTarifas
                socioTarifas={socioData.tarifas}
                cargando={cargando}
            />
        </main>
    );
}

export default EntrenadorSocioTarifa;
