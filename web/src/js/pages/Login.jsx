import { Navigate } from 'react-router-dom';
import FormLogin from '@components/common/FormLogin/FormLogin';
import TopBar from '@components/common/TopBar/TopBar';
import { useLogin } from '@hooks/useAuth';
import useToken from '@hooks/useToken';

const Login = () => {

    const { getToken, cargando } = useLogin();
    const { token, setToken } = useToken();

    // si ya hay un token registrado, redirije el inicio
    if (token) {
        return (<Navigate to='/' />);
    }

    const manejarLogin = async (dataFormLogin) => {

        // le envia los datos recividos del FormLogin para poder obtener el token
        const token_fromFormLogin = await getToken(dataFormLogin);

        // si se ha obtenido, lo relfeja en la consola
        if (token_fromFormLogin) {

            // guarda el token en el contexto
            setToken(token_fromFormLogin);

            console.log('login exitoso');

            // al completar la solicitud, se renderiza de nuevo la página y redirige a donde apunta la condición de arriba
        }
    }

    return (
        <>
            <TopBar />

            <FormLogin manejarLogin={manejarLogin} cargando={cargando} />
        </>
    );
}

export default Login;
