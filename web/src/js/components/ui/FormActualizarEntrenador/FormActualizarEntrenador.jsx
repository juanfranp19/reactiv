const API_URL = import.meta.env.VITE_API_URL;

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ButtonDeleteArchivo from '@components/ui/ButtonDeleteArchivo/ButtonDeleteArchivo';
import ButtonSave from '@components/ui/ButtonSave/ButtonSave';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';

const FormCrearEntrenador = ({ cargandoUpdateEntrenador, entrenadorData, manejarActualizarEntrenador, noAdmin, isDisabled }) => {

    const [file, setFile] = useState('');

    // manejar el valor del radio
    function manejarRadioAdmin(e) {
        setValue(ENTRENADOR.ADMIN, e.target.value);
        trigger(ENTRENADOR.ADMIN);
    }

    /**
     * 
     * Funciones para archivos
     */
    function manejarImagen(event) {

        // el objeto con toda la info del archivo
        const selectedFile = event.target.files[0];
        console.log(selectedFile);
        // para que mustre debajo del input el nombre del archivo
        setFile(selectedFile.name);
        // lo envía al modelo el objeto, porque por sí solo como otros inputs no puede
        setValue(ENTRENADOR.IMAGEN, selectedFile);
    }

    function eliminarImagen() {

        setFile(null);
        setValue(ENTRENADOR.IMAGEN, null);
        // elimina la información del archivo en el input
        document.getElementById(ENTRENADOR.IMAGEN).value = '';
    }

    // modelo de Entrenador
    const ENTRENADOR = {
        NOMBRE: 'nombre',
        APELLIDOS: 'apellidos',
        EMAIL: 'email',
        TELEFONO: 'telefono',
        ADMIN: 'admin',
        IMAGEN: 'imagen',
    }

    // Entrenador en su estado inicial
    const ENTRENADORINICIAL = {
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        admin: '',
        imagen: '',
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        trigger,
        reset
    } = useForm({ defaultValues: ENTRENADORINICIAL });

    // cuando ya están los datos cargandos, los completa
    useEffect(() => {
        reset({
            nombre: entrenadorData.nombre,
            apellidos: entrenadorData.apellidos,
            email: entrenadorData.email,
            telefono: entrenadorData.telefono,
            admin: entrenadorData.admin ? "1" : "0",
            imagen: entrenadorData.imagen,
        });
    }, [entrenadorData, reset]);

    const manejarFormulario = handleSubmit((entrenadorActualizado) => {

        // devuelve la información que hay en los campos
        console.log(entrenadorActualizado);

        // manda los datos a la función por los props
        manejarActualizarEntrenador(entrenadorActualizado);
    });

    return (
        <form className='col-12' id='idformsocio' onSubmit={manejarFormulario}>
            <div className='row'>

                {/* titulo */}

                <div className='col-12 titulo'>
                    Datos personales del entrenador
                </div>

                {/* campo Nombre */}

                <div className='col-12 col-sm-6 col-lg-4 col-xxl-6 campo'>

                    <label htmlFor={ENTRENADOR.NOMBRE} className='col-form-label col-form-label-lg'>Nombre</label>
                    <input disabled={isDisabled} type='text' className='form-control form-control-lg' id={ENTRENADOR.NOMBRE}

                        {...register(ENTRENADOR.NOMBRE, {
                            required: {
                                value: true,
                                message: 'El nombre es obligatorio',
                            },
                        })}
                    />
                    <ErrorInput>{errors.nombre?.message}</ErrorInput>
                </div>

                {/* campo Apellidos */}

                <div className='col-12 col-sm-6 col-lg-4 col-xxl-6 campo'>

                    <label htmlFor={ENTRENADOR.APELLIDOS} className='col-form-label col-form-label-lg'>Apellidos</label>
                    <input disabled={isDisabled} type='text' className='form-control form-control-lg' id={ENTRENADOR.APELLIDOS}

                        {...register(ENTRENADOR.APELLIDOS, {
                            required: {
                                value: true,
                                message: 'Los apellidos son obligatorios',
                            },
                        })}
                    />
                    <ErrorInput>{errors.apellidos?.message}</ErrorInput>
                </div>

                {/* campo imagen */}

                <div className='col-12 col-sm-6 col-lg-4 col-xxl-12 campo'>

                    <label htmlFor={ENTRENADOR.IMAGEN} className='col-form-label col-form-label-lg'>Imagen</label>
                    <input disabled={isDisabled} type='file' className='form-control form-control-lg' id={ENTRENADOR.IMAGEN} onChange={manejarImagen} />
                    {
                        // imagen actual

                        entrenadorData.imagen !== null && !file && (
                            <div className='mb-2'>
                                <img
                                    className='campo-imagen'
                                    src={`${API_URL}/storage/local/entrenadores/imagen/${watch(ENTRENADOR.IMAGEN)}`}
                                    alt='Imagen actual'
                                />
                            </div>
                        )
                    }
                    {
                        !isDisabled && (
                            <ButtonDeleteArchivo onClick={eliminarImagen} />
                        )
                    }
                    {
                        // imagen añadida

                        file && (
                            <div className='eliminar-archivo'>
                                <span>{file}</span>
                            </div>
                        )
                    }
                </div>

                {/* campo Email */}

                <div className='col-12 col-sm-6 col-lg-4 col-xxl-12 campo'>

                    <label htmlFor={ENTRENADOR.EMAIL} className='col-form-label col-form-label-lg'>Email</label>
                    <input disabled={isDisabled} type='email' className='form-control form-control-lg' id={ENTRENADOR.EMAIL} placeholder='ejemplo@ejemplo.com'

                        {...register(ENTRENADOR.EMAIL, {
                            required: {
                                value: true,
                                message: 'El email es obligatorio',
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Email no válido',
                            },
                        })}
                    />
                    <ErrorInput>{errors.email?.message}</ErrorInput>
                </div>

                {/* campo Teléfono */}

                <div className='col-12 col-sm-6 col-lg-4 col-xxl-6 campo'>

                    <label htmlFor={ENTRENADOR.TELEFONO} className='col-form-label col-form-label-lg'>Número de teléfono</label>
                    <input disabled={isDisabled} type='tel' className='form-control form-control-lg' id={ENTRENADOR.TELEFONO} placeholder='999999999'

                        {...register(ENTRENADOR.TELEFONO, {
                            required: {
                                value: true,
                                message: 'El número de teléfono es obligatorio',
                            },
                            pattern: {
                                value: /^[0-9]{9}$/,
                                message: 'Teléfono no válido',
                            },
                        })}
                    />
                    <ErrorInput>{errors.telefono?.message}</ErrorInput>
                </div>

                {/* campo Admin */}

                <div className='col-12 col-md-6 campo'>
                    <label className='col-form-label col-form-label-lg' htmlFor={ENTRENADOR.ADMIN}>Admin</label>
                    <div>
                        <input disabled={noAdmin} id='entrenador-admin-true' name={ENTRENADOR.ADMIN} type='radio' value='1' className='form-check-input' onChange={manejarRadioAdmin}
                            {...register(ENTRENADOR.ADMIN, {
                                required: {
                                    value: true,
                                    message: 'Es obligatorio indicar el rol',
                                },
                            })}
                        />
                        <label htmlFor='entrenador-admin-true'>Sí</label>
                    </div>
                    <div>
                        <input disabled={noAdmin} id='entrenador-admin-false' name={ENTRENADOR.ADMIN} type='radio' value='0' className='form-check-input' onChange={manejarRadioAdmin}

                            {...register(ENTRENADOR.ADMIN, {
                                required: {
                                    value: true,
                                    message: 'Es obligatorio indicar el rol',
                                },
                            })}
                        />
                        <label htmlFor='entrenador-admin-false'>No</label>
                    </div>
                    <input type='hidden'

                    />
                    <ErrorInput>{errors.admin?.message}</ErrorInput>
                </div>

            </div>
            <div className='row botones'>

                <div className='col-12'>
                    {
                        !isDisabled && (
                            <ButtonSave>
                                {cargandoUpdateEntrenador ? 'cargando' : 'Guardar datos del entrenador'}
                            </ButtonSave>
                        )
                    }
                </div>

            </div>
            {/* JSON.stringify(watch()) */}
        </form>
    );
}

export default FormCrearEntrenador;
