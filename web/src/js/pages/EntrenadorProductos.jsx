import Crear from '@components/common/Crear/Crear';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import ListaProductos from '@components/common/ListaProductos/ListaProductos';

const EntrenadorProductos = () => {

    return(
        <main>
            <DashboardCabecera>
                Lista de productos
            </DashboardCabecera>

            <Crear>Crear producto</Crear>

            <ListaProductos />
        </main>
    );
}

export default EntrenadorProductos;
