import FormAddEjercicioRutina from '@components/ui/FormAddEjercicioRutina/FormAddEjercicioRutina';
import { useAttachEjercicioRutina } from '@hooks/useEjercicioRutina';
import { useNavigate, useParams } from 'react-router-dom';

const SocioRutinaAddEjercicio = () => {

    const navigateTo = useNavigate();
    const { rutaIdRutina } = useParams();
    const { attachEjercicioRutina, cargando } = useAttachEjercicioRutina();

    const manejarAddEjercicio = async (nuevoEjercicio) => {

        // coge la respuesta de la API
        const respuestaAddEjercicioRutina = await attachEjercicioRutina(nuevoEjercicio, rutaIdRutina);

        // si respuesta de la API, la muestra por la consola
        if (respuestaAddEjercicioRutina) {

            console.log(respuestaAddEjercicioRutina);

            // redirije a la ruta donde está los detalles de la rutina a la que le acaba de añadir el calentamiento
            navigateTo(`/dashboard/tus-rutinas/${rutaIdRutina}`);
        }
    }

    return (
        <>
            <FormAddEjercicioRutina manejarAddEjercicio={manejarAddEjercicio} cargando={cargando} />
        </>
    );
}

export default SocioRutinaAddEjercicio;
