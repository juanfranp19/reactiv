import Crear from '@components/common/Crear/Crear';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import ListaRutinas from '@components/common/ListaRutinas/ListaRutinas';

const SocioRutinas = () => {

    return (
        <main>
            <DashboardCabecera>
                Tus rutinas
            </DashboardCabecera>

            <Crear>
                Crear rutina
            </Crear>

            <ListaRutinas />
        </main>
    );
}

export default SocioRutinas;
