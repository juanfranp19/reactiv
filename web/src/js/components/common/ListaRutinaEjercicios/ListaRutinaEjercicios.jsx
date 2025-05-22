import { useState } from 'react';
import CheckboxDesplegable from '@components/ui/CheckboxDesplegable/CheckboxDesplegable';
import EjercicioCard from '@components/ui/EjercicioCard/EjercicioCard';
import { useObtenerEjerciciosRutina } from '@hooks/useEjercicioRutina';

const ListaRutinaCalentamientos = ({ rutina }) => {

    const { ejerciciosRutinaData, cargando } = useObtenerEjerciciosRutina(rutina);
    const [checked, setChecked] = useState(true);

    //console.log('ejercicios', ejerciciosRutinaData?.ejercicios);

    function obtenerEjercicioCards() {

        // mete a los ejercicios en esta constante
        const listaEjercicios = ejerciciosRutinaData?.ejercicios;

        if (cargando) return 'Cargando...';

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
                        nombre={ejercicio.nombre}
                        imagen={ejercicio.imagen}
                        num_series={ejercicio.pivot.num_series}
                        num_repeticiones={ejercicio.pivot.num_repeticiones}
                        grupo_muscular={ejercicio.grupo_muscular.nombre}
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

export default ListaRutinaCalentamientos;
