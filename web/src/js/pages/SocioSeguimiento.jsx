import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import CalendarSeguimientos from '@components/common/CalendarSeguimientos/CalendarSeguimientos';

const SocioSeguimiento = () => {

    return (
        <main>
            <DashboardCabecera>
                Tu seguimiento
            </DashboardCabecera>

            <CalendarSeguimientos />
        </main>
    );
}

export default SocioSeguimiento;
