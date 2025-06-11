import { Notyf } from 'notyf';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_PRODUCTOS = API_URL + '/api/v1/productos';

// se inicializa para que aparezcan los mensajes arriba en el centro de la pantalla
const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top'
    }
});

// servicio para obtener datos de todos los productos
export const getProductos = async () => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener todos los productos
        const response = await fetch(API_URL_PRODUCTOS, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos de los productos');
            return 0;
        }

        console.log(`datos de los productos: `, data);
        return data;

    } catch (error) {

        console.error('error en getProducto: ', error.message);
        throw error;
    }
}

// servicio para crear un producto
export const postProducto = async (data) => {

    try {

        const token = localStorage.getItem('token');
        const formData = new FormData();

        // agrega todos los campos del objeto data al objeto formData,
        // para que el servidor gestione el Objeto de la imagen
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        // envía a la URL de producto los datos del producto por método POST
        const response = await fetch(API_URL_PRODUCTOS, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        // error que sale en pantalla si no se ha podido crear el producto
        if (!response.ok) {

            // mensaje de error del servidor
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);

            // mensaje del observer
            notyf.error(errorData.error);

            return 0;

        } else {

            // coge la respuesta de la API
            const okData = await response.json();

            //alert('Producto creado.');
            notyf.success('Producto creado.');

            console.log('producto creado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al crear el producto.');
        console.error('error al crear producto:', error.message);
        throw error;
    }
}

// servicio para obtener datos de un producto
export const getProducto = async (id) => {

    const token = localStorage.getItem('token');

    try {

        // envía la URL para obtener un producto
        const response = await fetch(`${API_URL_PRODUCTOS}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // respuesta de la API
        const data = await response.json();

        if (!response.ok) {

            console.error(data.message || 'error obtener los datos del producto');
            return 0;
        }

        console.log(`datos del producto ${id}: `, data);
        return data;

    } catch (error) {

        console.error('error en getProducto: ', error.message);
        throw error;
    }
}

// servicio para actualizar un producto
export const putProducto = async (data, id) => {

    try {

        const token = localStorage.getItem('token');
        const formData = new FormData();

        // agrega todos los campos del objeto data al objeto formData,
        // para que el servidor gestione el Objeto de la imagen
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        // para que Laravel trate la petición como un PUT
        formData.append('_method', 'PUT');

        // envía a la URL los datos por método POST, porque no se pueden tratar imágenes en PUT
        const response = await fetch(`${API_URL_PRODUCTOS}/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        // error que sale en pantalla si no se ha podido actualizar el producto
        if (!response.ok) {

            // mensaje de error del servidor
            const errorData = await response.json();
            console.error('Error del servidor:', errorData.erro);

            // mensaje del observer
            notyf.error(errorData.error);

            return null;

        } else {

            // coge la respuesta de la API
            const okData = await response.json();

            notyf.success(okData);

            console.log('producto actualizado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al actualizar el producto.');
        console.error('error al actualizar producto:', error.message);
        throw error;
    }
}

// servicio para eliminar un producto
export const deleteProducto = async (id) => {

    try {

        const token = localStorage.getItem('token');

        // envía a la URL los datos por método DELETE
        const response = await fetch(`${API_URL_PRODUCTOS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // error que sale en pantalla si no se ha podido eliminar el producto
        if (!response.ok) {

            // mensaje de error del servidor
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);

            // mensaje del controlador
            notyf.error(errorData.error);

            return null;

        } else {

            // coge la respuesta de la API
            const okData = await response.json();

            // mensaje del controlador
            notyf.success(okData);

            console.log('producto eliminado: ', okData);
            return okData;
        }

    } catch (error) {

        notyf.error('Error al eliminar el producto.');
        console.error('error al eliminar producto:', error.message);
        throw error;
    }
}
