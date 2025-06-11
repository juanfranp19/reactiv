import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import FormCrearSocio from '@components/ui/FormCrearSocio/FormCrearSocio';
import FormCrearUserSocio from '@components/ui/FormCrearUserSocio/FormCrearUserSocio';

import { useRegister } from '@hooks/useAuth';
import { useObtenerSocios, useCrearSocio } from '@hooks/useSocio';

const EntrenadorSocioCrear = () => {

    const { register, cargando: cargandoCrearUser } = useRegister();

    const { sociosData, cargando: cargandoSociosData, refresh: actualizarSocios } = useObtenerSocios();
    const { crearSocio, cargando: cargandoCrearSocio } = useCrearSocio();

    // función que envía datos al servicio para crear el socio
    const manejarCrearSocio = async (dataFormSocio) => {

        // envía petición
        const respuestaCrearSocio = await crearSocio(dataFormSocio);

        // si da OK, actualiza los datos de los socios (para que se actualicen en el Select de FormCrearUser)
        if (respuestaCrearSocio) {
            console.log('socio creado');
            actualizarSocios();
        }
    }

    // función que envía datos al servicio para registrar al usuario
    const manejarCrearUser = async (dataFormUser) => {

        // envía petición
        const respuestaCrearUser = await register(dataFormUser);

        // si da OK, actualiza los datos de los socios (para que se actualicen en el Select de FormCrearUser)
        if (respuestaCrearUser) {
            console.log('user creado');
            actualizarSocios();
        }
    }

    return (
        <main>
            <DashboardCabecera>
                Registrar nuevo socio
            </DashboardCabecera>

            {/* formularios para crear socio y usuario */}
            <div className='row'>

                <div className='col-12 col-xxl-6'>

                    {/* crear socio */}
                    <div className='row'>
                        <FormCrearSocio
                            cargandoCrearSocio={cargandoCrearSocio}
                            manejarCrearSocio={manejarCrearSocio}
                        />
                    </div>

                </div>
                <div className='col-12 col-xxl-6'>

                    {/* crear usuario */}
                    <div className='row'>
                        <FormCrearUserSocio
                            cargandoCrearUser={cargandoCrearUser}
                            cargandoSociosData={cargandoSociosData}
                            manejarCrearUser={manejarCrearUser}
                            sociosData={sociosData}
                        />
                    </div>

                </div>

            </div>
        </main>
    );
}

export default EntrenadorSocioCrear;
