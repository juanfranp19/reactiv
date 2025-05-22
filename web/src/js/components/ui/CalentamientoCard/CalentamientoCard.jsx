const API_URL = import.meta.env.VITE_API_URL;

import ButtonEdit from '@components/ui/ButtonEdit/ButtonEdit';
import ButtonDelete from '@components/ui/ButtonDelete/ButtonDelete';
import ImgNull from '@components/ui/ImgNull/ImgNull';

const CalentamientoCard = ({ nombre, imagen, tiempo }) => {

    return (
        <div className='col-4 card'>
            {
                // imagen del calentamiento, si no tiene, se le asigna una de defecto
                imagen
                    ? <img src={`${API_URL}/storage/calentamientos/imagen/${imagen}`} alt={nombre} />
                    : <ImgNull />
            }
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
