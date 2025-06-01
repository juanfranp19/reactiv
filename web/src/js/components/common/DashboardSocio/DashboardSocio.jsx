import DashboardBigCard from '@components/ui/DashboardBigCard/DashboardBigCard';
import DashboardSmallCard from '@components/ui/DashboardSmallCard/DashboardSmallCard';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const DashboardSocio = () => {

    const { id } = useToken();
    const { socioData, cargando } = useObtenerSocio(id);

    return (
        <div className='row'>

            <div className='col-12 col-lg-9'>
                {/* mensaje de bienvenida */}
                <div className='row'>
                    <div className='col-12 subtitulo-dashboard'>
                        <i className='bi bi-file-earmark-person' /> Bienvenid@, {cargando ? 'cargando' : socioData.nombre}
                    </div>
                </div>

                {/* menú de cards del dashboard */}
                <div className='row'>
                    <div className='col-12'>
                        <div className='row dashboard-menu'>

                            <DashboardBigCard linkTo='tus-rutinas'>
                                <div className='col-12'>
                                    Tus Rutinas
                                </div>
                            </DashboardBigCard>

                            <DashboardSmallCard linkTo='accesos' posicion='derecha'>Último acceso</DashboardSmallCard>
                            <DashboardSmallCard linkTo='seguimiento' posicion='izquierda'>Seguimiento</DashboardSmallCard>

                            <DashboardBigCard linkTo='tarifas'>
                                <div className='col-6'>Tarifa actual: nombre_de_la_tarifa</div>
                                <div className='col-6'>Termina en: 20 días</div>
                            </DashboardBigCard>

                            <DashboardSmallCard linkTo='productos' posicion='derecha'>Productos</DashboardSmallCard>
                            <DashboardSmallCard linkTo='taquilla' posicion='izquierda'>Taquillas</DashboardSmallCard>

                        </div>
                    </div>
                </div>
            </div>

            {/* card de los datos del usuario */}
            <div className='col-3 d-none d-lg-block'>
                <div className='row dashboard-menu'>
                    <div className='col-12 datos'>
                        <div className='row'>
                            <div className='col-12'>Tus datos</div>
                            <div className='col-12'>{cargando ? 'cargando' : socioData.nombre} {cargando ? 'cargando' : socioData.apellidos}</div>
                            <div className='col-12'>{cargando ? 'cargando' : socioData.dni}</div>
                            <div className='col-12'>{cargando ? 'cargando' : socioData.fecha_nac}</div>
                            <div className='col-12'>{cargando ? 'cargando' : socioData.email}</div>
                            <div className='col-12'>{cargando ? 'cargando' : socioData.direccion}, {cargando ? 'cargando' : socioData.ciudad}, {cargando ? 'cargando' : socioData.provincia}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DashboardSocio;
