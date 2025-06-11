import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import ButtonSave from '@components/ui/ButtonSave/ButtonSave';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';

const FormActualizarUser = ({ cargandoUpdateUser, manejarActualizarUser, userData }) => {

    // modelo de User
    const USER = {
        NAME: 'name',
        PASSWORD: 'password',
    }

    // User en su estado inicial
    const USERINICIAL = {
        name: '',
        password: '',
    }

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
        reset
    } = useForm({ defaultValues: USERINICIAL });

    // cuando ya están todos los datos cargados, completa los campos
    useEffect(() => {

        // condición para evitar errores, porque puede ser null en algunos usuario
        if (userData) {

            reset({
                name: userData.name,
            });
        }
    }, [reset, userData]);

    const manejarFormulario = handleSubmit((userActualizado) => {

        // devuelve la información que hay en los campos
        console.log(userActualizado);

        // manda los datos a la función de la página CrearSocio.jsx
        manejarActualizarUser(userActualizado);
    });

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

                    <label htmlFor={USER.PASSWORD} className='col-form-label col-form-label-lg'>Cambiar contraseña</label>
                    <input type='password' className='form-control form-control-lg' id={USER.PASSWORD}

                        {...register(USER.PASSWORD, {
                            required: {
                                value: true,
                                message: 'Introduce tu contraseña o cámbiala',
                            },
                        })}
                    />
                    <ErrorInput>{errors.password?.message}</ErrorInput>
                </div>

            </div>

            <div className='row botones'>

                <div className='col-12'>
                    <ButtonSave>
                        {cargandoUpdateUser ? 'cargando' : 'Guardar datos del usuario'}
                    </ButtonSave>
                </div>

            </div>

            {/* JSON.stringify(watch()) */}
        </form>
    );
}

export default FormActualizarUser;
