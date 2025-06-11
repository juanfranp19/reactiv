import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonDelete from '@components/ui/ButtonDelete/ButtonDelete';
import FormActualizarEntrenador from '@components/ui/FormActualizarEntrenador/FormActualizarEntrenador';
import FormActualizarUser from '@components/ui/FormActualizarUser/FormActualizarUser';

import usePermission from '@hooks/usePermission';
import useToken from '@hooks/useToken';

import { useActualizarEntrenador, useEliminarEntrenador } from '@hooks/useEntrenador';
import { useActualizarUser } from '@hooks/useUser';


const DatosEntrenador = ({ refreshAllEntrenadoresData, refreshEntrenadorData, entrenadorData }) => {

    console.log('entrenadorData', entrenadorData);

    const [isPropietario, setIsPropietario] = useState(false);

    const navigateTo = useNavigate();

    const { isAdmin } = usePermission();
    const { entrenadorId } = useToken();

    const { updateEntrenador, cargando: cargandoUpdateEntrenador } = useActualizarEntrenador();
    const { updateUser, cargando: cargandoUpdateUser } = useActualizarUser();
    const { destroyEntrenador, cargando: cargandoDestroyEntrenador } = useEliminarEntrenador();


    useEffect(() => {

        // si el id del entrenador sacado del useToken, y el id del entrenado de los datos, es propietario
        if (entrenadorId === entrenadorData.id) {
            setIsPropietario(true);
        }

    }, [entrenadorData, entrenadorId]);

    console.log('isPropietario ', isPropietario);

    // función que envía datos al servicio para actualizar el entrenador
    const manejarActualizarEntrenador = async (dataFormEntrenador) => {

        // envía petición
        const respuestaActualizarEntrenador = await updateEntrenador(dataFormEntrenador, entrenadorData.id);

        // si da OK, actualiza los datos del entrenador
        if (respuestaActualizarEntrenador) {
            console.log('entrenador actualizado');
            refreshEntrenadorData();
        }
    }

    // función que envía datos al servicio para actualizar el usuario
    const manejarActualizarUser = async (dataFormUser) => {

        // envía petición
        const respuestaActualizarUser = await updateUser(dataFormUser, entrenadorData?.user.id);

        // si da OK, actualiza los datos del usuario
        if (respuestaActualizarUser) {
            console.log('user actualizado');
            refreshEntrenadorData();
        }
    }

    // función que envía datos al servicio para ELIMINAR el entrenador
    const manejarEliminarEntrenador = async () => {

        // envía petición
        const respuestaEliminarEntrenador = await destroyEntrenador(entrenadorData.id);

        // si da OK, recarga los entrenadores y redirige a la lista de todos los entrenadores
        if (respuestaEliminarEntrenador) {
            console.log('entrenador ELIMINADO');
            refreshAllEntrenadoresData();
            navigateTo(-1);
        }
    }

    // evita entrar a páginas cuyo entrenador id no existe
    if (entrenadorData.length <= 0) navigateTo(-1);

    return (
        <div className='row'>

            <div className='col-12 col-xxl-6'>
                <div className='row'>

                    {/* formulario para actualizar entrenador */}

                    <FormActualizarEntrenador
                        cargandoUpdateEntrenador={cargandoUpdateEntrenador}
                        manejarActualizarEntrenador={manejarActualizarEntrenador}
                        entrenadorData={entrenadorData}
                        isDisabled={!(isAdmin || isPropietario)} // true si no eres o admin o propietario
                        noAdmin={!isAdmin} // true si no eres admin
                    />
                </div>
            </div>

            <div className='col-12 col-xxl-6'>
                <div className='row'>

                    {/* formulario para actualizar usuario */}

                    <FormActualizarUser
                        cargandoUpdateUser={cargandoUpdateUser}
                        manejarActualizarUser={manejarActualizarUser}
                        userData={entrenadorData?.user}
                        isDisabled={!(isAdmin || isPropietario)} // true si no eres o admin o propietario
                    />
                </div>
            </div>

            {
                // eliminar entrenador
                // solo aparecen a los admins

                isAdmin && (
                    <div className='col-12 eliminar-entrenador'>

                        <ButtonDelete
                            cargando={cargandoDestroyEntrenador}
                            onClick={manejarEliminarEntrenador}
                        >
                            <i className='bi bi-exclamation-triangle' /> ELIMINAR ENTRENADOR <i className='bi bi-exclamation-triangle' />
                        </ButtonDelete>

                    </div>
                )
            }

        </div>
    );
}

export default DatosEntrenador;
