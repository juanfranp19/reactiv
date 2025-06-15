import { NavLink } from 'react-router-dom';
import ButtonAdd from '@components/ui/ButtonAdd/ButtonAdd';

const AñadirCalentamientosEjercicios = () => {

    return (
        <div className='row'>
            
            <div className='col-12 col-sm-6 button-add-componente-padre'>
                <NavLink to='add-calentamiento' className='navLink'>
                    <ButtonAdd titulo='Añadir Calentamiento' />
                </NavLink> 
            </div>

            <div className='col-12 col-sm-6 button-add-componente-padre'>
                <NavLink to='add-ejercicio' className='navLink'>
                    <ButtonAdd titulo='Añadir Ejercicio' />
                </NavLink>
            </div>
            
        </div>
    );
}

export default AñadirCalentamientosEjercicios;
