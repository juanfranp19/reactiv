import Crear from '@components/common/Crear/Crear';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import ListaRutinas from '@components/common/ListaRutinas/ListaRutinas';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const SocioRutinas = () => {

    const { socioId } = useToken();
    const { socioData, cargando } = useObtenerSocio(socioId);

    return (
        <main>
            <DashboardCabecera>
                Tus rutinas
            </DashboardCabecera>

            <Crear>
                Crear rutina
            </Crear>

            <ListaRutinas socioData={socioData} cargando={cargando} />
        </main>
    );
}

export default SocioRutinas;
