import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

import ciudades_array from '@data/ciudades.json';
import provincias_array from '@data/provincias.json';

import ButtonCrear from '@components/ui/ButtonCrear/ButtonCrear';
import ButtonDeleteArchivo from '@components/ui/ButtonDeleteArchivo/ButtonDeleteArchivo';
import ButtonReset from '@components/ui/ButtonReset/ButtonReset';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';

const FormCrearSocio = (props) => {

    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
    const [file, setFile] = useState('');

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
        setValue(SOCIO.IMAGEN, selectedFile);
    }

    function eliminarImagen() {

        setFile(null);
        setValue(SOCIO.IMAGEN, null);
        // elimina la información del archivo en el input
        document.getElementById(SOCIO.IMAGEN).value = '';
    }

    /**
     * 
     * Funciones para react-select
     */
    function manejarProvinciaSelectValue(provinciaSeleccionada) {

        // actualiza el valor en react-hook-form
        setValue(SOCIO.PROVINCIA, provinciaSeleccionada.value);

        // valida el campo, se llama porque Select no es un campo nativo de HTML
        trigger(SOCIO.PROVINCIA);

        // actualiza el código de la provincia para filtrar las ciudades
        setProvinciaSeleccionada(provinciaSeleccionada.code);
    }

    function manejarCiudadSelectValue(ciudadSeleccionada) {

        // actualiza el valor en react-hook-form
        setValue(SOCIO.CIUDAD, ciudadSeleccionada.value);

        // valida el campo, se llama el trigger porque Select no es un campo nativo de HTML
        trigger(SOCIO.CIUDAD);
    }

    function obtenerProvincias() {
        // obtiene las provincias del json
        return provincias_array
            .map(provincia => ({
                value: provincia.label,
                label: provincia.label,
                code: provincia.code,
            }));
    }

    function obtenerCiudadesPorProvincia() {

        if (!provinciaSeleccionada) return [];

        // filtra las ciudades según la provinica seleccionada
        return ciudades_array
            .filter(ciudad => ciudad.parent_code === provinciaSeleccionada)
            .map(ciudad => ({
                value: ciudad.label,
                label: ciudad.label,
            }));
    }

    // modelo de socio
    const SOCIO = {
        DNI: 'dni',
        NOMBRE: 'nombre',
        APELLIDOS: 'apellidos',
        FECHA_NAC: 'fecha_nac',
        EMAIL: 'email',
        TELEFONO: 'telefono',
        DIRECCION: 'direccion',
        PROVINCIA: 'provincia',
        CIUDAD: 'ciudad',
        IMAGEN: 'imagen'
    }

    // socio en su estado inicial
    const SOCIOINICIAL = {
        dni: '',
        nombre: '',
        apellidos: '',
        fecha_nac: '',
        email: '',
        telefono: '',
        direccion: '',
        provincia: '',
        ciudad: '',
        imagen: ''
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
    } = useForm({ defaulValues: SOCIOINICIAL });

    const manejarFormulario = handleSubmit((nuevoSocio) => {

        // devuelve la información que hay en los campos del Login, en JSON
        console.log(nuevoSocio);

        // manda los datos a la función de SOCIO.jsx
        props.manejarCrearSocio(nuevoSocio);
    });

    // función que reseta todos los datos del formulario
    function resetData() {

        reset(SOCIOINICIAL);
        eliminarImagen();
    }

    return (
        <form className='col-12' id='idformsocio' onSubmit={manejarFormulario}>
            <div className='row form-crear-socio'>

                {/* campo DNI */}

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={SOCIO.DNI} className='col-form-label col-form-label-lg'>DNI</label>
                    <input type='text' className='form-control form-control-lg' id={SOCIO.DNI} placeholder='00000000A'

                        {...register(SOCIO.DNI, {
                            required: {
                                value: true,
                                message: 'El DNI es obligatorio',
                            },
                            pattern: {
                                value: /^[0-9]{8}[A-Z]$/,
                                message: 'El DNI debe seguir este patrón: 00000000A',
                            },
                        })}
                    />
                    <ErrorInput>{errors.dni?.message}</ErrorInput>
                </div>

                {/* campo Nombre */}

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={SOCIO.NOMBRE} className='col-form-label col-form-label-lg'>Nombre</label>
                    <input type='text' className='form-control form-control-lg' id={SOCIO.NOMBRE}

                        {...register(SOCIO.NOMBRE, {
                            required: {
                                value: true,
                                message: 'El nombre es obligatorio',
                            },
                        })}
                    />
                    <ErrorInput>{errors.nombre?.message}</ErrorInput>
                </div>

                {/* campo Apellidos */}

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={SOCIO.APELLIDOS} className='col-form-label col-form-label-lg'>Apellidos</label>
                    <input type='text' className='form-control form-control-lg' id={SOCIO.APELLIDOS}

                        {...register(SOCIO.APELLIDOS, {
                            required: {
                                value: true,
                                message: 'Los apellidos son obligatorios',
                            },
                        })}
                    />
                    <ErrorInput>{errors.apellidos?.message}</ErrorInput>
                </div>

                {/* campo imagen */}

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={SOCIO.IMAGEN} className='col-form-label col-form-label-lg'>Imagen</label>
                    <input type='file' className='form-control form-control-lg' id={SOCIO.IMAGEN} onChange={manejarImagen} />
                    {file && (
                        <div className='eliminar-archivo'>
                            <span>{file}</span>

                            <ButtonDeleteArchivo onClick={eliminarImagen} />
                        </div>
                    )}
                    <ErrorInput>{errors.imagen?.message}</ErrorInput>
                </div>

                {/* campo Fecha de nacimiento */}

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={SOCIO.FECHA_NAC} className='col-form-label col-form-label-lg'>Fecha de nacimiento</label>
                    <input type='date' className='flatpickr-calendar form-control form-control-lg' id={SOCIO.FECHA_NAC}

                        {...register(SOCIO.FECHA_NAC, {
                            required: {
                                value: true,
                                message: 'La fecha de nacimiento es obligatoria',
                            },
                        })}
                    />
                    <ErrorInput>{errors.fecha_nac?.message}</ErrorInput>
                </div>

                {/* campo Email */}

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={SOCIO.EMAIL} className='col-form-label col-form-label-lg'>Email</label>
                    <input type='email' className='form-control form-control-lg' id={SOCIO.EMAIL} placeholder='ejemplo@ejemplo.com'

                        {...register(SOCIO.EMAIL, {
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

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={SOCIO.TELEFONO} className='col-form-label col-form-label-lg'>Número de teléfono</label>
                    <input type='tel' className='form-control form-control-lg' id={SOCIO.TELEFONO} placeholder='999999999'

                        {...register(SOCIO.TELEFONO, {
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

                {/* campo Dirección */}

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={SOCIO.DIRECCION} className='col-form-label col-form-label-lg'>Dirección</label>
                    <input type='text' className='form-control form-control-lg' id={SOCIO.DIRECCION} placeholder='Calle Ejemplo, 0'

                        {...register(SOCIO.DIRECCION, {
                            required: {
                                value: true,
                                message: 'La dirección es obligatoria',
                            },
                        })}
                    />
                    <ErrorInput>{errors.direccion?.message}</ErrorInput>
                </div>

                {/* campo Provincia */}

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={SOCIO.PROVINCIA} className='col-form-label col-form-label-lg'>Provincia</label>
                    <Controller
                        name={SOCIO.PROVINCIA}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className='form-control form-control-lg'
                                id={SOCIO.PROVINCIA}
                                options={obtenerProvincias()}
                                placeholder='Selecciona una provincia'
                                onChange={manejarProvinciaSelectValue}
                                value={obtenerProvincias().find(p => p.value === field.value) || null}
                            />
                        )}
                    />
                    {/* el mensaje de error se deve hacer en un input hidden porque Select no es de HTML */}
                    <input type='hidden'
                        {...register(SOCIO.PROVINCIA, {
                            required: {
                                value: true,
                                message: 'Es obligatorio seleccionar una provincia',
                            },
                        })}
                    />
                    <ErrorInput>{errors.provincia?.message}</ErrorInput>
                </div>

                {/* campo Ciudad */}

                <div className='col-12 col-sm-6 col-lg-4 campo'>

                    <label htmlFor={SOCIO.CIUDAD} className='col-form-label col-form-label-lg'>Ciudad</label>
                    <Controller
                        name={SOCIO.CIUDAD}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className='form-control form-control-lg'
                                id={SOCIO.CIUDAD}
                                options={obtenerCiudadesPorProvincia()}
                                placeholder='Selecciona una ciudad'
                                onChange={manejarCiudadSelectValue}
                                value={obtenerCiudadesPorProvincia().find(c => c.value === field.value) || null}
                            />
                        )}

                    />

                    {/* el mensaje de error se deve hacer en un input hidden porque Select no es de HTML */}
                    <input type='hidden'
                        {...register(SOCIO.CIUDAD, {
                            required: {
                                value: true,
                                message: 'Es obligatorio seleccionar una ciudad',
                            },
                        })}
                    />
                    <ErrorInput>{errors.ciudad?.message}</ErrorInput>
                </div>

            </div>

            <div className='row botones'>

                <div className='col-12'>
                    <ButtonCrear>
                        {props.cargando ? 'cargando' : 'Crear Socio'}
                    </ButtonCrear>

                    <ButtonReset onClick={resetData} />
                </div>

            </div>
            {/* JSON.stringify(watch()) */}
        </form>
    );
}

export default FormCrearSocio;
