import ListaEjercicios from '@components/common/ListaEjercicios/ListaEjercicios';

const ContenidoHome = () => {

    return (
        <>
            <div className='row'>
                <div className='col-12 home'>
                    Reactiv
                </div>

                <div className='col-12 home-subtitulos'>
                    Tu aplicación de gestión de entrenamiento. <i className='bi bi-columns-gap' />
                </div>

                <div className='col-12 home-subtitulos'>
                    Haz un control día a día de tus seguimientos. <i className='bi bi-dpad' />
                </div>
            </div>

            <div className='row home-ejercicios'>
                <div className='col-12 home-subtitulos'>
                    Con más de 70 ejercicios para tus rutinas. <i className='bi bi-person-arms-up' />
                </div>

                <div className='col-12'>
                    <div className='row'>
                        <ListaEjercicios />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContenidoHome;
