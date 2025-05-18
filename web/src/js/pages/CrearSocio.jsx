import FormCrearSocio from '@components/ui/FormCrearSocio/FormCrearSocio';
import { useCrearSocio } from '@hooks/useSocio';

const CrearSocio = () => {

    const { crearSocio, cargando } = useCrearSocio();

    const manejarCrearSocio = async (dataFormSocio) => {

        const respuestaCrearSocio = await crearSocio(dataFormSocio);

        if (respuestaCrearSocio) {
            console.log('socio creado');
        }
    }

    return (
        <main>
            <div className='row'>
                <FormCrearSocio manejarCrearSocio={manejarCrearSocio} cargando={cargando} />
            </div>
        </main>
    );
}

export default CrearSocio;
