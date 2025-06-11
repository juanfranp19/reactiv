import { useParams } from 'react-router-dom';

import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import DatosEntrenador from '@components/common/DatosEntrenador/DatosEntrenador';

import { useObtenerEntrenadores, useObtenerEntrenador } from '@hooks/useEntrenador';

const EntrenadorEntrenadorDetalles = () => {

    const { entrenadorId } = useParams();

    const { refresh: refreshAllEntrenadoresData } = useObtenerEntrenadores();
    const { entrenadorData, cargando: cargandoEntrenadorData, refresh: refreshEntrenadorData } = useObtenerEntrenador(entrenadorId);

    if (cargandoEntrenadorData) return 'cargando';

    return (
        <main>
            <DashboardCabecera propLastBC={entrenadorData.nombre}>
                Detalles de {entrenadorData.nombre} {entrenadorData.apellidos}
            </DashboardCabecera>

            <DatosEntrenador
                refreshAllEntrenadoresData={refreshAllEntrenadoresData}
                refreshEntrenadorData={refreshEntrenadorData}
                entrenadorData={entrenadorData}
            />
        </main>
    );
}

export default EntrenadorEntrenadorDetalles;
