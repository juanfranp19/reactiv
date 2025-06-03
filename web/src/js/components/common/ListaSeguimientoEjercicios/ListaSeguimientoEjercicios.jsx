import { useState } from 'react';
import { useParams } from 'react-router-dom';

import CheckboxDesplegable from '@components/ui/CheckboxDesplegable/CheckboxDesplegable';
import EjercicioCard from '@components/ui/EjercicioCard/EjercicioCard';

import { useObtenerEjerciciosSeguimiento, useDetachEjercicioSeguimiento } from '@hooks/useEjercicioSeguimiento';

const ListaSeguimientoEjercicios = ({ seguimiento }) => {

    const { rutaIdSeguimiento } = useParams();
    const { ejerciciosSeguimientoData, cargando: cargandoEjerciciosSeguimientoData, recargar } = useObtenerEjerciciosSeguimiento(seguimiento);
    const { detachEjercicioSeguimiento, cargando: cargandoDetachEjerciciosSeguimiento } = useDetachEjercicioSeguimiento();

    const [checked, setChecked] = useState(true);

    // función para eliminar el ejercicio
    const manejarDetachEjercicio = async (ejercicioEliminado) => {

        // coge la respuesta de la API
        const respuestaDetachEjercicio = await detachEjercicioSeguimiento(ejercicioEliminado, rutaIdSeguimiento);

        // si hay respuesta
        if (respuestaDetachEjercicio) {
            console.log('ejercicio eliminado', respuestaDetachEjercicio);

            // recarga los datos de los ejercicios
            recargar();
        }
    }

    function obtenerEjercicioCards() {

        // mete a los ejercicios en esta constante
        const listaEjercicios = ejerciciosSeguimientoData?.ejercicios;

        if (cargandoEjerciciosSeguimientoData) return 'Cargando...';

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
                        manejarDetachEjercicio={manejarDetachEjercicio}
                        cargandoDetach={cargandoDetachEjerciciosSeguimiento}
                        showDetails={false}
                        canEdit={false}
                        canDelete={true}
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
                <div className='row desplegable-rut-seg-ejercicios'>
                    <div className='col-12 checkbox-font'>
                        Ejercicios <CheckboxDesplegable isChecked={isChecked} />
                    </div>
                </div>

                {/* lista de ejercicios */}
                <div className='row lista-rut-seg-ejercicios'>
                    {obtenerEjercicioCards()}
                </div>

            </div>
        </div>
    );
}

export default ListaSeguimientoEjercicios;
