import { ref } from 'vue';
import postAcceso from '@services/postAcceso';

const usePostAcceso = () => {

    const cargando = ref(false);

    function setCargando(valor) {
        cargando.value = valor;
    }

    const crearAcceso = async (datos) => {

        // empieza a cargar
        setCargando(true);

        try {

            // recoge los datos devueltor por el servicio
            const dataService = await postAcceso(datos);

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

    return ({ crearAcceso, cargando });
}

export default usePostAcceso;
