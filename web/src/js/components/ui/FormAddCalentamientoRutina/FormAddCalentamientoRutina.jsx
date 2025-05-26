const API_URL = import.meta.env.VITE_API_URL;

import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import ButtonCrear from '@components/ui/ButtonCrear/ButtonCrear';
import ButtonReset from '@components/ui/ButtonReset/ButtonReset';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';
import ImgNull from '@components/ui/ImgNull/ImgNull';

import { useObtenerCalentamientos } from '@hooks/useCalentamiento';

const FormAddCalentamientoRutina = (props) => {

    const { calentamientosData, cargando: cargandoCalentamientos } = useObtenerCalentamientos();

    /**
     * 
     * Funciones para react-select
     */
    function manejarCalentamientoSelectValue(calentamientoSeleccionado) {

        // actualiza el valor en react-hook-form
        setValue(CALENTAMIENTORUTINA.CALENTAMIENTO_ID, calentamientoSeleccionado.value);

        // valida el campo, se llama el trigger porque Select no es un campo nativo de HTML
        trigger(CALENTAMIENTORUTINA.CALENTAMIENTO_ID);
    }

    function obtenerCalentamientos() {

        // mientras se cargan los calentamientos
        if (cargandoCalentamientos) return [{
            value: '',
            label: 'Cargando...',
            icon: null,
            isDisabled: true,
        }];

        // obtiene los calentamientos del hook
        return calentamientosData
            .map(calentamiento => ({
                value: calentamiento.id,
                label: calentamiento.nombre,
                icon: calentamiento.imagen,
            }));
    }

    // modelo de calentamientoRutina
    const CALENTAMIENTORUTINA = {
        CALENTAMIENTO_ID: 'calentamiento_id',
        TIEMPO: 'tiempo',
    }

    // calentamientoRutina en su estado inicial
    const CALENTAMIENTORUTINA_INICIAL = {
        calentamiento_id: '',
        TIEMPO: '',
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
    } = useForm({ defaulValues: CALENTAMIENTORUTINA_INICIAL });

    const manejarFormulario = handleSubmit((nuevoCalentamiento) => {

        // devuelve la información que hay en los campos
        console.log(nuevoCalentamiento);

        // manda los datos a la función de la página SocioRutinaAddCalentamiento.jsx
        props.manejarAddCalentamiento(nuevoCalentamiento);
    });

    function resetData() {
        reset(CALENTAMIENTORUTINA_INICIAL);
    }

    return (
        <form className='col-12' id='id-form-add-calentamiento-rutina' onSubmit={manejarFormulario}>
            <div className='row'>

                {/* campo calentamiento_id */}

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={CALENTAMIENTORUTINA.CALENTAMIENTO_ID} className='col-form-label col-form-label-lg'>Calentamiento</label>
                    <Controller
                        name={CALENTAMIENTORUTINA.CALENTAMIENTO_ID}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                classNamePrefix='react-select'
                                className='form-control form-control-lg'
                                id={CALENTAMIENTORUTINA.CALENTAMIENTO_ID}
                                options={obtenerCalentamientos()}
                                placeholder='Selecciona un calentamiento'
                                onChange={manejarCalentamientoSelectValue}
                                value={obtenerCalentamientos().find(c => c.value === field.value) || null /* busca el valor actual del formulario */}
                                formatOptionLabel={(option) => (
                                    // imagen del calentamiento
                                    <div className='d-flex align-items-center gap-2'>
                                        {
                                            // si no tiene imagen el calentamiento, asigna el de defecto del cliente
                                            option.icon ?
                                                <img
                                                    className='img-select'
                                                    src={`${API_URL}/storage/calentamientos/imagen/${option.icon}`}
                                                    alt={option.label}
                                                />
                                                : <ImgNull />
                                        }
                                        {/* nombre del calentamiento */}
                                        <span>{option.label}</span>
                                    </div>
                                )}
                            />
                        )}
                    />
                    {/* el mensaje de error se deve hacer en un input hidden porque Select no es de HTML */}
                    <input type='hidden'
                        {...register(CALENTAMIENTORUTINA.CALENTAMIENTO_ID, {
                            required: {
                                value: true,
                                message: 'Es obligatorio seleccionar un calentamiento',
                            },
                        })}
                    />
                    <ErrorInput>{errors.calentamiento_id?.message}</ErrorInput>
                </div>

                {/* campo tiempo */}

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={CALENTAMIENTORUTINA.TIEMPO} className='col-form-label col-form-label-lg'>Tiempo</label>
                    <div className='input-group'>
                        <input type='number' className='form-control form-control-lg' id={CALENTAMIENTORUTINA.TIEMPO} aria-describedby='input-group-tiempo'

                            {...register(CALENTAMIENTORUTINA.TIEMPO, {
                                required: {
                                    value: true,
                                    message: 'Es obligatorio indicar el tiempo del calentamiento',
                                },
                                min: {
                                    value: 1,
                                    message: 'El tiempo no puede ser negativo ni cero',
                                },
                            })}
                        />
                        <span className='input-group-text' id='input-group-tiempo'>minutos</span>
                    </div>
                    <ErrorInput>{errors.tiempo?.message}</ErrorInput>
                </div>

            </div>

            <div className='row botones'>

                <div className='col-12'>
                    <ButtonCrear>
                        {props.cargando ? 'cargando' : 'Añadir'}
                    </ButtonCrear>

                    <ButtonReset onClick={resetData} />
                </div>

            </div>
            {/*JSON.stringify(watch())*/}
        </form>
    );
}

export default FormAddCalentamientoRutina;
