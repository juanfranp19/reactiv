import { NavLink } from 'react-router-dom';

import ButtonLogin from '@components/ui/ButtonLogin/ButtonLogin';
import LogoReactiv from '@components/ui/LogoReactiv/LogoReactiv';
import DropdownUser from '@components/ui/DropdownUser/DropdownUser';

import useToken from '@hooks/useToken';

const Navbar = () => {

    const { token } = useToken();

    return (
        <nav className='row sticky-top'>
            <div className='navbar navbar-expand-md bg-body-tertiary-dark navbar-dark bg-dark'>
                <div className='container-fluid'>

                    <div className='navbar-brand'>
                        <LogoReactiv />
                    </div>

                    <div className='d-flex d-md-none'>
                        {token ? <DropdownUser /> : <ButtonLogin />}
                    </div>

                    <button className='navbar-toggler' type='button' data-bs-toggle='offcanvas' data-bs-target='#mynavbar' aria-controls='offcanvasNavbar' aria-label='Toggle navigation'>
                        <i className='bi bi-list'></i>
                        <i className='bi bi-list-nested'></i>
                    </button>

                    <div className='offcanvas offcanvas-end text-bg-dark' tabIndex='-1' id='mynavbar' aria-labelledby='offcanvasNavbarLabel'>

                        <div className='offcanvas-header'>
                            <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
                                <LogoReactiv></LogoReactiv>
                            </h5>
                            <button type='button' className='btn-close btn-close-white' data-bs-dismiss='offcanvas' aria-label='Close'></button>
                        </div>

                        <div className='offcanvas-body navbar-collapse'>
                            {/* navbar-collapse para que los elementos se centren verticalmente en el centro */}

                            <ul className='navbar-nav me-auto'>
                                <li className='nav-item'>
                                    <a className='nav-link' href='javascript:void(0)'>Link</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' href='javascript:void(0)'>Link</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' href='javascript:void(0)'>Link</a>
                                </li>
                            </ul>

                            <div className='d-flex d-none d-md-block'>
                                <DropdownUser />
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
