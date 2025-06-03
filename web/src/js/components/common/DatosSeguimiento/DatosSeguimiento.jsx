import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import Select from 'react-select';

import ButtonCancel from '@components/ui/ButtonCancel/ButtonCancel';
import ButtonDelete from '@components/ui/ButtonDelete/ButtonDelete';
import ButtonEdit from '@components/ui/ButtonEdit/ButtonEdit';
import ButtonSave from '@components/ui/ButtonSave/ButtonSave';
import RutinaCard from '@components/ui/RutinaCard/RutinaCard';

import { useObtenerSeguimiento, useActualizarSeguimiento, useEliminarSeguimiento } from '@hooks/useSeguimiento';
import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const DatosSeguimiento = (props) => {

    const navigateTo = useNavigate();
    const { id } = useToken();

    const { socioData, cargando: cargandoSocioData } = useObtenerSocio(id);

    const { seguimientoData, cargando: cargandoSeguimientoData, refresh: refreshSeguimientoData } = useObtenerSeguimiento(props.idSeguimiento);
    const { updateSeguimiento, cargando: cargandoUpdateSeguimiento } = useActualizarSeguimiento();
    const { destroySeguimiento, cargando: cargandoDestroySeguimiento } = useEliminarSeguimiento();

    const [editMode, setEditMode] = useState(false);

    function salirEditMode() {
        setEditMode(false);
    }
    function activarEditMode() {
        setEditMode(true);
    }
    function rutinaNull() {
        // vacía el campo de rutina_id
        setValue(SEGUIMIENTO.RUTINA_ID, null);
    }

    /**
     * 
     *  Funciones para react-select
     */
    function manejarRutinaSelectValue(rutinaSeleccionada) {

        // actualiza el valor en react-hook-form
        setValue(SEGUIMIENTO.RUTINA_ID, rutinaSeleccionada.value);

        // valida el campo, se llama el trigger porque Select no es un campo nativo de HTML
        trigger(SEGUIMIENTO.RUTINA_ID);
    }

    function obtenerRutinas() {

        // mientras se cargan los datos del socio
        if (cargandoSocioData || socioData.rutinas === undefined) return [{
            value: '',
            label: 'Cargando...',
            isDisabled: true,
        }];

        // obtiene los datos del socio del hook
        return socioData?.rutinas
            .map(rutina => ({
                value: rutina.id,
                label: rutina.nombre,
                label2: rutina.descripcion,
            }));
    }

    // modelo de Seguimiento
    const SEGUIMIENTO = {
        FECHA: 'fecha',
        OBSERVACIONES: 'observaciones',
        RUTINA_ID: 'rutina_id',
    }

    // Seguimiento en su estado inicial
    const SEGUIMIENTOINICIAL = {
        fecha: '',
        observaciones: '',
        rutina_id: '',
    }

    const {
        control,
        register,
        handleSubmit,
        //watch,
        setValue,
        trigger,
        reset,
    } = useForm({ defaultValues: SEGUIMIENTOINICIAL });

    // función que actualiza el seguimiento llamando al servicio
    const guardarSeguimiento = handleSubmit(async (seguimientoActualizado) => {

        // manda petición al servicio
        const respuestaUpdate = await updateSeguimiento(seguimientoActualizado, props.idSeguimiento);

        // si hay respuesta
        if (respuestaUpdate) {

            salirEditMode();
            refreshSeguimientoData();
        }
    });

    // función que elimina el seguimiento llamando al servicio
    const eliminarSeguimiento = async () => {

        // manda petición al servicio
        const respuestaDestroy = await destroySeguimiento(props.idSeguimiento);

        // si hay respuesta
        if (respuestaDestroy) {

            // redirige a la página del calendario con todos el seguimiento
            navigateTo('/dashboard/seguimiento');
        }
    }

    // cuando ya están los datos cargandos, los completa
    useEffect(() => {
        if (seguimientoData) {
            reset({
                fecha: seguimientoData.fecha,
                observaciones: seguimientoData.observaciones,
                rutina_id: seguimientoData.rutina?.id,
            });
        }
    }, [seguimientoData, reset]);

    // función que le envía la fecha del seguimiento al componente padre, a pages/SocioSeguimientoDetalles.jsx
    function setFecha() {
        props.setFechaSeguimiento(seguimientoData?.fecha);
    }

    useEffect(setFecha, [props, seguimientoData]);

    if (cargandoSeguimientoData) {
        return <div className='row'>cargando</div>
    }

    return (
        <div className='row'>

            {/* botones editar y cancelar */}
            <div className='col-12 datos-seguimientos-edit'>
                {
                    editMode
                        ? (
                            // botones para modo editar
                            <>
                                <ButtonSave onClick={guardarSeguimiento} cargando={cargandoUpdateSeguimiento}>
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

                                <ButtonDelete onClick={eliminarSeguimiento} cargando={cargandoDestroySeguimiento}>
                                    ELIMINAR SEGUIMIENTO
                                </ButtonDelete>
                            </>
                        )
                }
            </div>

            {/* observaciones del seguimiento */}
            <div className='col-12 subtitulo-dashboard'>
                {
                    editMode
                        ? (
                            // modo editar
                            <form>
                                <div className='campo'>
                                    <label htmlFor={SEGUIMIENTO.OBSERVACIONES} className='col-form-label col-form-label-lg'>Observaciones</label>
                                    <textarea id={SEGUIMIENTO.OBSERVACIONES} className='form-control form-control-lg' placeholder='Opcional'

                                        {...register(SEGUIMIENTO.OBSERVACIONES)}
                                    />
                                </div>
                            </form>
                        ) : (
                            // modo no editar
                            seguimientoData?.observaciones
                        )
                }
            </div>

            {/* rutina usada en el seguimiento */}
            <div className='col-12'>
                <div className='row'>
                    {
                        editMode
                            ? (
                                // modo editar
                                <form>
                                    <div className='col-12 campo'>
                                        <label htmlFor={SEGUIMIENTO.RUTINA_ID} className='col-form-label col-form-label-lg'>Rutina</label>
                                        <Controller
                                            name={SEGUIMIENTO.RUTINA_ID}
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    classNamePrefix='react-select'
                                                    className='form-control form-control-lg'
                                                    id={SEGUIMIENTO.RUTINA_ID}
                                                    options={obtenerRutinas()}
                                                    placeholder='Selecciona una rutina'
                                                    onChange={manejarRutinaSelectValue}
                                                    value={obtenerRutinas().find(e => e.value === field.value) || null /* busca el valor actual del formulario */}
                                                    formatOptionLabel={(option) => (
                                                        <div className='row'>
                                                            <span>{option.label}</span>
                                                            <span className='sub-select'>{option.label2}</span>
                                                        </div>
                                                    )}
                                                />
                                            )}
                                        />
                                        <ButtonDelete onClick={rutinaNull}>Quitar rutina del seguimiento</ButtonDelete>
                                    </div>
                                </form>
                            ) : (
                                // modo no editar
                                seguimientoData?.rutina
                                    ? (
                                        <RutinaCard
                                            id={seguimientoData?.rutina?.id}
                                            nombre={seguimientoData?.rutina?.nombre}
                                            descripcion={seguimientoData?.rutina?.descripcion}
                                        />
                                    ) : (
                                        <div className='col-12 card'>
                                            No hay rutina
                                        </div>
                                    )
                            )
                    }
                </div>
            </div>

            {/* JSON.stringify(watch()) */}
        </div>
    );
}

export default DatosSeguimiento;
