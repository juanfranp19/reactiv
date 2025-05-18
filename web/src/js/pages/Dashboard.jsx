import DashboardEntrenador from '@components/common/DashboardEntrenador/DashboardEntrenador';
import DashboardSocio from '@components/common/DashboardSocio/DashboardSocio';
import usePermission from '@hooks/usePermission';

const Dashboard = () => {

    const { isEntrenador } = usePermission();

    return (
        <main>
            {
                isEntrenador ? (
                    <DashboardEntrenador />
                ) : (
                    <DashboardSocio />
                )
            }
        </main>
    );
}

export default Dashboard;
