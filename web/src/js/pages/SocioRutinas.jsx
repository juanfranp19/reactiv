import CrearRutina from '@components/common/CrearRutina/CrearRutina';
import ListaRutinas from '@components/common/ListaRutinas/ListaRutinas';

const SocioRutinas = () => {

    return (
        <>
            <div className='row'>
                <div className='col-12 titulo-dashboard'>
                    Tus rutinas
                </div>
            </div>

            <CrearRutina />

            <ListaRutinas />
        </>
    );
}

export default SocioRutinas;
