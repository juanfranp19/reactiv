import { useParams } from 'react-router-dom';

import ButtonDelete from '@components/ui/ButtonDelete/ButtonDelete';
import DropdownFormAddSocioTarifa from '@components/ui/DropdownFormAddSocioTarifa/DropdownFormAddSocioTarifa';

import { useDetachSocioTarifa } from '@hooks/useSocioTarifa';

import formatearFechaCorta from '@utils/formatearFechaCorta';

const DatosTarifa = ({ actions, refresh, tarifa }) => {

    const { socioId } = useParams();
    const { detachSocioTarifa, cargando: cargandoDetachSocioTarifa } = useDetachSocioTarifa();

    // función para eliminar la tarifa
    const manejarDetachTarifa = async (tarifa_id, fecha_inicio) => {

        // coge la respuesta de la API
        const respuestaDetachTarifa = await detachSocioTarifa(tarifa_id, socioId, fecha_inicio);

        // si hay respuesta
        if (respuestaDetachTarifa) {
            console.log('tarifa eliminada', respuestaDetachTarifa);
            console.log(tarifa_id);
            // recarga los datos del socio
            refresh();
        }
    }

    return (
        <div className='row'>
            {
                // no hay tarifa actual

                tarifa === undefined ? (
                    <>
                        <div className='col-12 no-datos-tarifa-actual'>
                            <DropdownFormAddSocioTarifa refresh={refresh} />
                        </div>

                        <div className='col-12 no-datos-tarifa-actual'>
                            No hay tarifa actualmente
                        </div>
                    </>
                ) : (
                    <>
                        {
                            // solo con prop actions en true

                            actions && (
                                <div className='col-12 datos-tarifa-actions'>

                                    <ButtonDelete
                                        cargando={cargandoDetachSocioTarifa}
                                        onClick={() => manejarDetachTarifa(tarifa?.id, tarifa?.pivot?.fecha_inicio)}
                                    >
                                        Eliminar tarifa
                                    </ButtonDelete>

                                </div>
                            )
                        }

                        {/* DATOS TARIFA ACTUAL */}

                        <div className='col-12'>
                            <div className='row datos-tarifa-actual'>

                                {/* titulo de la tarifa */}
                                <div className='col-12 titulo'>{tarifa?.nombre}</div>

                                {/* campo descripción */}
                                <div className='col-12 campo'>
                                    <div className='row contenido'>
                                        <div className='col-12 titulo'>Descripción</div>
                                        <div className='col-12 detalle'>{tarifa?.descripcion}</div>
                                    </div>
                                </div>

                                {/* campo duración */}
                                <div className='col-12 col-md-6 campo'>
                                    <div className='row contenido'>
                                        <div className='col-12 titulo'>Duración</div>
                                        <div className='col-12 detalle'>{tarifa?.duracion} días</div>
                                    </div>
                                </div>

                                {/* campo precio */}
                                <div className='col-12 col-md-6 campo'>
                                    <div className='row contenido'>
                                        <div className='col-12 titulo'>Precio</div>
                                        <div className='col-12 detalle'>{tarifa?.precio} €</div>
                                    </div>
                                </div>

                                {
                                    // si existen valores pivot, los muestra
                                    tarifa?.pivot && (
                                        <>
                                            {/* campo fecha de inicio */}
                                            <div className='col-12 col-md-6 campo'>
                                                <div className='row contenido'>
                                                    <div className='col-12 titulo'>Fecha de inicio</div>
                                                    <div className='col-12 detalle'>{formatearFechaCorta(tarifa?.pivot.fecha_inicio)}</div>
                                                </div>
                                            </div>

                                            {/* campo fecha de inicio */}
                                            <div className='col-12 col-md-6 campo'>
                                                <div className='row contenido'>
                                                    <div className='col-12 titulo'>Fecha de fin</div>
                                                    <div className='col-12 detalle'>{formatearFechaCorta(tarifa?.pivot.fecha_fin)}</div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default DatosTarifa;
