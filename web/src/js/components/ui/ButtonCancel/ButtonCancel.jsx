const ButtonCancel = ({ onClick }) => {

    return (
        <button className='btn btn-secondary' onClick={onClick}>
            <i class='bi bi-x-lg' />
        </button>
    );
}

export default ButtonCancel;
