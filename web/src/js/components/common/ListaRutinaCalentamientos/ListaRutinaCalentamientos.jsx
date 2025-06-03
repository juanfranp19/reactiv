import { useState } from 'react';
import { useParams } from 'react-router-dom';

import CalentamientoCard from '@components/ui/CalentamientoCard/CalentamientoCard';
import CheckboxDesplegable from '@components/ui/CheckboxDesplegable/CheckboxDesplegable';

import { useObtenerCalentamientosRutina, useActualizarCalentamientoRutina, useDetachCalentamientoRutina } from '@hooks/useCalentamientoRutina';

const ListaRutinaCalentamientos = ({ rutina }) => {

    const { rutaIdRutina } = useParams();
    const { calentamientosRutinaData, cargando: cargandoCalentamientosRutina, recargar } = useObtenerCalentamientosRutina(rutina);
    const { updateCalentamientoRutina, cargando: cargandoUpdateCalentamientosRutina } = useActualizarCalentamientoRutina();
    const { detachCalentamientoRutina, cargando: cargandoDetachCalentamientosRutina } = useDetachCalentamientoRutina();

    const [checked, setChecked] = useState(true);

    // función para actualizar el calentamiento
    const manejarUpdateCalentamiento = async (calentamientoActualizado) => {

        // coge la respuesta de la API
        const respuestaUpdateCalentamiento = await updateCalentamientoRutina(calentamientoActualizado, rutaIdRutina);

        // si hay respuesta
        if (respuestaUpdateCalentamiento) {
            console.log('calentamiento actualizado', respuestaUpdateCalentamiento);

            // recarga los datos de los calentamientos
            recargar();
        }
    }

    // función para eliminar el calentamiento
    const manejarDetachCalentamiento = async (calentamientoEliminado) => {

        // coge la respuesta de la API
        const respuestaDetachCalentamiento = await detachCalentamientoRutina(calentamientoEliminado, rutaIdRutina);

        // si hay respuesta
        if (respuestaDetachCalentamiento) {
            console.log('calentamiento actualizado', respuestaDetachCalentamiento);

            // recarga los datos de los calentamientos
            recargar();
        }
    }

    // función para obtener todos los calentamientos
    function obtenerCalentamientoCards() {

        // mete a los calentamientos en esta constante
        const listaCalentamientos = calentamientosRutinaData?.calentamientos ?? calentamientosRutinaData ?? [];

        if (cargandoCalentamientosRutina) return 'Cargando...';

        // si no tiene calentamientos, undefined o 0 en array
        if (!Array.isArray(listaCalentamientos) || listaCalentamientos?.length <= 0) {
            return 'No hay calentamientos';
        }

        // aparecen los calentamientos si el checkbox está pulsado
        if (checked) return (
            listaCalentamientos
                ?.map((calentamiento) => (
                    <CalentamientoCard
                        key={calentamiento.id}
                        id={calentamiento.id}
                        nombre={calentamiento.nombre}
                        imagen={calentamiento.imagen}
                        tiempo={calentamiento.pivot?.tiempo}
                        manejarUpdateCalentamiento={manejarUpdateCalentamiento}
                        manejarDetachCalentamiento={manejarDetachCalentamiento}
                        cargandoUpdate={cargandoUpdateCalentamientosRutina}
                        cargandoDetach={cargandoDetachCalentamientosRutina}
                        showDetails={true}
                        canEdit={true}
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
                <div className='row desplegable-rut-seg-calentamientos'>
                    <div className='col-12 checkbox-font'>
                        Calentamientos <CheckboxDesplegable isChecked={isChecked} />
                    </div>
                </div>

                {/* lista de calentamientos */}
                <div className='row lista-rut-seg-calentamientos'>
                    {obtenerCalentamientoCards()}
                </div>

            </div>
        </div>
    );
}

export default ListaRutinaCalentamientos;
