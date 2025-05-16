import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import ListaRutinaCalentamientos from '@components/common/ListaRutinaCalentamientos/ListaRutinaCalentamientos';
import ListaRutinaEjercicios from '@components/common/ListaRutinaEjercicios/ListaRutinaEjercicios';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

import slugify from '@utils/slugify';

const SocioRutinaDetalles = () => {

    const navigateTo = useNavigate();
    const { nombreRuta } = useParams();
    const { id } = useToken();
    const { socioData, cargando } = useObtenerSocio(id);

    const [idRutina, setIdRutina] = useState('');
    const [nombreRutina, setNombreRutina] = useState('');

    // useCallback para funciones que luego se pasan a componentes hijos que memorizan datos
    const obtenerRutinaId = useCallback(() => {

        if (Array.isArray(socioData?.rutinas)) {

            // encuentra la rutina por el nombre de la ruta
            const encontrarRutina = socioData.rutinas.find(
                (rutina) => (slugify(rutina.nombre) === nombreRuta)
            );

            if (encontrarRutina) {
                // añade al estado el id de la rutina encontrada
                setIdRutina(encontrarRutina.id);
                setNombreRutina(encontrarRutina.nombre);
            } else {
                // si la rutina no la encuentra en el socio, redirije a la ruta anterior
                navigateTo('/dashboard/rutinas');
            }
        }
    }, [socioData, nombreRuta, navigateTo]);

    useEffect(obtenerRutinaId, [obtenerRutinaId]);

    if (cargando) return (
        <div className='row'>cargando</div>
    );

    return (
        <>
            <div className='row'>
                <div className='col-12 titulo-dashboard'>
                    Rutina
                </div>
                <div className='col-12 subtitulo-dashboard'>
                    {nombreRutina}
                </div>
            </div>

            <ListaRutinaCalentamientos rutina={idRutina} />
            <ListaRutinaEjercicios rutina={idRutina} />
        </>
    );
}

export default SocioRutinaDetalles;
