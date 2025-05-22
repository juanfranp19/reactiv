import { useState } from 'react';
import CalentamientoCard from '@components/ui/CalentamientoCard/CalentamientoCard';
import CheckboxDesplegable from '@components/ui/CheckboxDesplegable/CheckboxDesplegable';
import { useObtenerCalentamientosRutina } from '@hooks/useCalentamientoRutina';

const ListaRutinaCalentamientos = ({ rutina }) => {

    const { calentamientosRutinaData, cargando } = useObtenerCalentamientosRutina(rutina);
    const [checked, setChecked] = useState(true);

    console.log('calentamientos', calentamientosRutinaData);

    function obtenerCalentamientoCards() {

        // mete a los calentamientos en esta constante
        const listaCalentamientos = calentamientosRutinaData?.calentamientos ?? calentamientosRutinaData ?? [];
        
        //console.log('lista de calentamientos:', listaCalentamientos);

        if (cargando) return 'Cargando...';
        
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
                        nombre={calentamiento.nombre}
                        imagen={calentamiento.imagen}
                        tiempo={calentamiento.pivot?.tiempo}
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
                <div className='row desplegable-rutina-calentamientos'>
                    <div className='col-12 checkbox-font'>
                        Calentamientos <CheckboxDesplegable isChecked={isChecked} />
                    </div>
                </div>

                {/* lista de calentamientos */}
                <div className='row lista-rutina-calentamientos'>
                    {obtenerCalentamientoCards()}
                </div>

            </div>
        </div>
    );
}

export default ListaRutinaCalentamientos;
