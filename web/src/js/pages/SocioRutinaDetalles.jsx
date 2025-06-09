import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

import AddCalentamientosEjercicios from '@components/common/AddCalentamientosEjercicios/AddCalentamientosEjercicios';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import ListaRutinaCalentamientos from '@components/common/ListaRutinaCalentamientos/ListaRutinaCalentamientos';
import ListaRutinaEjercicios from '@components/common/ListaRutinaEjercicios/ListaRutinaEjercicios';

import ButtonCancel from '@components/ui/ButtonCancel/ButtonCancel';
import ButtonDelete from '@components/ui/ButtonDelete/ButtonDelete';
import ButtonEdit from '@components/ui/ButtonEdit/ButtonEdit';
import ButtonSave from '@components/ui/ButtonSave/ButtonSave';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';

import { useActualizarRutina, useEliminarRutina } from '@hooks/useRutina';
import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const SocioRutinaDetalles = () => {

    const navigateTo = useNavigate();
    const { rutaIdRutina } = useParams();
    const { socioId } = useToken();

    const { socioData, cargando: cargandoSocioData, refresh: refreshSocioData } = useObtenerSocio(socioId);
    const { updateRutina, cargando: cargandoUpdateRutina } = useActualizarRutina();
    const { destroyRutina, cargando: cargandoDestroyRutina } = useEliminarRutina();

    const [idRutina, setIdRutina] = useState(null);
    const [nombreRutina, setNombreRutina] = useState('');
    const [descripcionRutina, setDescripcionRutina] = useState('');

    const [editMode, setEditMode] = useState(false);

    function salirEditMode() {
        setEditMode(false);
    }
    function activarEditMode() {
        setEditMode(true);
    }

    // modelo de Rutina
    const RUTINA = {
        NOMBRE: 'nombre',
        DESCRIPCION: 'descripcion',
    }

    // Rutina en su estado inicial
    const RUTINAINICIAL = {
        nombre: '',
        descripcion: '',
    }

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
        reset,
    } = useForm({ defaultValues: RUTINAINICIAL });

    // función que actualiza el seguimiento llamando al servicio
    const guardarRutina = handleSubmit(async (rutinaActualizada) => {

        // manda petición al servicio
        const respuestaUpdate = await updateRutina(rutinaActualizada, idRutina);

        // si hay respuesta
        if (respuestaUpdate) {

            salirEditMode();
            refreshSocioData();
        }
    });

    // función que elimina el seguimiento llamando al servicio
    const eliminarRutina = async () => {

        // manda petición al servicio
        const respuestaDestroy = await destroyRutina(idRutina);

        // si hay respuesta
        if (respuestaDestroy) {

            // redirige a la página donde se encuentran todas las rutinas
            navigateTo(-1);
        }
    }

    // completa los campos
    useEffect(() => {
        reset({
            nombre: nombreRutina,
            descripcion: descripcionRutina,
        });
    }, [descripcionRutina, nombreRutina, reset]);

    // useCallback para funciones que luego se pasan a componentes hijos que memorizan datos,
    // por ejemplo: idRutina, que se obtiene aquí dentro y luego pasa a un componente hijo
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
                setDescripcionRutina(encontrarRutina.descripcion);
            } else {
                // si la rutina no la encuentra en el socio, redirije a la ruta anterior
                navigateTo(-1);
            }
        }
    }, [socioData, rutaIdRutina, navigateTo]);

    useEffect(obtenerRutinaId, [obtenerRutinaId]);

    if (cargandoSocioData || !idRutina) return (
        <div className='row'>cargando</div>
    );

    return (
        <main>
            <DashboardCabecera propLastBC={nombreRutina}>
                Rutina
            </DashboardCabecera>

            <div className='row'>
                {/* botones editar y cancelar */}
                <div className='col-12 datos-calentamientos-seguimientos-edit'> {/* estilos se encuentran en js/components/common/DatosSeguimiento/_DatosSeguimiento.scss */}
                    {
                        editMode
                            ? (
                                // botones para modo editar
                                <>
                                    <ButtonSave onClick={guardarRutina} cargando={cargandoUpdateRutina}>
                                        Guardar cambios
                                    </ButtonSave>

                                    <ButtonCancel onClick={salirEditMode}>
                                        Salir del modo editar
                                    </ButtonCancel>
                                </>
                            ) : (
                                // botones para modo no editar
                                <>
                                    <ButtonEdit onClick={activarEditMode}>
                                        Editar
                                    </ButtonEdit>

                                    <ButtonDelete onClick={eliminarRutina} cargando={cargandoDestroyRutina}>
                                        ELIMINAR RUTINA
                                    </ButtonDelete>
                                </>
                            )
                    }
                </div>
            </div>

            <div className='row'>

                {/* nombre de la rutina */}
                <div className='col-12 subtitulo-dashboard'>
                    {
                        editMode
                            ? (
                                // modo editar
                                <form>
                                    <div className='campo'>
                                        <label htmlFor={RUTINA.NOMBRE} className='col-form-label col-form-label-lg'>Nombre</label>
                                        <input type='text' id={RUTINA.NOMBRE} className='form-control form-control-lg'

                                            {...register(RUTINA.NOMBRE, {
                                                required: {
                                                    value: true,
                                                    message: 'Es obligatorio asignarle un nombre a la rutina',
                                                },
                                            })}
                                        />
                                        <ErrorInput>{errors.nombre?.message}</ErrorInput>
                                    </div>
                                </form>
                            ) : (
                                // modo no editar
                                nombreRutina
                            )
                    }
                </div>

                {/* descripción de la rutina */}
                <div className='col-12 subtitulo-dashboard'>
                    {
                        editMode
                            ? (
                                // modo editar
                                <form>
                                    <div className='campo'>
                                        <label htmlFor={RUTINA.DESCRIPCION} className='col-form-label col-form-label-lg'>Descripción</label>
                                        <textarea id={RUTINA.DESCRIPCION} className='form-control form-control-lg' placeholder='Opcional'

                                            {...register(RUTINA.DESCRIPCION)}
                                        />
                                    </div>
                                    {/* JSON.stringify(watch()) */}
                                </form>
                            ) : (
                                // modo no editar
                                descripcionRutina
                            )
                    }
                </div>
            </div>

            <AddCalentamientosEjercicios />

            <ListaRutinaCalentamientos rutina={idRutina} />
            <ListaRutinaEjercicios rutina={idRutina} />
        </main>
    );
}

export default SocioRutinaDetalles;
