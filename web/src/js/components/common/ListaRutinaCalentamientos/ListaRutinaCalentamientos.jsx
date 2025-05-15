import CalentamientoCard from '@components/ui/CalentamientoCard/CalentamientoCard';
import { useObtenerCalentamientosRutina } from '@hooks/useCalentamientoRutina';

const ListaRutinaCalentamientos = ({ rutina }) => {

    const { calentamientosRutinaData } = useObtenerCalentamientosRutina(rutina);
    
    console.log('calentamientos', calentamientosRutinaData.calentamientos);
    // console.log('nombre', calentamientosRutinaData.calentamientos[0].nombre);
    // console.log('descripcion', calentamientosRutinaData.calentamientos[0].descripcion);
    // console.log('imagen', calentamientosRutinaData.calentamientos[0].imagen);
    // console.log('tiempo', calentamientosRutinaData.calentamientos[0].pivot.tiempo);

    function obtenerCalentamientoCards() {

        return calentamientosRutinaData.calentamientos
            .map((calentamiento) => (
                <CalentamientoCard nombre={calentamiento.nombre} tiempo={calentamiento.tiempo} />
            ));
    }
    
    return (
        <div className='row'>
            <div className='col-12'>
                <div className='row'>
                    {obtenerCalentamientoCards()}
                </div>
            </div>
        </div>
    );

}

export default ListaRutinaCalentamientos;
