import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

import slugify from '@utils/slugify';

const SocioRutinaDetalles = () => {

    const navigateTo = useNavigate();
    const { nombreRutina } = useParams();
    const { id } = useToken();
    const { socioData, cargando } = useObtenerSocio(id);
    const [idRutina, setIdRutina] = useState('');

    function obtenerRutinaId() {
        
        if (Array.isArray(socioData?.rutinas)) {

            // encuentra la rutina por el nombre de la ruta
            const encontrarRutina = socioData.rutinas.find(
                (rutina) => (slugify(rutina.nombre) === nombreRutina)
            );

            if (encontrarRutina) {
                // añade al estado el id de la rutina encontrada
                setIdRutina(encontrarRutina.id);
            } else {
                // si la rutina no la encuentra en el socio, redirije a la ruta anterior
                navigateTo('/dashboard/rutinas');
            }
        }     
    }
    
    useEffect(obtenerRutinaId, [nombreRutina, socioData, navigateTo]);

    if (cargando) return (<div className='row'>cargando</div>);

    return (
        <div className='row'>el id es: {idRutina}</div>
    );
}

export default SocioRutinaDetalles;
