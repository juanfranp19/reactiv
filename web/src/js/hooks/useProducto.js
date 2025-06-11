import { useCallback, useEffect, useState } from 'react';
import { getProductos, postProducto, getProducto, putProducto, deleteProducto } from '@services/productoService';

// hook para obtener datos de todos los productos
export const useObtenerProductos = () => {

    const [productosData, setProductosData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerProductos = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos de los productos haciendo petición al servicio
            const serviceResponse = await getProductos();

            // se guardan los datos de los productos
            setProductosData(serviceResponse.data);
            //console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos de los productos:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        obtenerProductos();
    }, [obtenerProductos]);

    return ({ productosData, cargando, refresh: obtenerProductos });
}

// hook para crear un producto
export const useCrearProducto = () => {

    const [cargando, setCargando] = useState('');

    const crearProducto = async (formData) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltor por el servicio de Login
        const serviceResponse = await postProducto(formData);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ crearProducto, cargando });
}

// hook para obtener datos de un producto
export const useObtenerProducto = (id) => {

    const [productoData, setProductoData] = useState([]);
    const [cargando, setCargando] = useState('');

    const obtenerProducto = useCallback(async () => {

        // inicializa la carga
        setCargando(true);

        try {

            // obtiene los datos del producto haciendo petición al servicio
            const serviceResponse = await getProducto(id);

            // se guardan los datos del producto
            setProductoData(serviceResponse.data);
            console.log(serviceResponse.data);

        } catch (error) {
            console.error('error al obtener los datos del producto:', error);

        } finally {

            //termina de cargar
            setCargando(false);
        }
    }, [id]);

    useEffect(() => {
        // evita que se ejecute antes de que cargue el id
        if (id) obtenerProducto(id);
    }, [id, obtenerProducto]);

    return ({ productoData, cargando, refresh: obtenerProducto });
}

// hook para actualizar un producto
export const useActualizarProducto = () => {

    const [cargando, setCargando] = useState(false);

    const updateProducto = async (formData, id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await putProducto(formData, id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ updateProducto, cargando });
}

// hook para eliminar un producto
export const useEliminarProducto = () => {

    const [cargando, setCargando] = useState(false);

    const destroyProducto = async (id) => {

        // está cargando
        setCargando(true);

        // recoge los datos devueltos por el servicio
        const serviceResponse = await deleteProducto(id);

        // termina de cargar
        setCargando(false);

        // devuelve los datos recibidos del servicio
        return serviceResponse;
    }

    return ({ destroyProducto, cargando });
}
