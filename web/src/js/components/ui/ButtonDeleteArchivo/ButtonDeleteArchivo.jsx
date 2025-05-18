const ButtonDeleteArchivo = ({ onClick }) => {

    return (
        <button type='button' className='button-delete-archivo' onClick={onClick}>
            <i className='bi bi-file-earmark-x' />
        </button>
    );
}

export default ButtonDeleteArchivo;
