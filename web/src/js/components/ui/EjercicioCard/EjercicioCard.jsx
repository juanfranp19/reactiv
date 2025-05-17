import ButtonEdit from '@components/ui/ButtonEdit/ButtonEdit';
import ButtonDelete from '@components/ui/ButtonDelete/ButtonDelete';
import ImgNull from '@components/ui/ImgNull/ImgNull';

const EjercicioCard = ({ nombre, imagen, num_series, num_repeticiones, grupo_muscular }) => {

    return (
        <div className='col-4 card'>
            {
                imagen
                    ? <img src={imagen} alt='ejercicio' />
                    : <ImgNull />
            }
            <div className='card-body'>
                <h5 className='card-title'>{nombre}</h5>
                <h6 className='card-subtitle'>{grupo_muscular}</h6>

                <ul className='card-info'>
                    <li className='card-text'><span>Series:</span> {num_series}</li>
                    <li className='card-text'><span>Repeticiones:</span> {num_repeticiones}</li>
                </ul>

                <div className='botones'>
                    <ButtonEdit />
                    <ButtonDelete />
                </div>
            </div>
        </div>
    );
}

export default EjercicioCard;
