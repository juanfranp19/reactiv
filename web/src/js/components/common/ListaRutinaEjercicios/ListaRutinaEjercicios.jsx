import { useState } from 'react';
import CheckboxDesplegable from '@components/ui/CheckboxDesplegable/CheckboxDesplegable';
import EjercicioCard from '@components/ui/EjercicioCard/EjercicioCard';
import { useObtenerEjerciciosRutina } from '@hooks/useEjercicioRutina';

const ListaRutinaCalentamientos = ({ rutina }) => {

    const { ejerciciosRutinaData } = useObtenerEjerciciosRutina(rutina);
    const [checked, setChecked] = useState(false);

    console.log('ejercicios', ejerciciosRutinaData?.ejercicios);

    function obtenerEjercicioCards() {

        // no devuelve nada si aún no ha cargado
        if (!ejerciciosRutinaData?.ejercicios) return null;

        if (checked) return ejerciciosRutinaData.ejercicios
            .map((ejercicio) => (
                <EjercicioCard
                    key={ejercicio.id}
                    nombre={ejercicio.nombre}
                    imagen={ejercicio.imagen}
                    num_series={ejercicio.pivot.num_series}
                    num_repeticiones={ejercicio.pivot.num_repeticiones}
                    grupo_muscular={ejercicio.grupo_muscular.nombre}
                />
            ));
    }

    function isChecked() {
        setChecked(!checked);
    }

    return (
        <div className='row'>
            <div className='col-12'>

                <div className='row desplegable-rutina-ejercicios'>
                    <div className='col-12 checkbox-font'>
                        Ejercicios <CheckboxDesplegable isChecked={isChecked} />
                    </div>
                </div>

                <div className='row lista-rutina-ejercicios'>
                    {obtenerEjercicioCards()}
                </div>
            </div>
        </div>
    );
}

export default ListaRutinaCalentamientos;
