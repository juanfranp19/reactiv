import { NavLink } from 'react-router-dom';

const ButtonLogin = () => {

    return (
        <NavLink to='/login'>
            <button type='button' className='btn btn-outline-danger'>Inicia sesión</button>
        </NavLink>
    );
}

export default ButtonLogin;
