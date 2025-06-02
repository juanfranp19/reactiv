const API_URL = import.meta.env.VITE_API_URL;

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ButtonCancel from '@components/ui/ButtonCancel/ButtonCancel';
import ButtonDelete from '@components/ui/ButtonDelete/ButtonDelete';
import ButtonEdit from '@components/ui/ButtonEdit/ButtonEdit';
import ButtonSave from '@components/ui/ButtonSave/ButtonSave';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';
import ImgNull from '@components/ui/ImgNull/ImgNull';

const EjercicioCard = (props) => {

    const [editMode, setEditMode] = useState(false);

    function cambiarModoEditar() {
        setEditMode(true);
    }

    function quitarModoEditar() {
        setEditMode(false);
    }

    // modelo de ejercicioRutina
    const EJERCICIORUTINA = {
        EJERCICIO_ID: 'ejercicio_id',
        NUM_SERIES: 'num_series',
        NUM_REPETICIONES: 'num_repeticiones',
    }

    // ejercicioRutina en su estado inicial
    const EJERCICIORUTINA_INICIAL = {
        ejercicio_id: props.id,
        num_series: props.num_series,
        num_repeticiones: props.num_repeticiones,
    }

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm({ defaultValues: EJERCICIORUTINA_INICIAL });

    const guardarEjercicio = handleSubmit(async (ejercicioActualizado) => {

        // devuelve la información que hay en los campos
        console.log(ejercicioActualizado);

        //manda los datos a la función de la página ListaRutinaEjercicios.jsx
        await props.manejarUpdateEjercicio(ejercicioActualizado);

        // desactiva el modo de editar
        setEditMode(false);
    });

    const eliminarEjercicio = async () => {

        console.log(props.id);

        //manda los datos a la función de la página ListaRutinaEjercicios.jsx
        await props.manejarDetachEjercicio(props.id);
    }

    return (
        <div className='col-4 card'>
            {
                props.imagen
                    ? <img src={`${API_URL}/storage/ejercicios/imagen/${props.imagen}`} alt={props.nombre} />
                    : <ImgNull />
            }
            <div className='card-body'>
                <h5 className='card-title'>{props.nombre}</h5>
                <h6 className='card-subtitle'>{props.grupo_muscular}</h6>
                {
                    editMode
                        ? (
                            // formulario de los datos de la card
                            <form className='card'>

                                {/* campo num_series */}

                                <div className='campo'>
                                    <label htmlFor={EJERCICIORUTINA.NUM_SERIES} className='col-form-label col-form-label-lg'>Número de series</label>
                                    <input type='number' id={EJERCICIORUTINA.NUM_SERIES} className='form-control form-control-lg'

                                        {...register(EJERCICIORUTINA.NUM_SERIES, {
                                            required: {
                                                value: true,
                                                message: 'Es obligatorio señalar el número de series',
                                            },
                                            min: {
                                                value: 1,
                                                message: 'El el número de series no puede ser negativo ni cero',
                                            },
                                        })}
                                    />
                                    <ErrorInput>{errors.num_series?.message}</ErrorInput>
                                </div>

                                {/* campo num_repeticiones */}

                                <div className='campo'>
                                    <label htmlFor={EJERCICIORUTINA.NUM_REPETICIONES} className='col-form-label col-form-label-lg'>Número de repeticiones</label>
                                    <input type='number' id={EJERCICIORUTINA.NUM_REPETICIONES} className='form-control form-control-lg'

                                        {...register(EJERCICIORUTINA.NUM_REPETICIONES, {
                                            required: {
                                                value: true,
                                                message: 'Es obligatorio señalar el número de repeticiones',
                                            },
                                            min: {
                                                value: 1,
                                                message: 'El número de repeticiones no puede ser negativo ni cero',
                                            },
                                        })}
                                    />
                                    <ErrorInput>{errors.num_repeticiones?.message}</ErrorInput>
                                </div>
                                {/* JSON.stringify(watch()) */}
                            </form>
                        ) : (
                            <ul className='card-info'>
                                <li className='card-text'><span>Series:</span> {props.num_series}</li>
                                <li className='card-text'><span>Repeticiones:</span> {props.num_repeticiones}</li>
                            </ul>
                        )
                }
                <div className='botones'>
                    {
                        editMode
                            ? (
                                // botones en modo editar
                                <>
                                    <ButtonSave onClick={guardarEjercicio} cargando={props.cargandoUpdate} />
                                    <ButtonCancel onClick={quitarModoEditar} />
                                </>
                            ) : (
                                // botones en modo no editar
                                <>
                                    <ButtonEdit onClick={cambiarModoEditar} />
                                    <ButtonDelete onClick={eliminarEjercicio} cargando={props.cargandoDetach} />
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default EjercicioCard;
