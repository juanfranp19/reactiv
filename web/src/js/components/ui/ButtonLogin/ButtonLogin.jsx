import { NavLink } from 'react-router-dom';

const ButtonLogin = () => {

    return (
        <NavLink to='/login'>
            <button type='button' className='btn btn-outline-danger' style={{ marginRight: 20 }}>
                <i className='bi bi-person-bounding-box' />
            </button>
        </NavLink>
    );
}

export default ButtonLogin;
