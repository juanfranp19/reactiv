const ButtonSave = ({ onClick, cargando }) => {

    return (
        <button className='btn btn-success' onClick={onClick}>
            {
                cargando 
                    ? <i class='bi bi-arrow-clockwise' />
                    : <i class='bi bi-floppy' />
            }
        </button>        
    );
}

export default ButtonSave;
