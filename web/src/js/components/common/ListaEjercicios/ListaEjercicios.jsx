const API_URL = import.meta.env.VITE_API_URL;

import { useRef } from 'react';
import { Tooltip } from 'react-tooltip';

import { useObtenerEjercicios } from '@hooks/useEjercicio';

const DESPLAZAMIENTO_NORMAL = 800;
const DESPLAZAMIENTO_RAPIDO = 3000;

const ListaEjercicios = () => {

    const { ejerciciosData, cargando: cargandoEjerciciosData } = useObtenerEjercicios();

    const scrollingContainer = useRef();

    // funciones para hacer scroll normal

    function normalScrollingLeft() {
        scrollingContainer.current.scrollLeft -= DESPLAZAMIENTO_NORMAL;
    }
    function normalScrollingRight() {
        scrollingContainer.current.scrollLeft += DESPLAZAMIENTO_NORMAL;
    }

    // funciones para hacer scroll más rápido

    function superScrollingLeft() {
        scrollingContainer.current.scrollLeft -= DESPLAZAMIENTO_RAPIDO;
    }
    function superScrollingRight() {
        scrollingContainer.current.scrollLeft += DESPLAZAMIENTO_RAPIDO;
    }

    return (
        <div className='row lista-ejercicios'>
            <div className='col-12'>

                {/* botones de scroll */}

                <div className='scrolling-buttons-container'>
                    <button className='btn' onClick={normalScrollingLeft}><i className='bi bi-chevron-compact-left' /></button>
                    <button className='btn' onClick={normalScrollingRight}><i className='bi bi-chevron-compact-right' /></button>
                </div>

                <div className='scrolling-buttons-container'>
                    <button className='btn' onClick={superScrollingLeft}><i className='bi bi-chevron-double-left' /></button>
                    <button className='btn' onClick={superScrollingRight}><i className='bi bi-chevron-double-right' /></button>
                </div>

                {/* todas las imágenes */}

                <div className='scrolling-container' ref={scrollingContainer}>
                    {
                        cargandoEjerciciosData ? (
                            'cargando'
                        ) : (
                            ejerciciosData?.map(ejercicio => (

                                // imagen

                                <div className='scrolling-card' key={ejercicio?.id}>
                                    <img
                                        src={`${API_URL}/storage/ejercicios/imagen/${ejercicio?.imagen}`}
                                        alt={ejercicio?.nombre}
                                        data-tooltip-id='ejercicio-tooltip'
                                        data-tooltip-content={ejercicio?.nombre}
                                    />

                                    <Tooltip id='ejercicio-tooltip' />
                                </div>
                            ))
                        )
                    }
                </div>

            </div>
        </div>
    );
}

export default ListaEjercicios;
