import { useEffect, useState } from 'react';
import TokenContext from '@contexts/TokenContext';
import { useCheckAuth } from '@hooks/useAuth';

const TokenProvider = ({ children }) => {

    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

    const [socioId, setSocioId] = useState('');
    const [entrenadorId, setEntrenadorId] = useState('');

    const [cargando, setCargando] = useState(true);

    const { user } = useCheckAuth();

    useEffect(() => {

        const verificarToken = async () => {

            const localToken = localStorage.getItem('token');

            if (!localToken) {
                // termina de cargar
                setCargando(false);
                return 0;
            }

            try {

                // lama a la petición user de useCheckAuth la cual haŕa saber si el token es válido
                const data = await user();

                if (data) {
                    // actualiza el contexto
                    setToken(localToken);
                    setUsername(data.name);

                    // con '?' porque cuando da error al intentar cargar los datos del rol contrario
                    // es decir, si es entrenador, da error al intentar obtener el id del socio, y viceversa
                    setEntrenadorId(data?.entrenador?.id);
                    setSocioId(data?.socio?.id);

                } else {
                    // llama funcion que elimina todo los datos del contexto
                    handleLogout();
                }

            } catch (error) {
                console.log(error);

            } finally {
                // termina de cargar
                setCargando(false);
            }
        };

        const handleLogout = () => {
            localStorage.removeItem('token');
            setToken(null);
            setUsername(null);
            setEntrenadorId(null);
            setSocioId(null);
        };

        verificarToken();

    }, [user, entrenadorId, socioId]);

    if (cargando) return (<div>Cargando...</div>);

    return (
        <TokenContext.Provider value={{ token, setToken, username, setUsername, socioId, setSocioId, entrenadorId, setEntrenadorId }}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenProvider;
