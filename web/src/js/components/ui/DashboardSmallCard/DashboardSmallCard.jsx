import { useEffect, useState } from 'react';

const DashboardSmallCard = (props) => {

    const [posicion, setPosicion] = useState('');

    function asignarPosicion() {

        // según las opciones el row tendrá una clase u otra
        switch (props.posicion) {
            case 'derecha':
                setPosicion('p-right');
                break;
            case 'izquierda':
                setPosicion('p-left');
                break;
            default:
                break;
        }
    }
    
    useEffect(asignarPosicion, [props.posicion]);

    return (
        <div className='col-12 col-sm-6'>
            <div className={`row ${posicion}`}>
                <div className='col-12 item'>
                    {/* texto plano, nada de cols */}
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default DashboardSmallCard;
