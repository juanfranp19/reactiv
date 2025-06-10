import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

import ButtonCrear from '@components/ui/ButtonCrear/ButtonCrear';
import ButtonReset from '@components/ui/ButtonReset/ButtonReset';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';

const FormCrearUser = ({ cargandoCrearUser, cargandoSociosData, manejarCrearUser, sociosData }) => {

    /**
     * 
     * funciones para el select
     */
    // obtiene los socios para el select
    function obtenerSocios() {

        // si no han cargado bien los datos, pueden no ser un array
        if (!Array.isArray(sociosData)) {
            console.warn('sociosData no es un array:', sociosData);
            return [];
        }

        if (cargandoSociosData) {
            return [];
        }

        // obtiene los socios que no tengan usuario asignado
        return sociosData
            .filter(socio => socio.user === null)
            .map(socio => ({
                value: socio.id,
                label: `${socio.nombre} ${socio.apellidos}`,
            }));
    }

    // actualiza el estado del campo y lo valida
    function manejarSocioSelectValue(socioSeleccionado) {

        // actualiza el valor en react-hook-form
        setValue(USER.SOCIO_ID, socioSeleccionado.value);

        // valida el campo, se llama porque Select no es un campo nativo de HTML
        trigger(USER.SOCIO_ID);
    }

    // modelo de User
    const USER = {
        NAME: 'name',
        PASSWORD: 'password',
        SOCIO_ID: 'socio_id',
    }

    // User en su estado inicial
    const USERINICIAL = {
        name: '',
        password: '',
        socio_id: '',
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

        // manda los datos a la función de la página CrearSocio.jsx
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
                    Datos del usuario del socio
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

                {/* campo socio_id */}

                <div className='col-12 col-md-6 campo'>

                    <label htmlFor={USER.SOCIO_ID} className='col-form-label col-form-label-lg'>Asignar socio</label>
                    <Controller
                        name={USER.SOCIO_ID}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className='form-control form-control-lg'
                                id={USER.SOCIO_ID}
                                options={obtenerSocios()}
                                placeholder='Selecciona un socio'
                                onChange={manejarSocioSelectValue}
                                value={obtenerSocios().find(s => s.value === field.value) || null}
                            />
                        )}
                    />
                    {/* el mensaje de error se deve hacer en un input hidden porque Select no es de HTML */}
                    <input type='hidden'
                        {...register(USER.SOCIO_ID, {
                            required: {
                                value: true,
                                message: 'Debes asignar un socio al usuario',
                            },
                        })}
                    />
                    <ErrorInput>{errors.socio_id?.message}</ErrorInput>
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

export default FormCrearUser;
