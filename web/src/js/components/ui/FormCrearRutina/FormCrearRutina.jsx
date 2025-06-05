import { useForm } from 'react-hook-form';

import ButtonCrear from '@components/ui/ButtonCrear/ButtonCrear';
import ButtonReset from '@components/ui/ButtonReset/ButtonReset';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';

const FormCrearRutina = (props) => {

    // modelo de Rutina
    const RUTINA = {
        NOMBRE: 'nombre',
        DESCRIPCION: 'descripcion',
    }

    // Rutina en su estado inicial
    const RUTINAINICIAL = {
        nombre: '',
        descripcion: '',
    }

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
        reset
    } = useForm({ defaultValues: RUTINAINICIAL });

    const manejarFormulario = handleSubmit((nuevaRutina) => {

        // muestra la información de la nueva rutina por consola
        console.log(nuevaRutina);

        // manda los datos a la función de la página SocioRutinaCrear.jsx
        props.manejarCrearRutina(nuevaRutina);
    });

    function resetData() {
        reset(RUTINAINICIAL);
    }

    return (
        <form className='col-12' id='idformcrearrutina' onSubmit={manejarFormulario}>
        
            <div className='row'>

                {/* campo nombre */}

                <div className='col-12 campo'>

                    <label htmlFor={RUTINA.NOMBRE} className='col-form-label col-form-label-lg'>Nombre de la rutina</label>
                    <input type='text' id={RUTINA.NOMBRE} className='form-control form-control-lg'

                        {...register(RUTINA.NOMBRE, {
                            required: {
                                value: true,
                                message: 'Es obligatorio asignarle un nombre a la rutina',
                            },
                        })}
                    />
                    <ErrorInput>{errors.nombre?.message}</ErrorInput>
                </div>

                {/* campo descripción */}

                <div className='col-12 campo'>

                    <label htmlFor={RUTINA.DESCRIPCION} className='col-form-label col-form-label-lg'>Descripción de la rutina</label>
                    <textarea id={RUTINA.DESCRIPCION} className='form-control form-control-lg' placeholder='Opcional'

                        {...register(RUTINA.DESCRIPCION)}
                    />
                </div>

            </div>
            <div className='row botones'>
                <div className='col-12'>
                    <ButtonCrear>
                        {props.cargando ? 'cargando' : 'Crear Rutina'}
                    </ButtonCrear>

                    <ButtonReset onClick={resetData} />
                </div>
            </div>
            {/* {JSON.stringify(watch())} */}
        
        </form>
    );
}

export default FormCrearRutina;
