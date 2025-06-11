import { useNavigate } from 'react-router-dom';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import { useCrearProducto } from '@hooks/useProducto';
import FormCrearProducto from '../components/ui/FormCrearProducto/FormCrearProducto';


const EntrenadorProductoCrear = () => {

    const navigateTo = useNavigate();
    const { crearProducto, cargando: cargandoCrearProducto } = useCrearProducto();

    const manejarCrearProducto = async (nuevoProducto) => {

        // hace petición a la API desde el hook con los datos de la nueva rutina
        const respuestaCrearProducto = await crearProducto(nuevoProducto);

        // si ha obtenido respuesta 201, lo muestra por consola
        if (respuestaCrearProducto) {

            console.log('rutina creada', respuestaCrearProducto);

            // obtiene el id de la rutina que se acaba de crear
            const idNuevaProductoCreada = respuestaCrearProducto.data.id;

            // redirije a la página de la nueva rutina
            navigateTo(`/dashboard/tus-rutinas/rutina/${idNuevaProductoCreada}`);
        }
    }

    return (
        <main>
            <DashboardCabecera>
                Crear un producto
            </DashboardCabecera>

            <FormCrearProducto
                cargandoCrearProducto={cargandoCrearProducto}
                manejarCrearProducto={manejarCrearProducto}
            />
        </main>
    );
}

export default EntrenadorProductoCrear;
