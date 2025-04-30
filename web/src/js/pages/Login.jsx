import { useNavigate, Navigate } from 'react-router-dom';
import FormLogin from '@components/common/FormLogin/FormLogin';
import TopBar from '@components/common/TopBar/TopBar';
import { useLogin } from '@hooks/useAuth';

const Login = () => {

    const { getToken, cargando, error } = useLogin();
    const navigateTo = useNavigate();


    const user = localStorage.getItem('usertoken');

    if (user) {
        //navigateTo('/');
        return <Navigate to='/' ></Navigate>;
    } 




    const manejarLogin = async (dataFormLogin) => {

        // le envia los datos recividos del FormLogin para poder obtener el token
        const token = await getToken(dataFormLogin);

        // si se ha obtenido, lo relfeja en la consola
        if (token) {
            console.log('login exitoso');
            
            // redirige a incio
            navigateTo('/');
        }
    }

    return (
        <>
            <TopBar></TopBar>

            <FormLogin manejarLogin={manejarLogin} cargando={cargando} error={error}></FormLogin>
        </>
    );
}

export default Login;
