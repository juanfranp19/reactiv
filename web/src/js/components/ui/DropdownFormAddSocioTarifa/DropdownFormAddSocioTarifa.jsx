const API_URL = import.meta.env.VITE_API_URL;

import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

import ButtonCrear from '@components/ui/ButtonCrear/ButtonCrear';
import ButtonReset from '@components/ui/ButtonReset/ButtonReset';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';

import { useObtenerTarifas } from '@hooks/useTarifa';
import { useAttachSocioTarifa } from '@hooks/useSocioTarifa';

import getTodayDate from '@utils/getTodayDate';

const DropdownFormAddSocioTarifa = ({ refresh }) => {

    const { socioId } = useParams();

    const { tarifasData, cargando: cargandoTarifas } = useObtenerTarifas();
    const { attachSocioTarifa, cargando: cargandoAttachSocioTarifa } = useAttachSocioTarifa();

    /**
     * 
     * Funciones para react-select
     */
    function manejarTarifaSelectValue(tarifaSeleccionada) {

        // actualiza el valor en react-hook-form
        setValue(SOCIOTARIFA.TARIFA_ID, tarifaSeleccionada.value);

        // valida el campo, se llama el trigger porque Select no es un campo nativo de HTML
        trigger(SOCIOTARIFA.TARIFA_ID);
    }

    function obtenerTarifas() {

        // mientras se cargan los tarifas
        if (cargandoTarifas) return [{
            value: '',
            label: 'Cargando...',
            icon: null,
            isDisabled: true,
        }];

        // obtiene las tarifas del hook
        return tarifasData
            .map(tarifa => ({
                value: tarifa.id,
                nombre: tarifa.nombre,
                duracion: tarifa.duracion,
                precio: tarifa.precio,
            }));
    }

    // modelo de ejercicioRutina
    const SOCIOTARIFA = {
        FECHA_INICIO: 'fecha_inicio',
        TARIFA_ID: 'tarifa_id',
    }

    // ejercicioRutina en su estado inicial
    const SOCIOTARIFA_INICIAL = {
        fecha_inicio: getTodayDate(),
        tarifa_id: '',
    }

    const {
        control,
        register,
        handleSubmit,
        //watch,
        formState: { errors },
        setValue,
        trigger,
    } = useForm({ defaultValues: SOCIOTARIFA_INICIAL });

    const manejarFormulario = handleSubmit(async (nuevoEjercicio) => {

        // devuelve la información que hay en los campos
        console.log(nuevoEjercicio);

        //manda los datos junto con el id del seguimiento al servicio
        const respuestaAttachEjercicio = await attachSocioTarifa(nuevoEjercicio, socioId);

        if (respuestaAttachEjercicio) {
            refresh();
        }
    });

    return (
        <div className='dropdown'>

            <button type='button' className='btn btn-success dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false' data-bs-auto-close='outside'>
                Aplicar tarifa
            </button>

            <form className='dropdown-menu' id='id-dropdown-form-add-ejercicio-rutina' onSubmit={manejarFormulario} >
                <div className='row'>

                    {/* campo tarifa_id */}

                    <div className='col-12 campo'>

                        <label htmlFor={SOCIOTARIFA.TARIFA_ID} className='col-form-label col-form-label-lg'>Tarifa</label>
                        <Controller
                            name={SOCIOTARIFA.TARIFA_ID}
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    classNamePrefix='react-select'
                                    className='form-control form-control-lg'
                                    id={SOCIOTARIFA.TARIFA_ID}
                                    options={obtenerTarifas()}
                                    placeholder='Selecciona un ejercicio'
                                    onChange={manejarTarifaSelectValue}
                                    value={obtenerTarifas().find(e => e.value === field.value) || null /* busca el valor actual del formulario */}
                                    formatOptionLabel={(option) => (

                                        <div className='d-flex align-items-center gap-2'>
                                            {/* nombre de la tarifa */}
                                            <span>{option.nombre}</span>
                                            {/* duración de la tarifa */}
                                            <span>{option.duracion} días</span>
                                            {/* precio de la tarifa */}
                                            <span>{option.precio} €</span>
                                        </div>
                                    )}
                                />
                            )}
                        />
                        {/* el mensaje de error se deve hacer en un input hidden porque Select no es de HTML */}
                        <input type='hidden'
                            {...register(SOCIOTARIFA.TARIFA_ID, {
                                required: {
                                    value: true,
                                    message: 'Es obligatorio seleccionar una tarifa',
                                },
                            })}
                        />
                        <ErrorInput>{errors.tarifa_id?.message}</ErrorInput>
                    </div>

                    {/* campo fecha_inicio */}

                    <div className='col-12 col-md-6 campo'>
                        <label htmlFor={SOCIOTARIFA.FECHA_INICIO} className='col-form-label col-form-label-lg'>Fecha de inicio</label>
                        <input type='date' id={SOCIOTARIFA.FECHA_INICIO} className='form-control form-control-lg'

                            {...register(SOCIOTARIFA.FECHA_INICIO, {
                                required: {
                                    value: true,
                                    message: 'Es obligatorio indicar el día inicial de la tarifa',
                                },
                            })}
                        />
                        <ErrorInput>{errors.fecha_inicio?.message}</ErrorInput>
                    </div>

                </div>

                <div className='row botones'>

                    <div className='col-12'>
                        <ButtonCrear>
                            {cargandoAttachSocioTarifa ? 'cargando' : 'Aplicar'}
                        </ButtonCrear>
                    </div>

                </div>
                {/* JSON.stringify(watch()) */}
            </form>

        </div>
    );
}

export default DropdownFormAddSocioTarifa;
