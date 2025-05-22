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
            
            console.log('rutina creada');

            // redirije a la página donde están todas las rutinas del socio
            navigateTo('/dashboard/tus-rutinas');
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
