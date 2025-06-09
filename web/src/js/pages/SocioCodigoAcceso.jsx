import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import DatosCodigoAcceso from '@components/common/DatosCodigoAcceso/DatosCodigoAcceso';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const SocioCodigoAcceso = () => {

    const { socioId } = useToken();
    const { socioData, cargando } = useObtenerSocio(socioId);

    return (
        <main>
            <DashboardCabecera>
                Este es tu código de acceso
            </DashboardCabecera>

            <DatosCodigoAcceso socioData={socioData} cargando={cargando} />
        </main>
    );
}

export default SocioCodigoAcceso;
