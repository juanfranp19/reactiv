const API_URL = import.meta.env.VITE_API_URL;

import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import ButtonCrear from '@components/ui/ButtonCrear/ButtonCrear';
import ButtonReset from '@components/ui/ButtonReset/ButtonReset';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';
import ImgNull from '@components/ui/ImgNull/ImgNull';

import { useObtenerEjercicios } from '@hooks/useEjercicio';
import { useObtenerGruposMusculares } from '@hooks/useGrupoMuscular';

const FormAddEjercicioRutina = (props) => {

    const { ejerciciosData, cargando: cargandoEjercicios } = useObtenerEjercicios();
    const { gruposMuscularesData, cargando: cargandoGruposMusculares } = useObtenerGruposMusculares();

    /**
     * 
     * Funciones para react-select
     */
    function manejarGrupoMuscularSelectValue(grupoSeleccionado) {

        // actualiza el valor en react-hook-form
        setValue(EJERCICIORUTINA.GRUPO_MUSCULAR, grupoSeleccionado.value);

        // valida el campo, se llama el trigger porque Select no es un campo nativo de HTML
        trigger(EJERCICIORUTINA.GRUPO_MUSCULAR);
    }

    function manejarEjercicioSelectValue(ejercicioSeleccionado) {

        // actualiza el valor en react-hook-form
        setValue(EJERCICIORUTINA.EJERCICIO_ID, ejercicioSeleccionado.value);

        // valida el campo, se llama el trigger porque Select no es un campo nativo de HTML
        trigger(EJERCICIORUTINA.EJERCICIO_ID);
    }

    function obtenerGruposMusculares() {

        // mientras se cargan los grupos musculares
        if (cargandoGruposMusculares) return [{
            value: '',
            label: 'Cargando...',
            icon: null,
            isDisabled: true,
        }];

        // obtiene los grupos musculares del hook
        return gruposMuscularesData
            .map(grupo => ({
                value: grupo.id,
                label: grupo.nombre,
            }));
    }

    function obtenerEjercicios() {

        // mientras se cargan los ejercicios
        if (cargandoEjercicios) return [{
            value: '',
            label: 'Cargando...',
            icon: null,
            isDisabled: true,
        }];

        // obtiene los ejercicios del hook filtrados por el grupo muscular seleccionado
        return ejerciciosData
            .filter(ejercicio => watch(EJERCICIORUTINA.GRUPO_MUSCULAR) === ejercicio.grupo_muscular.id)
            .map(ejercicio => ({
                value: ejercicio.id,
                label: ejercicio.nombre,
                icon: ejercicio.imagen,
            }));
    }

    // modelo de ejercicioRutina
    const EJERCICIORUTINA = {
        GRUPO_MUSCULAR: 'grupo_muscular',
        EJERCICIO_ID: 'ejercicio_id',
        NUM_SERIES: 'num_series',
        NUM_REPETICIONES: 'num_repeticiones',
    }

    // ejercicioRutina en su estado inicial
    const EJERCICIORUTINA_INICIAL = {
        grupo_muscular: '',
        ejercicio_id: '',
        num_series: '',
        num_repeticiones: '',
    }

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        trigger,
        reset,
    } = useForm({ defaulValues: EJERCICIORUTINA_INICIAL });

    const manejarFormulario = handleSubmit((nuevoEjercicio) => {

        // devuelve la información que hay en los campos
        console.log(nuevoEjercicio);

        //manda los datos a la función de la página SocioRutinaAddEjercicio.jsx
        props.manejarAddEjercicio(nuevoEjercicio);
    });

    function resetData() {
        reset(EJERCICIORUTINA_INICIAL);
    }

    return (
        <form className='col-12' id='id-form-add-ejercicio-rutina' onSubmit={manejarFormulario} >
            <div className='row'>

                {/* para filtrar los ejercicios */}

                <div className="col-12 campo">

                    <label htmlFor={EJERCICIORUTINA.GRUPO_MUSCULAR} className='col-form-label col-form-label-lg'>Grupo muscular</label>
                    <Controller
                        name={EJERCICIORUTINA.GRUPO_MUSCULAR}
                        control={control}
                        render={({ field }) => (
                            <Select 
                                {...field}
                                className='form-control form-control-lg'
                                id={EJERCICIORUTINA.GRUPO_MUSCULAR}
                                options={obtenerGruposMusculares()}
                                placeholder='Selecciona un grupo muscular'
                                onChange={manejarGrupoMuscularSelectValue}
                                value={obtenerGruposMusculares().find(e => e.value === field.value) || null /* busca el valor actual del formulario */}
                            />
                        )}
                    />
                    {/* el mensaje de error se deve hacer en un input hidden porque Select no es de HTML */}
                    <input type='hidden'
                        {...register(EJERCICIORUTINA.GRUPO_MUSCULAR, {
                            required: {
                                value: true,
                                message: 'Es obligatorio seleccionar un grupo muscular',
                            },
                        })}
                    />
                    <ErrorInput>{errors.grupo_muscular?.message}</ErrorInput>
                </div>

                {/* campo ejercicio_id */}

                <div className='col-12 col-md-6 campo'>

                    <label htmlFor={EJERCICIORUTINA.EJERCICIO_ID} className='col-form-label col-form-label-lg'>Ejercicio</label>
                    <Controller
                        name={EJERCICIORUTINA.EJERCICIO_ID}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                classNamePrefix='react-select'
                                className='form-control form-control-lg'
                                id={EJERCICIORUTINA.EJERCICIO_ID}
                                options={obtenerEjercicios()}
                                placeholder='Selecciona un ejercicio'
                                onChange={manejarEjercicioSelectValue}
                                value={obtenerEjercicios().find(e => e.value === field.value) || null /* busca el valor actual del formulario */}
                                formatOptionLabel={(option) => (
                                    // imagen del ejercicio
                                    <div className='d-flex align-items-center gap-2'>
                                        {
                                            // si no tiene imagen el ejercicio, asigna el de defecto del cliente
                                            option.icon ?
                                                <img
                                                    className='img-select'
                                                    src={`${API_URL}/storage/ejercicios/imagen/${option.icon}`}
                                                    alt={option.label}
                                                />
                                                : <ImgNull />
                                        }
                                        {/* nombre del ejercicio */}
                                        <span>{option.label}</span>
                                    </div>
                                )}
                            />
                        )}
                    />
                    {/* el mensaje de error se deve hacer en un input hidden porque Select no es de HTML */}
                    <input type='hidden'
                        {...register(EJERCICIORUTINA.EJERCICIO_ID, {
                            required: {
                                value: true,
                                message: 'Es obligatorio seleccionar un ejercicio',
                            },
                        })}
                    />
                    <ErrorInput>{errors.ejercicio_id?.message}</ErrorInput>
                </div>

                {/* campo num_series */}

                <div className='col-12 col-md-6 col-lg-4 campo'>
                    <div className="row">

                        {/* campo num_series */}

                        <label htmlFor={EJERCICIORUTINA.NUM_SERIES} className='col-form-label col-form-label-lg'>Número de series</label>
                        <input type='number' className='form-control form-control-lg' id={EJERCICIORUTINA.NUM_SERIES}

                            {...register(EJERCICIORUTINA.NUM_SERIES, {
                                required: {
                                    value: true,
                                    message: 'Es obligatorio indicar el número de series',
                                },
                                min: {
                                    value: 1,
                                    message: 'El número de series no puede ser negativo ni cero',
                                },
                            })}
                        />
                        <ErrorInput>{errors.num_series?.message}</ErrorInput>

                        {/* campo num_repeticiones */}

                        <label htmlFor={EJERCICIORUTINA.NUM_REPETICIONES} className='col-form-label col-form-label-lg'>Número de repeticiones</label>
                        <input type='number' className='form-control form-control-lg' id={EJERCICIORUTINA.NUM_REPETICIONES}

                            {...register(EJERCICIORUTINA.NUM_REPETICIONES, {
                                required: {
                                    value: true,
                                    message: 'Es obligatorio indicar el número de repeticiones',
                                },
                                min: {
                                    value: 1,
                                    message: 'El número de repeticiones no puede ser negativo ni cero',
                                },
                            })}
                        />
                        <ErrorInput>{errors.num_repeticiones?.message}</ErrorInput>

                    </div>
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
            {/* JSON.stringify(watch()) */}
        </form>
    );
}

export default FormAddEjercicioRutina;
