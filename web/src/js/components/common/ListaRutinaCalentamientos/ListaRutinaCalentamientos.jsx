import CalentamientoCard from '@components/ui/CalentamientoCard/CalentamientoCard';
import { useObtenerCalentamientosRutina } from '@hooks/useCalentamientoRutina';

const ListaRutinaCalentamientos = ({ rutina }) => {

    const { calentamientosRutinaData } = useObtenerCalentamientosRutina(rutina);

    console.log('calentamientos', calentamientosRutinaData?.calentamientos);

    function obtenerCalentamientoCards() {

        // no devuelve nada si aún no ha cargado
        if (!calentamientosRutinaData?.calentamientos) return null;

        return calentamientosRutinaData.calentamientos
            .map((calentamiento) => (
                <CalentamientoCard key={calentamiento.id} nombre={calentamiento.nombre} tiempo={calentamiento.pivot.tiempo} />
            ));
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <div className='row lista-calentamientos'>
                    {obtenerCalentamientoCards()}
                </div>
            </div>
        </div>
    );

}

export default ListaRutinaCalentamientos;
