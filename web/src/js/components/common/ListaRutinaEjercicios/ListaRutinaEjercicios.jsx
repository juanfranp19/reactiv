import { useState } from 'react';
import { useParams } from 'react-router-dom';

import CheckboxDesplegable from '@components/ui/CheckboxDesplegable/CheckboxDesplegable';
import EjercicioCard from '@components/ui/EjercicioCard/EjercicioCard';

import { useObtenerEjerciciosRutina, useActualizarEjercicioRutina, useDetachEjercicioRutina } from '@hooks/useEjercicioRutina';

const ListaRutinaEjercicios = ({ rutina }) => {

    const { rutaIdRutina } = useParams();
    const { ejerciciosRutinaData, cargando: cargandoEjerciciosRutinaData, recargar } = useObtenerEjerciciosRutina(rutina);
    const { updateEjercicioRutina, cargando: cargandoUpdateEjerciciosRutina } = useActualizarEjercicioRutina();
    const { detachEjercicioRutina, cargando: cargandoDetachEjerciciosRutina } = useDetachEjercicioRutina();

    const [checked, setChecked] = useState(true);

    //console.log('ejercicios', ejerciciosRutinaData?.ejercicios);

    // función para actualizar el ejercicio
    const manejarUpdateEjercicio = async (ejercicioActualizado) => {

        // coge la respuesta de la API
        const respuestaUpdateEjercicio = await updateEjercicioRutina(ejercicioActualizado, rutaIdRutina);

        // si hay respuesta
        if (respuestaUpdateEjercicio) {
            console.log('ejercicio actualizado', respuestaUpdateEjercicio);

            // recarga los datos de los ejercicios
            recargar();
        }
    }

    // función para eliminar el ejercicio
    const manejarDetachEjercicio = async (ejercicioEliminado) => {

        // coge la respuesta de la API
        const respuestaDetachEjercicio = await detachEjercicioRutina(ejercicioEliminado, rutaIdRutina);

        // si hay respuesta
        if (respuestaDetachEjercicio) {
            console.log('ejercicio eliminado', respuestaDetachEjercicio);

            // recarga los datos de los ejercicios
            recargar();
        }
    }

    function obtenerEjercicioCards() {

        // mete a los ejercicios en esta constante
        const listaEjercicios = ejerciciosRutinaData?.ejercicios;

        if (cargandoEjerciciosRutinaData) return 'Cargando...';

        // si no tiene ejercicios, undefined o 0 en array
        if (!Array.isArray(listaEjercicios) || listaEjercicios?.length <= 0) {
            return 'No hay ejercicios';
        }

        // aparecen los ejercicios si el checkbox está pulsado
        if (checked) return (
            listaEjercicios
                ?.map((ejercicio) => (
                    <EjercicioCard
                        key={ejercicio.id}
                        id={ejercicio.id}
                        nombre={ejercicio.nombre}
                        imagen={ejercicio.imagen}
                        num_series={ejercicio.pivot.num_series}
                        num_repeticiones={ejercicio.pivot.num_repeticiones}
                        grupo_muscular={ejercicio.grupo_muscular.nombre}
                        manejarUpdateEjercicio={manejarUpdateEjercicio}
                        manejarDetachEjercicio={manejarDetachEjercicio}
                        cargandoUpdate={cargandoUpdateEjerciciosRutina}
                        cargandoDetach={cargandoDetachEjerciciosRutina}
                    />
                ))
        );
    }

    // cada click, el checkbox actualiza su estado
    function isChecked() {
        setChecked(!checked);
    }

    return (
        <div className='row'>
            <div className='col-12'>

                {/* checkbox con nombre */}
                <div className='row desplegable-rutina-ejercicios'>
                    <div className='col-12 checkbox-font'>
                        Ejercicios <CheckboxDesplegable isChecked={isChecked} />
                    </div>
                </div>

                {/* lista de ejercicios */}
                <div className='row lista-rutina-ejercicios'>
                    {obtenerEjercicioCards()}
                </div>

            </div>
        </div>
    );
}

export default ListaRutinaEjercicios;
