import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '@hooks/useAuth';
import useToken from '@hooks/useToken';

const DropdownUser = () => {

    const navigateTo = useNavigate();

    const { logout, cargando } = useLogout();
    const { setToken } = useToken();

    const manejarLogout = async () => {

        // solicita a la API cerrar sesión
        const cierreSesion = await logout();

        if (cierreSesion) {

            // elimina el token del contexto
            setToken(null);

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
                    <i className='bi bi-person-circle' />
                    <i className='bi bi-caret-down' />
                    <i className='bi bi-caret-down-fill' />
                </a>

                {/* menú desplegable */}
                <ul className='dropdown-fuera-offcanvas dropdown-menu dropdown-menu-end'>
                    <li>
                        <NavLink to='error' className='dropdown-item'>Mi Perfil</NavLink>
                    </li>
                    <li>
                        <a className='dropdown-item' href='#'>Another link</a>
                    </li>
                    <li>
                        <button className='dropdown-item' onClick={manejarLogout}>
                            {cargando ? 'cargando' : 'Cerrar sesión'}
                        </button>
                    </li>
                </ul>
                
            </li>
        </ul>
    );
}

export default DropdownUser;
