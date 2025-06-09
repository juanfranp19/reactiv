import { useEffect, useState } from 'react';

import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import DatosTaquilla from '@components/common/DatosTaquilla/DatosTaquilla';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const SocioTaquilla = () => {

    const { socioId } = useToken();
    const { socioData, cargando: cargandoSocioData } = useObtenerSocio(socioId);

    const [taquilla, setTaquilla] = useState(null);

    useEffect(() => {

        // mete todas las tarifas en su estado

        if (!cargandoSocioData) {

            setTaquilla(socioData?.taquilla);
        }
    }, [cargandoSocioData, socioData?.taquilla]);

    return (
        <main>
            {
                taquilla ? (

                    // si tiene taquilla
                    <>
                        <DashboardCabecera>
                            Taquilla <span className='reloj'>{cargandoSocioData ? 'Cargando' : taquilla?.id}</span>
                        </DashboardCabecera>

                        {/* todo lo que entra en el cuerpo de la página */}
                        <DatosTaquilla taquilla={taquilla} />
                    </>
                ) : (

                    // si NO tiene taquilla

                    <DashboardCabecera>
                        No tienes taquilla
                    </DashboardCabecera>
                )
            }
        </main>
    );
}

export default SocioTaquilla;
