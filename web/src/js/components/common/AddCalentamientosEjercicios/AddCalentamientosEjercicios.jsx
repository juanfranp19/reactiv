import ButtonAdd from '@components/ui/ButtonAdd/ButtonAdd';

const AñadirCalentamientosEjercicios = () => {

    return (
        <div className='row'>
            <div className='col-12 col-sm-6 button-add-componente-padre'>
                <ButtonAdd titulo='Añadir Calentamiento' />
            </div>
            <div className='col-12 col-sm-6 button-add-componente-padre'>
                <ButtonAdd titulo='Añadir Ejercicio' />
            </div>
        </div>
    );
}

export default AñadirCalentamientosEjercicios;
