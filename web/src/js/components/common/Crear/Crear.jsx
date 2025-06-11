import { NavLink } from 'react-router-dom';
import ButtonAdd from '@components/ui/ButtonAdd/ButtonAdd';

const Crear = ({ children }) => {

    return (
        <div className='row'>
            <div className='col-12 button-add-componente-padre '> {/* clase de ButtonAdd */}
                <NavLink to='crear' className='navLink'>
                    <ButtonAdd titulo={children} />
                </NavLink>
            </div>
        </div>
    );
}

export default Crear;
