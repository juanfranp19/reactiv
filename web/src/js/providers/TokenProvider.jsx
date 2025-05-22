import { useEffect, useState } from 'react';
import TokenContext from '@contexts/TokenContext';
import { useCheckAuth } from '@hooks/useAuth';

const TokenProvider = ({ children }) => {

    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
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
                    setId(data.id);
                    
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
            setId(null);
        };

        verificarToken();

    }, [user]);

    if (cargando) return (<div>Cargando...</div>);

    return (
        <TokenContext.Provider value={{ token, setToken, username, setUsername, id, setId }}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenProvider;
