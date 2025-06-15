import { useForm } from 'react-hook-form';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';

const FormLogin = (props) => {

    // modelo de login
    const LOGIN = {
        NAME: 'name',
        PASSWORD: 'password',
    }

    // login en su estado inicial
    const LOGININICIAL = {
        name: '',
        password: '',
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: LOGININICIAL });

    const manejarFormulario = handleSubmit((nuevoLogin) => {

        // devuelve la información que hay en los campos del Login, en JSON
        console.log(nuevoLogin);

        // manda los datos a la función de Login.jsx
        props.manejarLogin(nuevoLogin);

        // resetea los campos
        reset(LOGININICIAL);
    });

    return (
        <div className='row'>
            <div className='col-12 formlogin-ext'>
                <div className='row'>
                    <form className='col-12 formlogin' id='idformlogin' onSubmit={manejarFormulario}>
                        <div className='row'>

                            {/* campo de usuario */}

                            <div className='col-12 campo'>
                                {/* <label htmlFor={LOGIN.NAME} className='col-sm-2 col-form-label col-form-label-lg'>Usuario</label> */}

                                <div className='input-group'>
                                    <div className='input-group-text'><i className='bi bi-person-circle'></i></div>
                                    <input type='text' className='form-control form-control-lg' id={LOGIN.NAME} placeholder='usuario'

                                        {...register(LOGIN.NAME, {
                                            required: {
                                                value: true,
                                                message: 'El nombre de usuario es obligatorio',
                                            }
                                        })}
                                    />
                                </div>

                                <ErrorInput>{errors.name?.message}</ErrorInput>
                            </div>

                            {/* campo de contraseña */}

                            <div className='col-12 campo'>
                                {/* <label htmlFor={LOGIN.PASSWORD} className='col-sm-2 col-form-label col-form-label-lg'>Contraseña</label> */}

                                <div className='input-group'>
                                    <div className='input-group-text'><i className='bi bi-shield-lock'></i></div>

                                    <input type='password' className='form-control form-control-lg' id={LOGIN.PASSWORD} placeholder='contraseña'

                                        {...register(LOGIN.PASSWORD, {
                                            required: {
                                                value: true,
                                                message: 'La contraseña es obligatoria',
                                            }
                                        })}
                                    />
                                </div>

                                <ErrorInput>{errors.password?.message}</ErrorInput>
                            </div>

                            {/* botón */}

                            <div className='col-12 campo'>
                                <button type='submit' className='btn btn-outline-light'>
                                    {
                                        props.cargando ? 'cargando' : 'Iniciar sesión'
                                    }
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormLogin;
