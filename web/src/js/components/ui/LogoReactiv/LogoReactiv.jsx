import { NavLink } from 'react-router-dom';
import logo from '@assets/logo/logo.png';

const LogoReactiv = () => {

    return (
        <NavLink to='/'>
            <img className='logo-reactiv' src={logo} alt='Reactiv Logo' />
        </NavLink>
    );
}

export default LogoReactiv;
