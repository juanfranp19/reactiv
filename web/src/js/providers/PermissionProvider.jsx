import { useEffect, useState } from 'react';
import PermissionContext from '@contexts/PermissionContext';

import { usePermissions } from '@hooks/useAuth';
import useToken from '@hooks/useToken';

const PermissionProvider = ({ children }) => {

    const [isEntrenador, setEntrenador] = useState(false);
    const [cargando, setCargando] = useState(true);

    const { permissions } = usePermissions();
    const { token } = useToken();
     

    useEffect(() => {

        const obtenerPermisos = async () => {

            if (token) {

                try {

                    // llama al servicio para obtener los permisos
                    const getpermissions = await permissions();
                    console.log('isEntrenador', getpermissions.isEntrenador);
                    // lo guarda en el contexto
                    setEntrenador(getpermissions.isEntrenador);

                } catch (error) {
                    console.log(error);
                }
            }

            // termina de cargar
            setCargando(false);
        }

        obtenerPermisos();

    }, [token, permissions]);

    return (
        <PermissionContext.Provider value={{ isEntrenador }}>
            {
                cargando
                    ? <div>cargando</div>
                    : children
            }
        </PermissionContext.Provider>
    );
}

export default PermissionProvider;
