const ButtonEdit = ({ children, onClick }) => {

    return (
        <button className='btn btn-primary' onClick={onClick}>
            <i className='bi bi-pencil-square' /> {children}
        </button>
    );
}

export default ButtonEdit;
