import { useState } from 'react';
import Select from 'react-select';

import meses from '@data/meses.json';

import ProductoCard from '@components/ui/ProductoCard/ProductoCard';

const ListaSocioProductos = (props) => {

    const [anioSeleccionado, setAnioSeleccionado] = useState(null);
    const [mesSeleccionado, setMesSeleccionado] = useState(null);

    // función que asigna valor al año seleccionado
    function manejarAnioSelectValue(anioSeleccionado) {
        // actualiza el valor del modelo de año
        setAnioSeleccionado(anioSeleccionado.value);
        console.log(anioSeleccionado);
    }

    // función que asigna valor al mes seleccionado
    function manejarMesSelectValue(mesSeleccionado) {
        // actualiza el valor del modelo de mes
        setMesSeleccionado(mesSeleccionado.value);
        console.log(mesSeleccionado);
    }

    // llena el select con los años
    function obtenerAnios() {
        // obtiene el año actual
        const anioActual = new Date().getFullYear();

        // número de años que se muestran
        const numAnios = 5;

        // inicializa el array
        const anios = [];

        // añade los años desde el año actual menos 5 años, 2020, hasta el año actual, 2025
        for (let i = anioActual - numAnios; i <= anioActual; i++) {
            anios.push({
                value: i,
                label: i.toString(),
            });
        }

        // añade option para no filtrar
        anios.push({
            value: null,
            label: 'No filtrar año',
        });

        return anios;
    }

    function obtenerMeses() {

        return [
            // obtiene los meses del json
            ...meses.map(mes => ({
                value: mes.numero,
                label: mes.nombre,
            })),
            // añade option para no filtrar
            {
                value: null,
                label: 'No filtrar mes',
            }
        ];
    }

    return (
        <>
            {/* formulario para filtrar los productos */}
            <form className='row'>

                {/* select de año */}
                <div className='col-12 col-sm-6 campo'>
                    <Select
                        classNamePrefix='react-select'
                        className='form-control form-control-lg select-lista-socio-productos'
                        id='anio'
                        options={obtenerAnios()}
                        placeholder='Selecciona una año'
                        onChange={manejarAnioSelectValue}
                    />
                </div>

                {/* select de mes */}
                <div className='col-12 col-sm-6 campo'>
                    <Select
                        classNamePrefix='react-select'
                        className='form-control form-control-lg select-lista-socio-productos'
                        id='mes'
                        options={obtenerMeses()}
                        placeholder='Selecciona un mes'
                        onChange={manejarMesSelectValue}
                    />
                </div>

            </form>

            {/* lista de los productos */}
            <div className='row lista-socio-productos'>
                {
                    props.productos
                        // muestra el producto si coincide con su año de compra o si el select es null
                        ?.filter(pro => parseInt(pro.pivot.fecha_compra.slice(0, 4)) === anioSeleccionado || anioSeleccionado === null)
                        // muestra el producto si coincide con su mes de compra o si el select es null
                        ?.filter(pro => pro.pivot.fecha_compra.slice(5, 7) === mesSeleccionado || mesSeleccionado === null)
                        ?.map(pro => {
                            return <ProductoCard
                                key={props.id}
                                nombre={pro.nombre}
                                imagen={pro.imagen}
                                cantidad={pro.pivot.cantidad}
                                fecha_compra={pro.pivot.fecha_compra}
                                precio={pro.precio}
                            />
                        })
                }
            </div>
        </>
    );
}

export default ListaSocioProductos;
