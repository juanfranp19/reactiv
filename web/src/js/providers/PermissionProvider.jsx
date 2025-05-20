import { useEffect, useState } from 'react';
import PermissionContext from '@contexts/PermissionContext';

import { usePermissions } from '@hooks/useAuth';
import useToken from '@hooks/useToken';

const PermissionProvider = ({ children }) => {

    const [isEntrenador, setEntrenador] = useState(false);
    const [isSocio, setIsSocio] = useState(false);

    const [cargando, setCargando] = useState(true);

    const { permissions } = usePermissions();
    const { token } = useToken();


    useEffect(() => {

        if (permissions) {

            const obtenerPermisos = async () => {

                if (token) {

                    try {

                        // llama al servicio para obtener los permisos
                        const getpermissions = await permissions();

                        // muestra los valores por consola
                        console.log('isEntrenador', getpermissions.isEntrenador);
                        console.log('isSocio', getpermissions.isSocio);

                        // lo guarda en el contexto
                        setEntrenador(getpermissions.isEntrenador);
                        setIsSocio(getpermissions.isSocio);

                    } catch (error) {
                        console.log(error);
                    }
                }

                // termina de cargar
                setCargando(false);
            }
            
            obtenerPermisos();
        }

    }, [token, permissions]);

    return (
        <PermissionContext.Provider value={{ isEntrenador, isSocio }}>
            {
                cargando
                    ? <div>cargando</div>
                    : children
            }
        </PermissionContext.Provider>
    );
}

export default PermissionProvider;
