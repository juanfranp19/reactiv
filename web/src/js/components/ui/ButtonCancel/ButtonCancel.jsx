const ButtonCancel = ({ children, onClick }) => {

    return (
        <button className='btn btn-secondary' onClick={onClick}>
            <i className='bi bi-x-lg' /> {children}
        </button>
    );
}

export default ButtonCancel;
