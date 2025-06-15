import ButtonAccionEntrenador from '@components/ui/ButtonAccionEntrenador/ButtonAccionEntrenador';

const ActionsEntrenador = () => {

    return (
        <div className='row'>
            <div className='actions-entrenador'>
                <ButtonAccionEntrenador>Accesos</ButtonAccionEntrenador>
                <ButtonAccionEntrenador>Productos</ButtonAccionEntrenador>
                <ButtonAccionEntrenador>Rutinas</ButtonAccionEntrenador>
                <ButtonAccionEntrenador>Seguimiento</ButtonAccionEntrenador>
                <ButtonAccionEntrenador>Taquilla</ButtonAccionEntrenador>
                <ButtonAccionEntrenador linkTo='tarifas'>Tarifas</ButtonAccionEntrenador>
            </div>
        </div>
    );
}

export default ActionsEntrenador;
