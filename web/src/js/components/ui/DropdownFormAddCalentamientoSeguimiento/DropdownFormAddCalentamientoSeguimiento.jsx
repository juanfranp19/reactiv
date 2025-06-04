const API_URL = import.meta.env.VITE_API_URL;

import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

import ButtonCrear from '@components/ui/ButtonCrear/ButtonCrear';
import ButtonReset from '@components/ui/ButtonReset/ButtonReset';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';
import ImgNull from '@components/ui/ImgNull/ImgNull';

import { useObtenerCalentamientos } from '@hooks/useCalentamiento';
import { useAttachCalentamientoSeguimiento } from '@hooks/useCalentamientoSeguimiento';

const DropdownFormAddCalentamientoSeguimiento = (props) => {

    const { rutaIdSeguimiento } = useParams();

    const { calentamientosData, cargando: cargandoCalentamientos } = useObtenerCalentamientos();
    const { attachCalentamientoSeguimiento, cargando: cargandoAttachCalentamientoSeguimiento } = useAttachCalentamientoSeguimiento();

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
    }

    // calentamientoRutina en su estado inicial
    const CALENTAMIENTORUTINA_INICIAL = {
        calentamiento_id: '',
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

    const manejarFormulario = handleSubmit(async (nuevoCalentamiento) => {

        // devuelve la información que hay en los campos
        console.log(nuevoCalentamiento);

        // manda los datos a la función de la página SocioRutinaAddCalentamiento.jsx
        const respuestaAttachCalentamiento = await attachCalentamientoSeguimiento(nuevoCalentamiento, rutaIdSeguimiento);

        if (respuestaAttachCalentamiento) {
            props.recargar();
        }
    });

    function resetData() {
        reset(CALENTAMIENTORUTINA_INICIAL);
    }

    return (
        <div className='dropdown'>

            <button type='button' className='btn btn-success dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false' data-bs-auto-close='outside'>
                Añadir calentamiento
            </button>

            <form className='dropdown-menu' id='id-form-add-calentamiento-rutina' onSubmit={manejarFormulario}>
                <div className='row'>

                    {/* campo calentamiento_id */}

                    <div className='col-12 campo'>
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
                </div>

                <div className='row botones'>

                    <div className='col-12'>
                        <ButtonCrear>
                            {cargandoAttachCalentamientoSeguimiento ? 'cargando' : 'Añadir'}
                        </ButtonCrear>

                        <ButtonReset onClick={resetData} />
                    </div>

                </div>
                {/*JSON.stringify(watch())*/}
            </form>

        </div>
    );
}

export default DropdownFormAddCalentamientoSeguimiento;
