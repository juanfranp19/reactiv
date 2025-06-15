import { NavLink } from 'react-router-dom';

const LogoReactiv = () => {

    return (
        <NavLink to='/'>
            <img className='logo-reactiv' src='/logo-reactiv-rojo.svg' alt='Reactiv Logo' />
        </NavLink>
    );
}

export default LogoReactiv;
