import { useEffect } from 'react';
import RutinaCard from '@components/ui/RutinaCard/RutinaCard';
import { useObtenerSeguimiento } from '@hooks/useSeguimiento';

const DatosSeguimiento = (props) => {

    const { seguimientoData, cargando } = useObtenerSeguimiento(props.idSeguimiento);

    console.log(seguimientoData);

    // función que le envía la fecha del seguimiento al componente padre, a pages/SocioSeguimientoDetalles.jsx
    function setFecha() {
        props.setFechaSeguimiento(seguimientoData?.fecha);
    }

    useEffect(setFecha, [props, seguimientoData]);

    if (cargando) {
        return <div className='row'>cargando</div>
    }

    return (
        <div className='row'>

            {/* observaciones del seguimiento */}
            <div className='col-12 subtitulo-dashboard'>
                {seguimientoData?.observaciones}
            </div>

            {/* rutina usada en el seguimiento */}
            <div className='col-12'>
                <div className='row'>
                    <RutinaCard
                        id={seguimientoData?.rutina?.id}
                        nombre={seguimientoData?.rutina?.nombre}
                        descripcion={seguimientoData?.rutina?.descripcion}
                    />
                </div>
            </div>

        </div>
    );
}

export default DatosSeguimiento;
