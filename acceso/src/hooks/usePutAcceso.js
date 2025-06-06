import { ref } from 'vue';
import putAcceso from '@services/putAcceso';

const usePutAcceso = () => {

    const cargando = ref(false);

    function setCargando(valor) {
        cargando.value = valor;
    }

    const actualizarAcceso = async (datos) => {

        // empieza a cargar
        setCargando(true);

        try {

            // recoge los datos devueltor por el servicio
            const dataService = await putAcceso(datos);

            // devuelve los datos recibidos del servicio
            return dataService;

        } catch (error) {

            console.error(error.message);
            return 0;

        } finally {

            // termina la carga
            setCargando(false);
        }
    }

    return ({ actualizarAcceso, cargando });
}

export default usePutAcceso;
