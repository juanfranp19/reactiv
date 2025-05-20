const CheckboxDesplegable = ({ isChecked }) => {

    function onClick() {
        isChecked();
    }

    return (
        <label className='container-checkboxdespl'> 
            <input type='checkbox' onClick={onClick} />
            <svg className='chevron-right-checkboxdespl' xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'><path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' /></svg>
            <svg className='chevron-down-checkboxdespl' xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'><path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' /></svg>
        </label>
    );
}

export default CheckboxDesplegable;
