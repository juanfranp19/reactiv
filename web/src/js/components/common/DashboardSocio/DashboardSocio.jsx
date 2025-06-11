import DashboardBigCard from '@components/ui/DashboardBigCard/DashboardBigCard';
import DashboardSmallCard from '@components/ui/DashboardSmallCard/DashboardSmallCard';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

import getTodayDate from '@utils/getTodayDate';

const DashboardSocio = () => {

    const { socioId } = useToken();
    const { socioData, cargando } = useObtenerSocio(socioId);

    function carcularTiempoRestanteTarifa() {
        // obtener la fecha de hoy y la fecha fin de la tarifa
        // convertidas en objeto Date para hacer cálculos con ellas

        const fecha_hoy = new Date(getTodayDate());
        const fecha_fin_tarifa = new Date(obtenerTarifaActual()?.pivot.fecha_fin);

        // calcular diferencia, nos devuelve milisegundos
        const diferenciaFechas = fecha_fin_tarifa - fecha_hoy;

        // pasar a horas y días:
        // los milisegundos se dividen entre 1000 milisegundos que son un segundo,
        // por 60 segundos que son un minuto,
        // por 60 minutos que son una hora,
        // por 24 horas que son un día
        const horasRestantes = diferenciaFechas / (1000 * 60 * 60);
        const diasRestantes = diferenciaFechas / (1000 * 60 * 60 * 24);

        // si falta menos de un día para finalizar la tarifa, muestra las horas restantes
        if (diasRestantes < 1) return `${horasRestantes} horas`;

        return `${diasRestantes} días`;
    }

    function obtenerTarifaActual() {

        const tarifaActual = (
            socioData?.tarifas
                // encuentra la tarifa cuya fecha sea mayor a la de hoy
                ?.find(tarifa => {
                    return tarifa.pivot.fecha_fin > getTodayDate()
                })
        );

        return tarifaActual;
    }

    return (
        <div className='row'>

            <div className='col-12'>
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

                            <DashboardSmallCard linkTo='tus-accesos' posicion='derecha'>Accesos</DashboardSmallCard>
                            <DashboardSmallCard linkTo='seguimiento' posicion='izquierda'>Seguimiento</DashboardSmallCard>

                            <DashboardBigCard linkTo='tu-tarifa'>
                                {
                                    cargando ? (
                                        <div className="col-12">Cargando</div>
                                    ) : (
                                        // comprueba si tiene tarifa en curso
                                        obtenerTarifaActual() ? (
                                            <>
                                                <div className='col-6'>Tarifa actual: {obtenerTarifaActual()?.nombre}</div>
                                                <div className='col-6'>Termina en: <span className="reloj">{carcularTiempoRestanteTarifa()}</span></div>
                                            </>
                                        ) : (
                                            <div className="col-12">No tienes tarifa actualmente</div>
                                        )
                                    )
                                }
                            </DashboardBigCard>

                            <DashboardSmallCard linkTo='tus-productos' posicion='derecha'>Productos</DashboardSmallCard>

                            <DashboardSmallCard linkTo='tu-taquilla' posicion='izquierda'>
                                {
                                    cargando ? (
                                        'Cargando...'
                                    ) : (
                                        // comprueba si tiene taquilla asignada
                                        socioData.taquilla ? (

                                            // muestra el número de taquilla
                                            <>Taquilla <span className="reloj">{socioData.taquilla.id}</span></>
                                        ) : (
                                            'No tienes taquilla'
                                        )
                                    )
                                }
                            </DashboardSmallCard>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DashboardSocio;
