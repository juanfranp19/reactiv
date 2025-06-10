const API_URL = import.meta.env.VITE_API_URL;

import { useState } from 'react';
import { Link } from 'react-router-dom';

import ButtonDark from '@components/ui/ButtonDark/ButtonDark';

import { useObtenerSocios } from '@hooks/useSocio';

const ListaSocios = () => {

    const { sociosData, cargando: cargandoSociosData } = useObtenerSocios();

    const [nombreFiltrado, setNombreFiltrado] = useState('');

    const [numSociosMostrados, setNumSociosMostrados] = useState(10);

    // función que actualiza el estado del nombre filtrado dependiendo del valor del input
    function actualizarNombreFiltrado(e) {
        setNombreFiltrado(e.target.value);
    }

    // filta los socios por nombre y apellido según el input
    function sociosFiltrados() {

        return sociosData.filter(socio => {
            // monta el nombre completo y devuelve el nombre completo en minúscula para que se pueda buscar un nombre poniéndolo en minúscula
            const nombreCompleto = `${socio.nombre} ${socio.apellidos}`.toLowerCase();
            return nombreCompleto.includes(nombreFiltrado.toLowerCase());
        });
    }

    // muestra los socios desde el índice 0 del array socioData hasta el índice que coincida con el número de socios mostrados
    const sociosMostrados = sociosFiltrados().slice(0, numSociosMostrados);

    // aumenta el número de socios mostrados
    function cargarMasSocios() {
        setNumSociosMostrados(prev => prev + 20);
    }

    return (
        <div className='row'>

            {/* input para filtrar */}
            <div className='col-12 filtrar-lista-socios'>

                <form className='row'>
                    <div className='col-12 campo'>

                        <div className='input-group'>
                            <span className='input-group-text'>
                                <i className='bi bi-search' />
                            </span>

                            <input
                                type='text'
                                className='form-control form-control-lg'
                                placeholder='Buscar por nombre y apellidos'
                                value={nombreFiltrado}
                                onChange={actualizarNombreFiltrado}
                            />
                        </div>

                    </div>
                </form>

            </div>

            {/* tabla con los socios */}
            <div className='col-12 lista-socios'>
                {
                    cargandoSociosData ? (
                        'Cargando tabla...'
                    ) : (<>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nº</th>
                                    <th></th>
                                    <th>Nombre</th>
                                    <th className='d-none d-lg-table-cell'>Email</th>
                                    <th className='d-none d-sm-table-cell'>Teléfono</th>
                                    <th className='d-none d-sm-table-cell'>Usuario</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sociosMostrados.map(socio => (
                                    <tr key={socio.id}>
                                        <td>{socio.id}</td>
                                        <td>
                                            {socio.imagen ? (
                                                <img
                                                    className='socio-img'
                                                    src={`${API_URL}/storage/local/socios/imagen/${socio.imagen}`}
                                                    alt={socio.nombre}
                                                />
                                            ) : (
                                                <i className='bi bi-person-circle' />
                                            )}
                                        </td>
                                        <td>{socio.nombre} {socio.apellidos}</td>
                                        <td className='d-none d-lg-table-cell'>{socio.email}</td>
                                        <td className='d-none d-sm-table-cell'>{socio.telefono}</td>
                                        <td className='d-none d-sm-table-cell'>{socio.user.name}</td>
                                        <td>
                                            {/* botón para ver detalles */}

                                            <div className='btn-detalles'>
                                                <Link to={`detalles/${socio.id}`}>
                                                    <ButtonDark>
                                                        <i className='bi bi-journal-text' /> Detalles
                                                    </ButtonDark>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>)
                }
            </div>

            {/* botón para mostrar más */}
            <div className='col-12 btn-cargar-mas-lista-socios'>
                {
                    // mientras haya socios por mostrar, aparecerá el botón para mostrar más
                    sociosMostrados.length < sociosFiltrados().length && (
                        <ButtonDark onClick={cargarMasSocios}>
                            <i className='bi bi-file-earmark-spreadsheet' /> <i className='bi bi-file-earmark-arrow-down' /> Cargar más
                        </ButtonDark>
                    )
                }
            </div>

        </div>
    );
}

export default ListaSocios;
