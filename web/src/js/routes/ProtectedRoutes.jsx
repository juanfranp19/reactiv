import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {

    const user = localStorage.getItem('usertoken');

    if (user) {
        return children
    } else {
        return <Navigate to='/login' />;
    }
}

export default ProtectedRoutes;
