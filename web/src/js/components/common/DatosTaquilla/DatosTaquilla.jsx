import { useObtenerTaquilla } from '@hooks/useTaquilla';

import formatearFechaLarga from '@utils/formatearFechaLarga';
import formatearFechaCorta from '@utils/formatearFechaCorta';

const DatosTaquilla = ({ taquilla }) => {

    const { taquillaData, cargando: cargandoTaquillaData } = useObtenerTaquilla(taquilla?.id);

    console.log(taquillaData);

    return (
        <div className='row datos-taquilla'>

            {/* muestra la fecha a la que se afianzó la taquilla al socio */}

            <div className='col-12 fecha-fianza'>
                <span className='destacado'>Fecha de fianza: </span>

                {/* aparece fecha en formato corto solo en móvil */}
                <span className='fecha d-sm-none'>{formatearFechaCorta(taquilla.fecha_fianza)}</span>

                {/* aparece fecha en formato corto a partir de sm */}
                <span className='fecha d-none d-sm-inline'>{formatearFechaLarga(taquilla.fecha_fianza)}</span>
            </div>

            {/* muestra el nombre del socio */}

            <div className='col-12 socio'>
                {
                    cargandoTaquillaData ? (
                        'Cargando'
                    ) : (<>
                        <span className='destacado'>Socio afianzado: </span>{taquillaData?.socio?.nombre} {taquillaData?.socio?.apellidos}
                    </>)
                }
            </div>

            {/* muestra la fianza */}

            <div className='col-12'>
                {
                    cargandoTaquillaData ? (
                        'Cargando'
                    ) : (<>
                        <span className='destacado'>Fianza: </span>{taquillaData?.fianza} €
                    </>)
                }
            </div>

        </div>
    );
}

export default DatosTaquilla;
