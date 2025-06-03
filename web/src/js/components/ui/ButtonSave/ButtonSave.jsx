const ButtonSave = ({ cargando, children, onClick }) => {

    return (
        <button className='btn btn-success' onClick={onClick}>
            {
                cargando
                    ? <i className='bi bi-arrow-clockwise' />
                    : <i className='bi bi-floppy' />
            } {children}
        </button>
    );
}

export default ButtonSave;
