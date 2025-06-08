const ButtonDark = ({ children, onClick }) => {

    return (
        <button type='button' className='btn btn-outline-dark' onClick={onClick}>
            {children}
        </button>
    );
}

export default ButtonDark;
