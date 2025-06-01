import CalendarSeguimientos from '@components/common/CalendarSeguimientos/CalendarSeguimientos';
import Crear from '@components/common/Crear/Crear';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';

const SocioSeguimiento = () => {

    return (
        <main>
            <DashboardCabecera>
                Tu seguimiento
            </DashboardCabecera>

            <Crear>
                Crear seguimiento
            </Crear>

            <CalendarSeguimientos />
        </main>
    );
}

export default SocioSeguimiento;
