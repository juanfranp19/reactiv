const ButtonSave = ({ onClick, cargando }) => {

    return (
        <button className='btn btn-success' onClick={onClick}>
            {
                cargando
                    ? <i className='bi bi-arrow-clockwise' />
                    : <i className='bi bi-floppy' />
            }
        </button>
    );
}

export default ButtonSave;
