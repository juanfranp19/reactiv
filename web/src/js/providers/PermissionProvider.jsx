import { useEffect, useState } from 'react';
import PermissionContext from '@contexts/PermissionContext';

import { usePermissions } from '@hooks/useAuth';
import useToken from '@hooks/useToken';

const PermissionProvider = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isEntrenador, setIsEntrenador] = useState(false);
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
                        console.log('isAdmin', getpermissions.isAdmin);
                        console.log('isEntrenador', getpermissions.isEntrenador);
                        console.log('isSocio', getpermissions.isSocio);

                        // lo guarda en el contexto
                        setIsAdmin(getpermissions.isAdmin);
                        setIsEntrenador(getpermissions.isEntrenador);
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
        <PermissionContext.Provider value={{ isAdmin, isEntrenador, isSocio }}>
            {
                cargando
                    ? <div>cargando</div>
                    : children
            }
        </PermissionContext.Provider>
    );
}

export default PermissionProvider;
