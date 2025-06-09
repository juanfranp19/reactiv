import CalendarAccesos from '@components/common/CalendarAccesos/CalendarAccesos';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const SocioAccesos = () => {

    const { socioId } = useToken();
    const { socioData, cargando } = useObtenerSocio(socioId);

    return (
        <main>
            <DashboardCabecera>
                Tus accesos
            </DashboardCabecera>

            <CalendarAccesos socioData={socioData} cargando={cargando} />
        </main>
    );
}

export default SocioAccesos;
