import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import ListaSocios from '@components/common/ListaSocios/ListaSocios';

const EntrenadorSocios = () => {

    return (
        <main>
            <DashboardCabecera>
                Socios registrados
            </DashboardCabecera>

            <ListaSocios />
        </main>
    );
}

export default EntrenadorSocios;
