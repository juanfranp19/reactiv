import { useParams } from 'react-router-dom';

import ActionsEntrenador from '@components/common/ActionsEntrenador/ActionsEntrenador';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import DatosSocio from '@components/common/DatosSocio/DatosSocio';

import { useObtenerSocios, useObtenerSocio } from '@hooks/useSocio';

const EntrenadorSocioDetalles = () => {

    const { socioId } = useParams();

    const { refresh: refreshAllSociosData } = useObtenerSocios();
    const { socioData, cargando: cargandoSocioData, refresh: refreshSocioData } = useObtenerSocio(socioId);

    if (cargandoSocioData) return 'cargando';

    return (
        <main>
            <DashboardCabecera propLastBC={socioData.nombre}>
                Detalles de {socioData.nombre} {socioData.apellidos}
            </DashboardCabecera>

            <ActionsEntrenador />

            <DatosSocio
                refreshAllSociosData={refreshAllSociosData}
                refreshSocioData={refreshSocioData}
                socioData={socioData}
            />
        </main>
    );
}

export default EntrenadorSocioDetalles;
