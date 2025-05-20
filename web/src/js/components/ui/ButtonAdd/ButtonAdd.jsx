const ButtonAdd = ({ titulo }) => {

    return (
        <button type='button' className='btn btn-outline-dark btn-add'>
            <div className='container'>
                <div className='row'>
                    {/* aparece encima del icono cuando está hover */}
                    <div className='col-12 titulo'>{titulo}</div>
                </div>
                <div className='row'>
                    <i className='col-12 bi bi-plus' />
                </div>
            </div>
        </button>
    );
}

export default ButtonAdd;
