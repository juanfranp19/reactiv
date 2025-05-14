import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const RutinaCard = ({ id, nombre, descripcion }) => {

    const [rutaVerRutina, setRutaVerRutina] = useState('');

    function formatearRuta() {
        // coge el nombre de la rutina, pasa las mayúsculas a minúsculas y los espacios a guiones
        const nombreFormateado = nombre.toLowerCase().replace(/\s+/g, '-');

        // pasará al nombre de la ruta la cuál se mostrará información de esa rutina en específico
        setRutaVerRutina(nombreFormateado);
    }

    useEffect(formatearRuta, [nombre]);

    return (
        <div className='col-12 col-md-6 col-xlg-4 rutina-card'>

            {/* aparece a partir de SM */}
            <div className='row d-none d-sm-block'>
                {/* lleva a la ruta con el nombre de la rutina */}
                <NavLink to={rutaVerRutina} className='navLink'>
                    <div className='col-12 item'>
                        <div className='row'>

                            <div className='col-12 imagen'>
                                <div className='fondo' />
                            </div>
                            <div className='col-12 nombre'>{nombre}</div>
                            <div className='col-12 desc'>{descripcion}</div>
                        </div>
                    </div>
                </NavLink>
            </div>

            {/* accordion para que la información de la rutina esté en un menú desplegable, solo para móvil */}
            <div className='row d-sm-none'>
                <div className='accordion' id='accordionRutinaCard'>
                    <div className='accordion-item'>
                        <h2 className='accordion-header'>
                            {/* botón del accordion */}
                            <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target={'#collapseOne' + id} aria-expanded='true' aria-controls={'collapseOne' + id}>
                                {/* nombre de la rutina */}
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-12'>{nombre}</div>
                                    </div>
                                </div>
                            </button>
                        </h2>

                        {/* todo lo que aparece en el desplegable del accordion */}
                        <div id={'collapseOne' + id} className='accordion-collapse collapse'>
                            <div className='accordion-body'>
                                
                                {/* descripción de la rutina */}
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-12'>{descripcion}</div>

                                        <div className='col-12'>
                                            <button type='button' className='btn btn-ver-rutina'>
                                                {/* lleva a la ruta con el nombre de la rutina */}
                                                <NavLink to={rutaVerRutina} className='navLink'>
                                                    Ver más
                                                </NavLink>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RutinaCard;
