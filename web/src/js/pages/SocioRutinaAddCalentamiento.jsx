import { useNavigate, useParams } from 'react-router-dom';

import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import FormAddCalentamientoRutina from '@components/ui/FormAddCalentamientoRutina/FormAddCalentamientoRutina';

import { useAttachCalentamientoRutina } from '@hooks/useCalentamientoRutina';

const SocioRutinaAddCalentamiento = () => {

    const navigateTo = useNavigate();
    const { rutaIdRutina } = useParams();
    const { attachCalentamientoRutina, cargando } = useAttachCalentamientoRutina();

    //console.log(rutaIdRutina);

    const manejarAddCalentamiento = async (nuevoCalentamiento) => {

        // coge la respuesta de la API
        const respuestaAddCalentamiento = await attachCalentamientoRutina(nuevoCalentamiento, rutaIdRutina);

        // si respuesta de la API, la muestra por la consola
        if (respuestaAddCalentamiento) {

            console.log(respuestaAddCalentamiento);

            // redirije a la ruta donde está los detalles de la rutina a la que le acaba de añadir el calentamiento
            navigateTo(-1);
        }
    }

    return (
        <main>
            <DashboardCabecera>
                Añadir un calentamiento
            </DashboardCabecera>

            <div className='row'>
                <FormAddCalentamientoRutina manejarAddCalentamiento={manejarAddCalentamiento} cargando={cargando} />
            </div>
        </main>
    );
}

export default SocioRutinaAddCalentamiento;
