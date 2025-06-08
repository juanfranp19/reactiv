import formatearFechaCorta from '@utils/formatearFechaCorta';

const DatosTarifa = ({ tarifa }) => {

    return (
        <div className='row'>

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

        </div>
    );
}

export default DatosTarifa;
