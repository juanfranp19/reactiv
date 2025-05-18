const ButtonReset = ({ onClick }) => {

    return (
        <button type='reset' className='btn btn-secondary button-reset' onClick={onClick}>
            <i className='bi bi-recycle' />
        </button>
    );
}

export default ButtonReset;
