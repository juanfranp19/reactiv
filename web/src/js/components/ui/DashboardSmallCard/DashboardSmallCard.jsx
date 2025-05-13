import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const DashboardSmallCard = ({ linkTo, posicion, children }) => {

    const [posicionClass, setPosicionClass] = useState('');

    function asignarPosicion() {

        // asigna la posiciónn que tendrá la card, derecha o izquierda
        switch (posicion) {
            case 'derecha':
                setPosicionClass('p-right');
                break;
            case 'izquierda':
                setPosicionClass('p-left');
                break;
            default:
                break;
        }
    }
    
    useEffect(asignarPosicion, [posicion]);

    return (
        <div className='col-12 col-sm-6'>
            <div className={`row ${posicionClass}`}>
                <NavLink to={linkTo} className='col-12 item'>
                    {/* texto plano, nada de cols */}
                    {children}
                </NavLink>
            </div>
        </div>
    );
}

export default DashboardSmallCard;
