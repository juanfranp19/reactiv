import { NavLink } from 'react-router-dom';

const DashboardBigCard = ({ linkTo, children }) => {

    return (
        <div className='col-12 '>
            <div className='row'>
                <NavLink to={linkTo} className="col-12 item">
                    <div className='row'>
                        {/* cada hijo debe tener una clase col */}
                        {children}
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default DashboardBigCard;
