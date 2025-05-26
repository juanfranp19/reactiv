const ButtonEdit = ({ onClick }) => {

    return (
        <button className='btn btn-primary' onClick={onClick}>
            <i className='bi bi-pencil-square' />
        </button>
    );
}

export default ButtonEdit;
