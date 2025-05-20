import { useState } from 'react';
import CalentamientoCard from '@components/ui/CalentamientoCard/CalentamientoCard';
import CheckboxDesplegable from '@components/ui/CheckboxDesplegable/CheckboxDesplegable';
import { useObtenerCalentamientosRutina } from '@hooks/useCalentamientoRutina';

const ListaRutinaCalentamientos = ({ rutina }) => {

    const { calentamientosRutinaData } = useObtenerCalentamientosRutina(rutina);
    const [checked, setChecked] = useState(false);

    console.log('calentamientos', calentamientosRutinaData?.calentamientos);

    function obtenerCalentamientoCards() {

        // no devuelve nada si aún no ha cargado
        if (!calentamientosRutinaData?.calentamientos) return null;

        if (checked) return calentamientosRutinaData.calentamientos
            .map((calentamiento) => (
                <CalentamientoCard
                    key={calentamiento.id}
                    nombre={calentamiento.nombre}
                    imagen={calentamiento.imagen}
                    tiempo={calentamiento.pivot.tiempo}
                />
            ));
    }

    function isChecked() {
        setChecked(!checked);
    }

    return (
        <div className='row'>
            <div className='col-12'>

                <div className='row desplegable-rutina-calentamientos'>
                    <div className='col-12 checkbox-font'>
                        Calentamientos <CheckboxDesplegable isChecked={isChecked} />
                    </div>
                </div>

                <div className='row lista-rutina-calentamientos'>
                    {obtenerCalentamientoCards()}
                </div>
            </div>
        </div>
    );
}

export default ListaRutinaCalentamientos;
