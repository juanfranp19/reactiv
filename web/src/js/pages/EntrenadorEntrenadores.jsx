import Crear from '@components/common/Crear/Crear';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import ListaEntrenadores from '@components/common/ListaEntrenadores/ListaEntrenadores';

import usePermission from '@hooks/usePermission';

const EntrenadorEntrenadores = () => {

    const { isAdmin } = usePermission();

    return (
        <main>
            <DashboardCabecera>
                Entrenadores registrados
            </DashboardCabecera>

            {
                isAdmin && (
                    <Crear>Registrar nuevo entrenador</Crear>
                )
            }

            <ListaEntrenadores />
        </main>
    );
}

export default EntrenadorEntrenadores;
