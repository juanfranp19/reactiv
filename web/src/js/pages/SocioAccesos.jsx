import CalendarAccesos from '@components/common/CalendarAccesos/CalendarAccesos';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';

const SocioAccesos = () => {

    return (
        <main>
            <DashboardCabecera>
                Tus accesos
            </DashboardCabecera>

            <CalendarAccesos />
        </main>
    );
}

export default SocioAccesos;
