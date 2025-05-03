import { useEffect, useState } from 'react';
import TokenContext from '@contexts/TokenContext';

const TokenProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [cargando, setCargando] = useState(true);

    function tokenAlContexto() {

        // obtiene el token del almacenamiento local
        const token = localStorage.getItem('token');

        // guarda el token en el almacenamiento local
        setToken(token);

        // ya no está cargando
        setCargando(false);
    }

    useEffect(tokenAlContexto, []);

    return (
        <TokenContext.Provider value={{ token, setToken, cargando }}>
            {
                cargando
                    ? <div>cargando</div>
                    : children
            }
        </TokenContext.Provider>
    );
}

export default TokenProvider;
