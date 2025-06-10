import { useParams } from 'react-router-dom';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import { useObtenerSocio } from '@hooks/useSocio';

const EntrenadorSocioDetalles = () => {

    const { socioId } = useParams();

    const { socioData, cargando: cargandoSocioData } = useObtenerSocio(socioId);

    return (
        <main>
            <DashboardCabecera propLastBC={cargandoSocioData ? 'Cargando...' : socioData.nombre}>
                Socios registrados
            </DashboardCabecera>

        </main>
    );
}

export default EntrenadorSocioDetalles;
