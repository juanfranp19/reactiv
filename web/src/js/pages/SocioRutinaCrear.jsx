import { useNavigate } from 'react-router-dom';
import FormCrearRutina from '@components/ui/FormCrearRutina/FormCrearRutina';
import { useCrearRutina } from '@hooks/useRutina';

const SocioRutinaCrear = () => {

    const navigateTo = useNavigate();
    const { crearRutina, cargando } = useCrearRutina();

    const manejarCrearRutina = async (nuevaRutina) => {

        // hace petición a la API desde el hook con los datos de la nueva rutina
        const respuestaCrearRutina = await crearRutina(nuevaRutina);

        // si ha obtenido respuesta 201, lo muestra por consola
        if (respuestaCrearRutina) {

            console.log('rutina creada', respuestaCrearRutina);

            // obtiene el id de la rutina que se acaba de crear
            const idNuevaRutinaCreada = respuestaCrearRutina.data.id;

            // redirije a la página de la nueva rutina
            navigateTo(`/dashboard/tus-rutinas/${idNuevaRutinaCreada}`);
        }
    }

    return (
        <main>
            <div className='row'>
                <FormCrearRutina manejarCrearRutina={manejarCrearRutina} cargando={cargando} />
            </div>
        </main>
    );
}

export default SocioRutinaCrear;
