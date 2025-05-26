const ButtonDelete = ({ onClick, cargando }) => {

    return (
        <button className='btn btn-danger' onClick={onClick}>
            {
                cargando
                    ? <i class='bi bi-arrow-clockwise' />
                    : <i className='bi bi-trash' />
            }
        </button>
    );
}

export default ButtonDelete;
