import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import DatosSocio from '@components/common/DatosSocio/DatosSocio';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const SocioMiPerfil = () => {

    const { socioId } = useToken();
    const { socioData, cargando } = useObtenerSocio(socioId);

    if (cargando) return 'Cargando';

    return (
        <main>
            <DashboardCabecera>
                Mi perfil
            </DashboardCabecera>

            <DatosSocio isDisabled socioData={socioData} />
        </main>
    );
}

export default SocioMiPerfil;
