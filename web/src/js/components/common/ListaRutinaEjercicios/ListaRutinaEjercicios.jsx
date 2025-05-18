import EjercicioCard from '@components/ui/EjercicioCard/EjercicioCard';
import { useObtenerEjerciciosRutina } from '@hooks/useEjercicioRutina';

const ListaRutinaCalentamientos = ({ rutina }) => {

    const { ejerciciosRutinaData } = useObtenerEjerciciosRutina(rutina);

    console.log('ejercicios', ejerciciosRutinaData?.ejercicios);

    function obtenerEjercicioCards() {

        // no devuelve nada si aún no ha cargado
        if (!ejerciciosRutinaData?.ejercicios) return null;

        return ejerciciosRutinaData.ejercicios
            .map((ejercicio) => (
                <EjercicioCard 
                    key={ejercicio.id} 
                    nombre={ejercicio.nombre}
                    imagen={ejercicio.imagen}
                    num_series={ejercicio.pivot.num_series}
                    num_repeticiones={ejercicio.pivot.num_repeticiones}
                    grupo_muscular={ejercicio.grupo_muscular.nombre}
                />
            ));
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <div className='row lista-rutina-detalles'>
                    {obtenerEjercicioCards()}
                </div>
            </div>
        </div>
    );

}

export default ListaRutinaCalentamientos;
