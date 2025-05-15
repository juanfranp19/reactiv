import { useObtenerEjerciciosRutina } from '@hooks/useEjercicioRutina';

const ListaRutinaEjercicios = ({ rutina }) => {

    const { ejerciciosRutinaData } = useObtenerEjerciciosRutina(rutina);

    console.log('ejercicios', ejerciciosRutinaData.ejercicios);

    return(
        <></>
    );
}

export default ListaRutinaEjercicios;
