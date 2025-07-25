const API_URL = import.meta.env.VITE_API_URL;

import { NavLink, useNavigate } from 'react-router-dom';

import { useLogout } from '@hooks/useAuth';
import usePermission from '@hooks/usePermission';
import useToken from '@hooks/useToken';

import { useObtenerEntrenador } from '@hooks/useEntrenador';
import { useObtenerSocio } from '@hooks/useSocio';

const DropdownUser = () => {

    const navigateTo = useNavigate();

    const { logout, cargando: cargandoLogout } = useLogout();

    const { isEntrenador, isSocio } = usePermission();
    const { setToken, setUsername, socioId, setSocioId, entrenadorId, setEntrenadorId } = useToken();

    const { entrenadorData, cargando: cargandoEntrenadorData } = useObtenerEntrenador(isEntrenador ? entrenadorId : null);
    const { socioData, cargando: cargandoSocioData } = useObtenerSocio(isSocio ? socioId : null);

    const manejarLogout = async () => {

        // solicita a la API cerrar sesión
        const cierreSesion = await logout();

        if (cierreSesion) {

            // elimina todos los datos del contexto del token que maneja datos delicados del usuario
            setToken(null);
            setUsername(null);
            setSocioId(null);
            setEntrenadorId(null);

            // redirige a la página de login
            navigateTo('/login');

            console.log('se ha cerrado sesión correctamente');
        }
    }

    return (
        <ul className='dropdown-user navbar-nav me-auto'>
            <li className='nav-item dropdown'>

                {/* icono de usuario */}
                <a className='nav-link' href='#' role='button' data-bs-toggle='dropdown'>
                    {
                        // si es SOCIO

                        isSocio && (
                            cargandoSocioData || !socioData.imagen ? (
                                <>
                                    <i className='bi bi-person-circle' />
                                    <i className='bi bi-caret-down' />
                                    <i className='bi bi-caret-down-fill' />
                                </>
                            ) : (
                                <img className='user-icon' src={`${API_URL}/storage/local/socios/imagen/${socioData.imagen}`} alt={socioData.nombre} />
                            )
                        )
                    }
                    {
                        // si es Entrenador

                        isEntrenador && (
                            cargandoEntrenadorData || !entrenadorData.imagen ? (
                                <>
                                    <i className='bi bi-person-circle' />
                                    <i className='bi bi-caret-down' />
                                    <i className='bi bi-caret-down-fill' />
                                </>
                            ) : (
                                <img className='user-icon' src={`${API_URL}/storage/local/entrenadores/imagen/${entrenadorData.imagen}`} alt={entrenadorData.nombre} />
                            )
                        )
                    }
                </a>

                {/* menú desplegable */}
                <ul className='dropdown-fuera-offcanvas dropdown-menu dropdown-menu-end'>
                    <li>
                        {/* end para que no se marque como active si está en una ruta hija */}
                        <NavLink to='/dashboard' className='dropdown-item' end><i className='bi bi-speedometer2' /> Dashboard</NavLink>
                    </li>
                    {
                        isSocio && (
                            <>
                                <li>
                                    <NavLink to='/dashboard/mi-perfil' className='dropdown-item'><i className='bi bi-person' /> Mi perfil</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/codigo-acceso' className='dropdown-item'><i className='bi bi-key' /> Código de acceso</NavLink>
                                </li>
                            </>
                        )
                    }

                    <li>
                        <button className='dropdown-item' onClick={manejarLogout}>
                            <i className='bi bi-door-open' /> {cargandoLogout ? 'cargando' : 'Salir'}
                        </button>
                    </li>
                </ul>

            </li>
        </ul>
    );
}

export default DropdownUser;
