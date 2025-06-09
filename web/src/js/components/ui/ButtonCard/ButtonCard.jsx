const ButtonCard = ({ children, onClick }) => {

    return (
        <button className='button-card' onClick={onClick}>
            <div className='card-info'>
                <p className='title'>{children}</p>
            </div>
        </button>
    );
}

export default ButtonCard;
