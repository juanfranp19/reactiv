import RutinaCard from '@components/ui/RutinaCard/RutinaCard';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const ListaRutinas = () => {

    const { id } = useToken();
    const { socioData } = useObtenerSocio(id);

    const obtenerListado = () => {

        // si no hay rutinas, devuelve mensaje
        if (!socioData?.rutinas?.length) return (
            <div className="row">
                No hay rutinas
            </div>
        );

        // crea un componente por cada rutina que tenga el socio
        return socioData.rutinas.map((rutina) => (
            <RutinaCard key={rutina.id} id={rutina.id} nombre={rutina.nombre} descripcion={rutina.descripcion} />
        ));
    }

    return (
        <div className='row'>
            {obtenerListado()}
        </div>
    );
}

export default ListaRutinas;
