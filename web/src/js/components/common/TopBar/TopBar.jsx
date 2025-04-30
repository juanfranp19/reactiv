import { NavLink } from 'react-router-dom';

import LogoReactiv from '@components/ui/LogoReactiv/LogoReactiv';

const TopBar = () => {

    return (
        <div className='row'>
            <div className='col-12 top-bar'>
                <NavLink to='/'><LogoReactiv></LogoReactiv></NavLink>
            </div>
        </div>
    );
}

export default TopBar;
