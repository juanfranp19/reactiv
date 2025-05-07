import { Navigate, Outlet } from 'react-router-dom';
import usePermission from '@hooks/usePermission';

const EntrenadorRoutes = () => {

    const { isEntrenador } = usePermission();

    console.log(isEntrenador);

    // si el usuario es entrenador, va a la ruta indicada, si no, redirige a inicio
    if (isEntrenador) {
        return (<Outlet />);
    } else {
        return (<Navigate to='/' />);
    }
}

export default EntrenadorRoutes;
