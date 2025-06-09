const ACCESO_URL = import.meta.env.VITE_ACCESO_URL;

import AccessCard from '@components/ui/AccessCard/AccessCard';
import ButtonCard from '@components/ui/ButtonCard/ButtonCard'

const DatosCodigoAcceso = ({ socioData, cargando }) => {

    return (
        <div className='row datos-codigo-acceso'>
            <div className='col-12 col-md-6'>

                {/* card donde aparece el código de acceso */}

                <AccessCard socioData={socioData} cargando={cargando} />

            </div>
            <div className='col-12 col-md-6'>

                {/* lleva a la página para acceder y salir */}

                <a href={ACCESO_URL}>
                    <ButtonCard onClick>
                        Ir a página para acceder/salir
                    </ButtonCard>
                </a>

            </div>
        </div>
    );
}

export default DatosCodigoAcceso;
