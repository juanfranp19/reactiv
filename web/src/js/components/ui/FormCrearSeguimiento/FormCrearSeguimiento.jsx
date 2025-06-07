import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import ButtonCrear from '@components/ui/ButtonCrear/ButtonCrear';
import ButtonReset from '@components/ui/ButtonReset/ButtonReset';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

import getTodayDate from '@utils/getTodayDate';

const FormCrearSeguimiento = (props) => {

    const { id } = useToken();
    const { socioData, cargando: cargandoSocioData } = useObtenerSocio(id);

    /**
     * 
     *  Funiones para react-select
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
        fecha: props.fechaAcceso ?? getTodayDate(),
        observaciones: null,
        rutina_id: null,
    }

    const {
        control,
        register,
        handleSubmit,
        //watch,
        formState: { errors },
        setValue,
        trigger,
        reset,
    } = useForm({ defaultValues: SEGUIMIENTOINICIAL });

    const manejarFormulario = handleSubmit((nuevoSeguimiento) => {

        // devuelve la información que hay en los campos
        console.log(nuevoSeguimiento);

        // manda los datos a la función de la página SocioSeguimientoCrear.jsx
        props.manejarCrearSeguimiento(nuevoSeguimiento);
    })

    function resetData() {
        reset(SEGUIMIENTOINICIAL);
    }

    return (
        <form className='col-12' id='idformcrearseguimiento' onSubmit={manejarFormulario}>
            <div className='row'>

                {/* campo fecha */}

                <div className='col-12 col-md-6 campo'>
                    <label htmlFor={SEGUIMIENTO.FECHA} className='col-form-label col-form-label-lg'>Día del seguimiento</label>
                    <input type='date' id={SEGUIMIENTO.FECHA} className='form-control form-control-lg'

                        {...register(SEGUIMIENTO.FECHA, {
                            required: {
                                value: true,
                                message: 'Es obligatorio indicar el día del seguimiento',
                            },
                        })}
                    />
                    <ErrorInput>{errors.fecha?.message}</ErrorInput>
                </div>

                {/* campo observaciones */}

                <div className='col-12 col-md-6 campo'>
                    <label htmlFor={SEGUIMIENTO.OBSERVACIONES} className='col-form-label col-form-label-lg'>Observaciones</label>
                    <textarea id={SEGUIMIENTO.OBSERVACIONES} className='form-control form-control-lg' placeholder='Opcional'

                        {...register(SEGUIMIENTO.OBSERVACIONES)}
                    />
                </div>

                {/* campo rutina_id */}

                <div className='col-12 campo'>
                    <label htmlFor={SEGUIMIENTO.RUTINA_ID} className='col-form-label col-form-label-lg'>¿Has usado alguna rutina?</label>
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
                                placeholder='Opcional'
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
                </div>
            </div>
            <div className='row botones'>
                <ButtonCrear>
                    {props.cargando ? 'cargando' : 'Crear'}
                </ButtonCrear>
                <ButtonReset onClick={resetData} />
            </div>
            {/* {JSON.stringify(watch())} */}
        </form>
    );
}

export default FormCrearSeguimiento;
