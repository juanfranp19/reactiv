import DashboardEntrenador from '@components/common/DashboardEntrenador/DashboardEntrenador';
import DashboardSocio from '@components/common/DashboardSocio/DashboardSocio';  
import Navbar from '@components/common/Navbar/Navbar';

import usePermission from '@hooks/usePermission';

const Dashboard = () => {

    const { isEntrenador } = usePermission();

    return (
        <>
            <Navbar />
            {
                isEntrenador ? (
                    <DashboardEntrenador />
                ) : (
                    <DashboardSocio />
                )
            }
        </>
    );
}

export default Dashboard;
