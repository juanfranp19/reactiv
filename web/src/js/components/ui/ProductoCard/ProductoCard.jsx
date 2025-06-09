const API_URL = import.meta.env.VITE_API_URL;

const ProductoCard = (props) => {

    return (
        <div class='producto-card'>

            {/* al hacer click lleva a nueva página con la url del servidor para mostrar la imagen */}
            <a href={`${API_URL}/storage/productos/imagen/${props.imagen}`} target='_blank'>
                {/* imagen */}
                <div class='image_container'>

                    <img src={`${API_URL}/storage/productos/imagen/${props.imagen}`} alt={props.nombre} />

                </div>
            </a>

            {/* nombre */}
            <div class='title'>
                <span>{props.nombre}</span>
            </div>

            {/* cantidad */}
            <div class='size'>
                <ul class='list-size'>
                    <li class='item-list'>{props.cantidad} unidades</li>
                </ul>
            </div>

            {/* precio por unidad */}
            <div class='action'>
                <div class='price'>
                    <span>Por unidad: {props.precio} €</span>
                </div>
            </div>

            {/* precio total: multiplicado por las unidades compradas */}
            <div class='action'>
                <div class='price'>
                    <span>Total: {props.precio * props.cantidad} €</span>
                </div>
            </div>

            {/* fecha */}
            <div class='action'>
                <div class='price'>
                    <span className='reloj'>{props.fecha_compra}</span>
                </div>
            </div>

        </div>
    );
}

export default ProductoCard;
