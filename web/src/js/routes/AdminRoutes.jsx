import { Navigate, Outlet } from 'react-router-dom';
import usePermission from '@hooks/usePermission';

const AdminRoutes = () => {

    const { isAdmin, isEntrenador, isSocio } = usePermission();

    console.log(isAdmin);

    // si el usuario es admin, va a la ruta indicada
    if (isAdmin) {
        return (<Outlet />);

    } else if (isEntrenador || isSocio) {
        // si no, redirige al dashboard
        return (<Navigate to='/dashboard' />);
    }
}

export default AdminRoutes;
