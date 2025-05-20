import FormCrearRutina from '@components/ui/FormCrearRutina/FormCrearRutina';
import { useCrearRutina } from '@hooks/useRutina';
const SocioRutinaCrear = () => {

    const { crearRutina, cargando } = useCrearRutina();

    const manejarCrearRutina = async (nuevaRutina) => {

        const respuestaCrearRutina = await crearRutina(nuevaRutina);

        if (respuestaCrearRutina) {
            console.log('rutina creada');
        }
    }

    return (
        <main>
            <div className='row'>
                <FormCrearRutina manejarCrearRutina={manejarCrearRutina} cargando={cargando} />
            </div>
        </main>
    );
}

export default SocioRutinaCrear;
