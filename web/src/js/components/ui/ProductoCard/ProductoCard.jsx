const API_URL = import.meta.env.VITE_API_URL;

const ProductoCard = (props) => {

    return (
        <div className='producto-card'>

            {/* al hacer click lleva a nueva página con la url del servidor para mostrar la imagen */}
            <a href={`${API_URL}/storage/productos/imagen/${props.imagen}`} target='_blank'>
                {/* imagen */}
                <div className='image_container'>

                    <img src={`${API_URL}/storage/productos/imagen/${props.imagen}`} alt={props.nombre} />

                </div>
            </a>

            {/* nombre */}
            <div className='title'>
                <span>{props.nombre}</span>
            </div>

            {
                props.cantidad && (
                    //cantidad
                    <div className='size'>
                        <ul className='list-size'>
                            <li className='item-list'>{props.cantidad} unidades</li>
                        </ul>
                    </div>
                )
            }

            {/* precio por unidad */}
            <div className='action'>
                <div className='price'>
                    <span>Por unidad: {props.precio} €</span>
                </div>
            </div>

            {
                props.cantidad && (
                    // precio total: multiplicado por las unidades compradas
                    <div className='action'>
                        <div className='price'>
                            <span>Total: {props.precio * props.cantidad} €</span>
                        </div>
                    </div>
                )
            }

            {/* fecha */}
            <div className='action'>
                <div className='price'>
                    <span className='reloj'>{props.fecha_compra}</span>
                </div>
            </div>

        </div>
    );
}

export default ProductoCard;
