import FormCrearSocio from '@components/common/FormCrearSocio/FormCrearSocio';

import { useCrearSocio } from '@hooks/useSocio';

const CrearSocio = () => {

    const { crearSocio, cargando, error } = useCrearSocio();

    const manejarCrearSocio = async (dataFormSocio) => {

        const respuestaCrearSocio = await crearSocio(dataFormSocio);

        if (respuestaCrearSocio) {
            console.log('socio creado');
        }
    }

    return (
        <FormCrearSocio manejarCrearSocio={manejarCrearSocio} cargando={cargando} error={error} />
    );
}

export default CrearSocio;
