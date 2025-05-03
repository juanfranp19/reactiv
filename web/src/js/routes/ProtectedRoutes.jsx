import { Navigate, Outlet } from 'react-router-dom';
import useToken from '@hooks/useToken';

const ProtectedRoutes = () => {

    const { token } = useToken();

    // si se encuentra un token en el contexto, va a la ruta indicada, si no, redirige a inicio
    if (token) {
        return (<Outlet />);
    } else {
        return (<Navigate to='/login' />);
    }
}

export default ProtectedRoutes;
