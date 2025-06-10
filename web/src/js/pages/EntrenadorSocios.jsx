import Crear from '@components/common/Crear/Crear';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import ListaSocios from '@components/common/ListaSocios/ListaSocios';

const EntrenadorSocios = () => {

    return (
        <main>
            <DashboardCabecera>
                Socios registrados
            </DashboardCabecera>

            <Crear>Registrar nuevo socio</Crear>

            <ListaSocios />
        </main>
    );
}

export default EntrenadorSocios;
