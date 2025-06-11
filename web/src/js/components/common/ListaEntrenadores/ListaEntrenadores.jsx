const API_URL = import.meta.env.VITE_API_URL;

import { useState } from 'react';
import { Link } from 'react-router-dom';

import ButtonDark from '@components/ui/ButtonDark/ButtonDark';

import { useObtenerEntrenadores } from '@hooks/useEntrenador';

const ListaEntrenadores = () => {

    const { entrenadoresData, cargando: cargandoEntrenadoresData } = useObtenerEntrenadores();

    const [nombreFiltrado, setNombreFiltrado] = useState('');

    const [numEntrenadoresMostrados, setNumEntrenadoresMostrados] = useState(10);

    // función que actualiza el estado del nombre filtrado dependiendo del valor del input
    function actualizarNombreFiltrado(e) {
        setNombreFiltrado(e.target.value);
    }

    // filta los entrenadores por nombre y apellido según el input
    function entrenadoresFiltrados() {

        return entrenadoresData.filter(entrenador => {
            // monta el nombre completo y devuelve el nombre completo en minúscula para que se pueda buscar un nombre poniéndolo en minúscula
            const nombreCompleto = `${entrenador.nombre} ${entrenador.apellidos}`.toLowerCase();
            return nombreCompleto.includes(nombreFiltrado.toLowerCase());
        });
    }

    // muestra los entrenadores desde el índice 0 del array entrenadoresData hasta el índice que coincida con el número de entrenadores mostrados
    const entrenadoresMostrados = entrenadoresFiltrados().slice(0, numEntrenadoresMostrados);

    // aumenta el número de entrenadores mostrados
    function cargarMasEntrenadores() {
        setNumEntrenadoresMostrados(prev => prev + 20);
    }

    return (
        <div className='row'>

            {/* input para filtrar */}

            <div className='col-12 filtrar-lista-entrenadores'>

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

            {/* tabla con los entrenadores */}

            <div className='col-12 lista-entrenadores'>
                {
                    cargandoEntrenadoresData ? (
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
                                {entrenadoresMostrados.map(entrenador => (
                                    <tr key={entrenador.id}>
                                        <td>{entrenador.id}</td>
                                        <td>
                                            {entrenador.imagen ? (
                                                <img
                                                    className='entrenador-img'
                                                    src={`${API_URL}/storage/local/entrenadores/imagen/${entrenador.imagen}`}
                                                    alt={entrenador.nombre}
                                                />
                                            ) : (
                                                <i className='bi bi-person-circle' />
                                            )}
                                        </td>
                                        <td>{entrenador.nombre} {entrenador.apellidos}</td>
                                        <td className='d-none d-lg-table-cell'>{entrenador.email}</td>
                                        <td className='d-none d-sm-table-cell'>{entrenador.telefono}</td>
                                        <td className='d-none d-sm-table-cell'>{entrenador.user?.name}</td>
                                        <td>
                                            {/* botón para ver detalles */}

                                            <div className='btn-detalles'>
                                                <Link to={`detalles/${entrenador.id}`}>
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
            <div className='col-12 btn-cargar-mas-lista-entrenadores'>
                {
                    // mientras haya entrenadores por mostrar, aparecerá el botón para mostrar más
                    entrenadoresMostrados.length < entrenadoresFiltrados().length && (
                        <ButtonDark onClick={cargarMasEntrenadores}>
                            <i className='bi bi-file-earmark-spreadsheet' /> <i className='bi bi-file-earmark-arrow-down' /> Cargar más
                        </ButtonDark>
                    )
                }
            </div>

        </div>
    );
}

export default ListaEntrenadores;
