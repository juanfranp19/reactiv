import LogoReactiv from '@components/LogoReactiv/LogoReactiv';

const Navbar = () => {

    return (
        <nav className='row sticky-top'>
            <div className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div className='container-fluid'>

                    <a className='navbar-brand' href='#'>
                        <LogoReactiv></LogoReactiv>
                    </a>

                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#mynavbar'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='mynavbar'>

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

                        <div className='d-flex'>
                            <ul className='navbar-nav me-auto'>
                                <li className='nav-item dropdown'>
                                    <a className='nav-link' href='#' role='button' data-bs-toggle='dropdown'>
                                        <i className="bi bi-person-circle"></i>
                                        <i class="bi bi-caret-down"></i>
                                        <i class="bi bi-caret-down-fill"></i>
                                    </a>
                                    <ul className='dropdown-menu dropdown-menu-end'>
                                        <li><a className='dropdown-item' href='#'>Link</a></li>
                                        <li><a className='dropdown-item' href='#'>Another link</a></li>
                                        <li><a className='dropdown-item' href='#'>A third link</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
