import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import ProductoCard from '@components/ui/ProductoCard/ProductoCard';

import { useObtenerProductos } from '@hooks/useProducto';

const NUM_PRODUCTOS = 10;

const ListaProductos = () => {

    const { productosData, cargando: cargandoProductosData } = useObtenerProductos();

    const [nombreFiltrado, setNombreFiltrado] = useState('');
    const [contenidoVisible, setContenidoVisible] = useState(NUM_PRODUCTOS);

    // productos visibles
    const productos = (Array.isArray(productosData)
        ? productosData.slice(0, contenidoVisible)
        : []
    );

    const cargarDatos = () => {
        // aumenta el número de productos, pero no más que el total
        setContenidoVisible(prev => Math.min(prev + NUM_PRODUCTOS, productosData.length));
    };

    // función que actualiza el estado del nombre filtrado dependiendo del valor del input
    function actualizarNombreFiltrado(e) {
        setNombreFiltrado(e.target.value);
    }

    return (
        <>
            {/* input para filtrar */}
            <div className='row'>
                <div className='col-12'>

                    <form className='row'>
                        <div className='col-12 campo'>

                            <div className='input-group'>
                                <span className='input-group-text'>
                                    <i className='bi bi-search' />
                                </span>

                                <input
                                    type='text'
                                    className='form-control form-control-lg'
                                    placeholder='Buscar por nombre'
                                    value={nombreFiltrado}
                                    onChange={actualizarNombreFiltrado}
                                />
                            </div>

                        </div>
                    </form>

                </div>
            </div>

            {
                cargandoProductosData ? (
                    'Cargando'
                ) : (
                    <InfiniteScroll
                        dataLength={productos.length} // todos los productos
                        next={cargarDatos} // carga mas 10 productos
                        hasMore={productos.length < (productosData?.length)}
                        loader={<h4>Cargando...</h4>}
                    >
                        <div className='row lista-productos'>
                            {/* Renderiza solo los productos actualmente visibles */}
                            {
                                productos
                                    .filter(producto => producto.nombre.toLowerCase().includes(nombreFiltrado.toLowerCase()))
                                    .map(producto => (
                                        <ProductoCard
                                            key={producto.id}
                                            nombre={producto.nombre}
                                            imagen={producto.imagen}
                                            precio={producto.precio}
                                        />
                                    ))
                            }
                        </div>
                    </InfiniteScroll>
                )
            }
        </>
    );
}

export default ListaProductos;
