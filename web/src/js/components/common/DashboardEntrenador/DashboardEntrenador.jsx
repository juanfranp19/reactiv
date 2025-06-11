import DashboardBigCard from '@components/ui/DashboardBigCard/DashboardBigCard';
import DashboardSmallCard from '@components/ui/DashboardSmallCard/DashboardSmallCard';

import { useObtenerEntrenadores, useObtenerEntrenador } from '@hooks/useEntrenador';
import { useObtenerSocios } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const DashboardEntrenador = () => {

    const { entrenadorId } = useToken();
    const { entrenadoresData, cargando: cargandoEntrenadoresData } = useObtenerEntrenadores();
    const { entrenadorData, cargando: cargandoEntrenadorData } = useObtenerEntrenador(entrenadorId);
    const { sociosData, cargando: cargandoSociosData } = useObtenerSocios();

    return (
        <div className='row'>
            <div className='col-12'>
                {/* mensaje de bienvenida */}
                <div className='row'>
                    <div className='col-12 subtitulo-dashboard'>
                        <i className='bi bi-file-earmark-person' /> Bienvenid@, {cargandoEntrenadorData ? 'cargando' : entrenadorData.nombre}
                    </div>
                </div>

                {/* menú de cards del dashboard */}
                <div className='row'>
                    <div className='col-12'>
                        <div className='row dashboard-menu'>

                            {/* socios */}

                            <DashboardBigCard linkTo='socios'>
                                <div className='col-12'>
                                    Socios registrados
                                </div>
                                <div className='col-12 reloj'>
                                    Nº socios: {cargandoSociosData ? 'cargando...' : sociosData.length}
                                </div>
                            </DashboardBigCard>

                            {/* productos */}

                            <DashboardSmallCard linkTo='productos' posicion='derecha'>Productos</DashboardSmallCard>

                            {/* entrenadores */}

                            <DashboardBigCard linkTo='entrenadores'>
                                <div className='col-12'>
                                    Entrenadores registrados
                                </div>
                                <div className='col-12 reloj'>
                                    Nº entrenadores: {cargandoEntrenadoresData ? 'cargando...' : entrenadoresData.length}
                                </div>
                            </DashboardBigCard>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardEntrenador;
