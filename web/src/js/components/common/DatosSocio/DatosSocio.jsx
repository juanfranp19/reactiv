import { useNavigate } from 'react-router-dom';

import ButtonDelete from '@components/ui/ButtonDelete/ButtonDelete';
import FormActualizarSocio from '@components/ui/FormActualizarSocio/FormActualizarSocio';
import FormActualizarUser from '@components/ui/FormActualizarUser/FormActualizarUser';

import usePermission from '@hooks/usePermission';
import { useActualizarSocio, useEliminarSocio } from '@hooks/useSocio';
import { useActualizarUser } from '@hooks/useUser';

const DatosSocio = ({ isDisabled, refreshAllSociosData, refreshSocioData, socioData }) => {

    console.log('socioData', socioData);

    const navigateTo = useNavigate();

    const { isAdmin } = usePermission();

    const { updateSocio, cargando: cargandoUpdateSocio } = useActualizarSocio();
    const { updateUser, cargando: cargandoUpdateUser } = useActualizarUser();
    const { destroySocio, cargando: cargandoDestroySocio } = useEliminarSocio();

    // función que envía datos al servicio para actualizar el socio
    const manejarActualizarSocio = async (dataFormSocio) => {

        // envía petición
        const respuestaActualizarSocio = await updateSocio(dataFormSocio, socioData.id);

        // si da OK, actualiza los datos del socio
        if (respuestaActualizarSocio) {
            console.log('socio actualizado');
            refreshSocioData();
        }
    }

    // función que envía datos al servicio para actualizar el usuario
    const manejarActualizarUser = async (dataFormUser) => {

        // envía petición
        const respuestaActualizarUser = await updateUser(dataFormUser, socioData?.user.id);

        // si da OK, actualiza los datos del usuario
        if (respuestaActualizarUser) {
            console.log('user actualizado');
            refreshSocioData();
        }
    }

    // función que envía datos al servicio para ELIMINAR el socio
    const manejarEliminarSocio = async () => {

        // envía petición
        const respuestaEliminarSocio = await destroySocio(socioData.id);

        // si da OK, recarga los socios y redirige a la lista de todos los socios
        if (respuestaEliminarSocio) {
            console.log('socio ELIMINADO');
            refreshAllSociosData();
            navigateTo(-1);
        }
    }

    // evita entrar a páginas cuyo socio id no existe
    if (socioData.length <= 0) navigateTo(-1);

    return (
        <div className='row'>

            <div className='col-12 col-xxl-6'>
                <div className='row'>

                    {/* formulario para actualizar socio */}

                    <FormActualizarSocio
                        cargandoUpdateSocio={cargandoUpdateSocio}
                        manejarActualizarSocio={manejarActualizarSocio}
                        socioData={socioData}
                        isDisabled={isDisabled}
                    />
                </div>
            </div>

            <div className='col-12 col-xxl-6'>
                <div className='row'>

                    {/* formulario para actualizar usuario */}

                    <FormActualizarUser
                        cargandoUpdateUser={cargandoUpdateUser}
                        manejarActualizarUser={manejarActualizarUser}
                        userData={socioData?.user}
                    />
                </div>
            </div>

            {
                // eliminar socio
                // solo aparecen a los admins

                isAdmin && (
                    <div className='col-12 eliminar-socio'>

                        <ButtonDelete
                            cargando={cargandoDestroySocio}
                            onClick={manejarEliminarSocio}
                        >
                            <i className='bi bi-exclamation-triangle' /> ELIMINAR SOCIO <i className='bi bi-exclamation-triangle' />
                        </ButtonDelete>

                    </div>
                )
            }

        </div>
    );
}

export default DatosSocio;
