import { Navigate, Outlet } from 'react-router-dom';
import usePermission from '@hooks/usePermission';

const EntrenadorRoutes = () => {

    const { isEntrenador, isSocio } = usePermission();

    console.log(isEntrenador);

    // si el usuario es entrenador, va a la ruta indicada
    if (isEntrenador) {
        return (<Outlet />);

    } else if (isSocio) {
        // si no, si es socio, redirige al dashboard
        return (<Navigate to='/dashboard' />);
    }
}

export default EntrenadorRoutes;
