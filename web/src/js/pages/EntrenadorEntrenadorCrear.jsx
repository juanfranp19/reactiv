import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import FormCrearEntrenador from '@components/ui/FormCrearEntrenador/FormCrearEntrenador';
import FormCrearUserEntrenador from '@components/ui/FormCrearUserEntrenador/FormCrearUserEntrenador';

import { useRegister } from '@hooks/useAuth';
import { useObtenerEntrenadores, useCrearEntrenador } from '@hooks/useEntrenador';

const EntrenadorEntrenadorCrear = () => {

    const { register, cargando: cargandoCrearUser } = useRegister();

    const { entrenadoresData, cargando: cargandoEntrenadoresData, refresh: actualizarEntrenadores } = useObtenerEntrenadores();
    const { crearEntrenador, cargando: cargandoCrearEntrenador } = useCrearEntrenador();

    // función que envía datos al servicio para crear el entrenador
    const manejarCrearEntrenador = async (dataFormEntrenador) => {

        // envía petición
        const respuestaCrearEntrenador = await crearEntrenador(dataFormEntrenador);

        // si da OK, actualiza los datos de los entrenadores (para que se actualicen en el Select de FormCrearUserEntrenador)
        if (respuestaCrearEntrenador) {
            console.log('socio creado');
            actualizarEntrenadores();
        }
    }

    // función que envía datos al servicio para registrar al usuario
    const manejarCrearUser = async (dataFormUser) => {

        // envía petición
        const respuestaCrearUser = await register(dataFormUser);

        // si da OK, actualiza los datos de los socios (para que se actualicen en el Select de FormCrearUserEntrenador)
        if (respuestaCrearUser) {
            console.log('user creado');
            actualizarEntrenadores();
        }
    }

    return (
        <main>
            <DashboardCabecera>
                Registrar nuevo entrenador
            </DashboardCabecera>

            {/* formularios para crear socio y usuario */}
            <div className='row'>

                <div className='col-12 col-xxl-6'>

                    {/* crear socio */}
                    <div className='row'>
                        <FormCrearEntrenador
                            cargandoCrearEntrenador={cargandoCrearEntrenador}
                            manejarCrearEntrenador={manejarCrearEntrenador}
                        />
                    </div>

                </div>
                <div className='col-12 col-xxl-6'>

                    {/* crear usuario */}
                    <div className='row'>
                        <FormCrearUserEntrenador
                            cargandoCrearUser={cargandoCrearUser}
                            cargandoEntrenadoresData={cargandoEntrenadoresData}
                            manejarCrearUser={manejarCrearUser}
                            entrenadoresData={entrenadoresData}
                        />
                    </div>

                </div>

            </div>
        </main>
    );
}

export default EntrenadorEntrenadorCrear;
