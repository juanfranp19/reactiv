const API_URL = import.meta.env.VITE_API_URL;

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ButtonCancel from '@components/ui/ButtonCancel/ButtonCancel';
import ButtonDelete from '@components/ui/ButtonDelete/ButtonDelete';
import ButtonEdit from '@components/ui/ButtonEdit/ButtonEdit';
import ButtonSave from '@components/ui/ButtonSave/ButtonSave';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';
import ImgNull from '@components/ui/ImgNull/ImgNull';

const CalentamientoCard = (props) => {

    const [editMode, setEditMode] = useState(false);

    function cambiarModoEditar() {
        setEditMode(true);
    }

    function quitarModoEditar() {
        setEditMode(false);
    }

    // modelo de calentamientoRutina
    const CALENTAMIENTORUTINA = {
        CALENTAMIENTO_ID: 'calentamiento_id',
        TIEMPO: 'tiempo',
    }

    // calentamientoRutina en su estado inicial
    const CALENTAMIENTORUTINA_INICIAL = {
        calentamiento_id: props.id,
        tiempo: props.tiempo,
    }

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm({ defaultValues: CALENTAMIENTORUTINA_INICIAL });

    const guardarCalentamiento = handleSubmit(async (calentamientoActualizado) => {

        // devuelve la información que hay en los campos
        console.log(calentamientoActualizado);

        //manda los datos a la función de la página ListaRutinaCalentamientos.jsx
        await props.manejarUpdateCalentamiento(calentamientoActualizado);

        // desactiva el modo de editar
        setEditMode(false);
    });

    return (
        <div className='col-4 card'>
            {
                // imagen del calentamiento, si no tiene, se le asigna una de defecto
                props.imagen
                    ? <img src={`${API_URL}/storage/calentamientos/imagen/${props.imagen}`} alt={props.nombre} />
                    : <ImgNull />
            }
            <div className='card-body'>
                <h5 className='card-title'>{props.nombre}</h5>

                {
                    editMode
                        ? (
                            // formulario de los datos de la card
                            <form>
                                <div className='campo'>
                                    <input type='number' id={CALENTAMIENTORUTINA.TIEMPO} className='form-control form-control-lg'

                                        {...register(CALENTAMIENTORUTINA.TIEMPO, {
                                            required: {
                                                value: true,
                                                message: 'Es obligatorio señalar el tiempo del calentamiento',
                                            },
                                            min: {
                                                value: 1,
                                                message: 'El tiempo no puede ser negativo ni cero',
                                            },
                                        })}
                                    />
                                    <ErrorInput>{errors.tiempo?.message}</ErrorInput>
                                </div>
                                {/* JSON.stringify(watch()) */}
                            </form>
                        ) : (
                            // datos de la card
                            <p className='card-text'>{props.tiempo} minutos</p>
                        )
                }

                <div className='botones'>
                    {
                        editMode
                            ? (
                                <>
                                    <ButtonSave onClick={guardarCalentamiento} cargando={props.cargando} />
                                    <ButtonCancel onClick={quitarModoEditar} />
                                </>
                            ) : (
                                <>
                                    <ButtonEdit onClick={cambiarModoEditar} />
                                    <ButtonDelete />
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default CalentamientoCard;
