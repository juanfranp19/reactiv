import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ButtonCrear from '@components/ui/ButtonCrear/ButtonCrear';
import ButtonDeleteArchivo from '@components/ui/ButtonDeleteArchivo/ButtonDeleteArchivo';
import ButtonReset from '@components/ui/ButtonReset/ButtonReset';
import ErrorInput from '@components/ui/ErrorInput/ErrorInput';

const FormCrearProducto = ({ cargandoCrearProducto, manejarCrearProducto }) => {

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
        setValue(PRODUCTO.IMAGEN, selectedFile);
    }

    function eliminarImagen() {

        setFile(null);
        setValue(PRODUCTO.IMAGEN, null);
        // elimina la información del archivo en el input
        document.getElementById(PRODUCTO.IMAGEN).value = '';
    }

    // modelo de producto
    const PRODUCTO = {
        NOMBRE: 'nombre',
        DESCRIPCION: 'descripcion',
        PRECIO: 'precio',
        IMAGEN: 'imagen',
    }

    // socio en su estado inicial
    const PRODUCTOINICIAL = {
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: '',
    }

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
        setValue,
        reset
    } = useForm({ defaultValues: PRODUCTOINICIAL });

    const manejarFormulario = handleSubmit((nuevoProducto) => {

        // devuelve la información que hay en los campos
        console.log(nuevoProducto);

        // manda los datos a la función del prop
        manejarCrearProducto(nuevoProducto);
    });

    // función que reseta todos los datos del formulario
    function resetData() {

        reset(PRODUCTOINICIAL);
        eliminarImagen();
    }

    return (
        <form className='col-12' id='formCrearProducto' onSubmit={manejarFormulario}>
            <div className='row'>

                {/* campo Nombre */}

                <div className='col-12 campo'>

                    <label htmlFor={PRODUCTO.NOMBRE} className='col-form-label col-form-label-lg'>Nombre</label>
                    <input type='text' className='form-control form-control-lg' id={PRODUCTO.NOMBRE}

                        {...register(PRODUCTO.NOMBRE, {
                            required: {
                                value: true,
                                message: 'El nombre es obligatorio',
                            },
                        })}
                    />
                    <ErrorInput>{errors.nombre?.message}</ErrorInput>
                </div>

                {/* campo Descripción */}

                <div className='col-12 campo'>

                    <label htmlFor={PRODUCTO.DESCRIPCION} className='col-form-label col-form-label-lg'>Descripcion</label>
                    <textarea type='text' className='form-control form-control-lg' id={PRODUCTO.DESCRIPCION}

                        {...register(PRODUCTO.DESCRIPCION, {
                            required: {
                                value: true,
                                message: 'La descripción es obligatoria',
                            },
                        })}
                    />
                    <ErrorInput>{errors.descripcion?.message}</ErrorInput>
                </div>

                {/* campo Precio */}

                <div className='col-12 campo'>

                    <label htmlFor={PRODUCTO.PRECIO} className='col-form-label col-form-label-lg'>Precio</label>
                    <div className='input-group'>
                        <input type='number' className='form-control form-control-lg' id={PRODUCTO.PRECIO} aria-describedby='input-group-precio'

                            {...register(PRODUCTO.PRECIO, {
                                required: {
                                    value: true,
                                    message: 'Es obligatorio indicar el precio del producto',
                                },
                                min: {
                                    value: 1,
                                    message: 'El valor no puede ser negativo ni cero',
                                },
                            })}
                        />
                        <span className='input-group-text' id='input-group-precio'>€</span>
                    </div>
                    <ErrorInput>{errors.precio?.message}</ErrorInput>
                </div>

                {/* campo imagen */}

                <div className='col-12 campo'>

                    <label htmlFor={PRODUCTO.IMAGEN} className='col-form-label col-form-label-lg'>Imagen</label>
                    <input type='file' className='form-control form-control-lg' id={PRODUCTO.IMAGEN} onChange={manejarImagen} />
                    {file && (
                        <div className='eliminar-archivo'>
                            <span>{file}</span>

                            <ButtonDeleteArchivo onClick={eliminarImagen} />
                        </div>
                    )}
                    <ErrorInput>{errors.imagen?.message}</ErrorInput>
                </div>

                {/* JSON.stringify(watch()) */}
            </div>


            <div className='row botones'>

                <div className='col-12'>
                    <ButtonCrear>
                        {cargandoCrearProducto ? 'cargando' : 'Crear Socio'}
                    </ButtonCrear>

                    <ButtonReset onClick={resetData} />
                </div>

            </div>

        </form>

    );
}

export default FormCrearProducto;
