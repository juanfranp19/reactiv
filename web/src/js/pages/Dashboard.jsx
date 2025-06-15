import { Helmet } from 'react-helmet';

import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import DashboardEntrenador from '@components/common/DashboardEntrenador/DashboardEntrenador';
import DashboardSocio from '@components/common/DashboardSocio/DashboardSocio';

import usePermission from '@hooks/usePermission';

const Dashboard = () => {

    const { isEntrenador, isSocio } = usePermission();

    return (
        <main>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <DashboardCabecera>
                <i className='bi bi-hexagon' /> Dashboard
            </DashboardCabecera>

            {isEntrenador && <DashboardEntrenador />}
            {isSocio && <DashboardSocio />}
        </main>
    );
}

export default Dashboard;
