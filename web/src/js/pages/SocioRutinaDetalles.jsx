import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import AddCalentamientosEjercicios from '@components/common/AddCalentamientosEjercicios/AddCalentamientosEjercicios';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import ListaRutinaCalentamientos from '@components/common/ListaRutinaCalentamientos/ListaRutinaCalentamientos';
import ListaRutinaEjercicios from '@components/common/ListaRutinaEjercicios/ListaRutinaEjercicios';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const SocioRutinaDetalles = () => {

    const navigateTo = useNavigate();
    const { rutaIdRutina } = useParams();
    const { id } = useToken();
    const { socioData, cargando } = useObtenerSocio(id);

    const [idRutina, setIdRutina] = useState(null);
    const [nombreRutina, setNombreRutina] = useState('');

    // useCallback para funciones que luego se pasan a componentes hijos que memorizan datos
    const obtenerRutinaId = useCallback(() => {

        if (Array.isArray(socioData?.rutinas)) {

            // encuentra la rutina por el nombre de la ruta
            const encontrarRutina = socioData.rutinas.find(
                (rutina) => (rutina.id === +rutaIdRutina)
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
    }, [socioData, rutaIdRutina, navigateTo]);

    useEffect(obtenerRutinaId, [obtenerRutinaId]);

    if (cargando || !idRutina) return (
        <div className='row'>cargando</div>
    );

    return (
        <main>
            <DashboardCabecera propLastBC={nombreRutina}>
                Rutina
            </DashboardCabecera>

            <div className='row'>
                <div className='col-12 subtitulo-dashboard'>
                    {nombreRutina}
                </div>
            </div>

            <AddCalentamientosEjercicios />

            <ListaRutinaCalentamientos rutina={idRutina} />
            <ListaRutinaEjercicios rutina={idRutina} />
        </main>
    );
}

export default SocioRutinaDetalles;
