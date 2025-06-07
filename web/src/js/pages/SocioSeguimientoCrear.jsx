import { useLocation, useNavigate } from 'react-router-dom';

import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import FormCrearSeguimiento from '@components/ui/FormCrearSeguimiento/FormCrearSeguimiento';

import { useCrearSeguimiento } from '@hooks/useSeguimiento';

const SocioSeguimientoCrear = () => {

    const location = useLocation();
    const navigateTo = useNavigate();
    const { crearSeguimiento, cargando } = useCrearSeguimiento();

    // fecha que recibe desde CarlendarAcceso, se usa en el formulario
    const { fechaAcceso } = location.state ?? '';

    const manejarCrearSeguimiento = async (nuevoSeguimiento) => {

        // hace petición a la API desde el hook con los datos del nuevo seguimiento
        const respuestaCrearSeguimiento = await crearSeguimiento(nuevoSeguimiento);

        // si ha obtenido respuesta 201, lo muestra por consola
        if (respuestaCrearSeguimiento) {

            console.log('seguimiento creado', respuestaCrearSeguimiento);

            // obtiene el id del seguimiento que se acaba de crear
            const idNuevoSeguimientoCreado = respuestaCrearSeguimiento.data.id;

            // redirije a la página del nuevo seguimiento
            navigateTo(`/dashboard/seguimiento/${idNuevoSeguimientoCreado}`);
        }
    }

    return (
        <main>
            <DashboardCabecera>
                Crear un seguimiento
            </DashboardCabecera>

            <div className='row'>
                <FormCrearSeguimiento
                    manejarCrearSeguimiento={manejarCrearSeguimiento}
                    cargando={cargando}
                    fechaAcceso={fechaAcceso}
                />
            </div>
        </main>
    );
}

export default SocioSeguimientoCrear;
