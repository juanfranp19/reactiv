import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

import ButtonCrear from '@components/ui/ButtonCrear/ButtonCrear';
import ButtonReset from '@components/ui/ButtonReset/ButtonReset';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';

const FormCrearUserEntrenador = ({ cargandoCrearUser, cargandoEntrenadoresData, entrenadoresData, manejarCrearUser }) => {

    /**
     * 
     * funciones para el select
     */
    // obtiene los entrenadores para el select
    function obtenerEntrenadores() {

        // si no han cargado bien los datos, pueden no ser un array
        if (!Array.isArray(entrenadoresData)) {
            console.warn('entrenadoresData no es un array:', entrenadoresData);
            return [];
        }

        if (cargandoEntrenadoresData) {
            return [];
        }

        // obtiene los entrenadores que no tengan usuario asignado
        return entrenadoresData
            .filter(entrenador => entrenador.user === null)
            .map(entrenador => ({
                value: entrenador.id,
                label: `${entrenador.nombre} ${entrenador.apellidos}`,
            }));
    }

    // actualiza el estado del campo y lo valida
    function manejarEntrenadorSelectValue(entrenadorSeleccionado) {

        // actualiza el valor en react-hook-form
        setValue(USER.ENTRENADOR_ID, entrenadorSeleccionado.value);

        // valida el campo, se llama porque Select no es un campo nativo de HTML
        trigger(USER.ENTRENADOR_ID);
    }

    // modelo de User
    const USER = {
        NAME: 'name',
        PASSWORD: 'password',
        ENTRENADOR_ID: 'entrenador_id',
    }

    // User en su estado inicial
    const USERINICIAL = {
        name: '',
        password: '',
        entrenador_id: '',
    }

    const {
        control,
        register,
        handleSubmit,
        //watch,
        formState: { errors },
        setValue,
        trigger,
        reset
    } = useForm({ defaultValues: USERINICIAL });

    const manejarFormulario = handleSubmit((nuevoUser) => {

        // devuelve la información que hay en los campos
        console.log(nuevoUser);

        // manda los datos a la función
        manejarCrearUser(nuevoUser);
    });

    // función que reseta TODOS los datos del formulario
    function resetData() {
        reset(USERINICIAL);
    }

    return (
        <form className='col-12' id='idformcrearuser' onSubmit={manejarFormulario}>
            <div className='row'>

                {/* titulo */}

                <div className='col-12 titulo'>
                    Datos del usuario del entrenador
                </div>

                {/* campo name */}

                <div className='col-12 col-md-6 campo'>

                    <label htmlFor={USER.NAME} className='col-form-label col-form-label-lg'>Nombre de usuario</label>
                    <input type='text' className='form-control form-control-lg' id={USER.NAME}

                        {...register(USER.NAME, {
                            required: {
                                value: true,
                                message: 'El nombre de usuario es obligatorio',
                            },
                            pattern: {
                                value: /^[a-z0-9]+$/,
                                message: 'Solo debe contener letras minúsculas y números',
                            },
                        })}
                    />
                    <ErrorInput>{errors.name?.message}</ErrorInput>
                </div>

                {/* campo password */}

                <div className='col-12 col-md-6 campo'>

                    <label htmlFor={USER.PASSWORD} className='col-form-label col-form-label-lg'>Contraseña</label>
                    <input type='password' className='form-control form-control-lg' id={USER.PASSWORD}

                        {...register(USER.PASSWORD, {
                            required: {
                                value: true,
                                message: 'La contraseña es obligatoria',
                            },
                        })}
                    />
                    <ErrorInput>{errors.password?.message}</ErrorInput>
                </div>

                {/* campo entrenador_id */}

                <div className='col-12 col-md-6 campo'>

                    <label htmlFor={USER.ENTRENADOR_ID} className='col-form-label col-form-label-lg'>Asignar entrenador</label>
                    <Controller
                        name={USER.ENTRENADOR_ID}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className='form-control form-control-lg'
                                id={USER.ENTRENADOR_ID}
                                options={obtenerEntrenadores()}
                                placeholder='Selecciona un entrenador'
                                onChange={manejarEntrenadorSelectValue}
                                value={obtenerEntrenadores().find(s => s.value === field.value) || null}
                            />
                        )}
                    />
                    {/* el mensaje de error se deve hacer en un input hidden porque Select no es de HTML */}
                    <input type='hidden'
                        {...register(USER.ENTRENADOR_ID, {
                            required: {
                                value: true,
                                message: 'Debes asignar un entrenador al usuario',
                            },
                        })}
                    />
                    <ErrorInput>{errors.entrenador_id?.message}</ErrorInput>
                </div>

            </div>

            <div className='row botones'>

                <div className='col-12'>
                    <ButtonCrear>
                        {cargandoCrearUser ? 'cargando' : 'Registrar'}
                    </ButtonCrear>

                    <ButtonReset onClick={resetData} />
                </div>

            </div>
            {/* JSON.stringify(watch()) */}
        </form>
    );
}

export default FormCrearUserEntrenador;
