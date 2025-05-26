import { Navigate, Outlet } from 'react-router-dom';
import usePermission from '@hooks/usePermission';

const EntrenadorRoutes = () => {

    const { isEntrenador, isSocio } = usePermission();

    console.log(isSocio);

    // si el usuario es socio, va a la ruta indicada
    if (isSocio) {
        return (<Outlet />);

    } else if (isEntrenador) {
        // si no, si es entrenador, redirige al dashboard
        return (<Navigate to='/dashboard' />);
    }
}

export default EntrenadorRoutes;
