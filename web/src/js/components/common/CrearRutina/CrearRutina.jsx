import { NavLink } from 'react-router-dom';
import ButtonAdd from '@components/ui/ButtonAdd/ButtonAdd';

const CrearRutina = () => {

    return (
        <div className='row'>
            <div className='col-12 crear-rutina button-add-componente-padre'>
                <NavLink to='crear'>
                    <ButtonAdd />
                </NavLink>
            </div>
        </div>
    );
}

export default CrearRutina;
