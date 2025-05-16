import noImg from '@assets/no-img.svg';

import ButtonEdit from '@components/ui/ButtonEdit/ButtonEdit';
import ButtonDelete from '@components/ui/ButtonDelete/ButtonDelete';

const CalentamientoCard = ({ nombre, tiempo }) => {

    return (
        <div className='col-4 card calentamiento-card'>
            <img src={noImg} className='imagen' alt='calentamiento' />
            <div className='card-body'>
                <h5 className='card-title'>{nombre}</h5>
                <p className='card-text'>{tiempo} minutos</p>
                <div className='botones'>
                    <ButtonEdit />
                    <ButtonDelete />
                </div>
            </div>
        </div>
    );
}

export default CalentamientoCard;
