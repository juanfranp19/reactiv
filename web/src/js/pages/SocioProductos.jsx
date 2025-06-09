import { useEffect, useState } from 'react';

import CalendarSocioProductos from '@components/common/CalendarSocioProductos/CalendarSocioProductos';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import ListaSocioProductos from '@components/common/ListaSocioProductos/ListaSocioProductos';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const SocioProductos = () => {

    const { id } = useToken();
    const { socioData, cargando: cargandoSocioData } = useObtenerSocio(id);

    const [productos, setProductos] = useState([]);

    useEffect(() => {

        // mete todas los productos en su estado

        if (!cargandoSocioData) {

            setProductos(socioData?.productos);
        }
    }, [cargandoSocioData, socioData?.productos]);

    return (
        <main>
            <DashboardCabecera>
                Tus productos
            </DashboardCabecera>

            <ListaSocioProductos productos={productos} />

            <CalendarSocioProductos
                cargando={cargandoSocioData}
                socioProductos={productos}
            />
        </main>
    );
}

export default SocioProductos;
