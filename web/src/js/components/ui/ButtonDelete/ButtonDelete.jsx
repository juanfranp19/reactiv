import Toast from 'bootstrap/js/dist/toast';
import { useEffect, useRef, useState } from 'react';

const ButtonDelete = ({ cargando, children, onClick }) => {

    // referencia del Toast
    const liveToast = useRef(null);

    const [toastBootstrap, setToastBootstrap] = useState(null);

    useEffect(() => {
        // arranca el Toast
        setToastBootstrap(Toast.getOrCreateInstance(liveToast.current));
    }, []);

    // muestra el Toast
    function showToast() {
        toastBootstrap.show();
    }

    return (
        <>
            <button type='button' className='btn btn-danger' onClick={showToast}>
                {
                    cargando
                        ? <i className='bi bi-arrow-clockwise' />
                        : <i className='bi bi-trash' />
                } {children}
            </button>
            
            {/* Toast que aparece tras pulsar el botón */}

            <div className='toast-container position-fixed top-0 start-50 translate-middle-x p-3'>
                <div ref={liveToast} className='toast toast-delete' role='alert' aria-live='assertive' aria-atomic='true'>
                    <div className='toast-body'>

                        <h5>Confirma para <span>eliminar</span></h5>

                        <div className='mt-2 pt-2 border-top'>

                            {/* botón para eliminar */}
                            <button type='button' className='btn btn-danger' onClick={onClick}>
                                {
                                    cargando
                                        ? <i className='bi bi-arrow-clockwise' />
                                        : <i className='bi bi-trash' />
                                }
                            </button>

                            {/* botón para cerrar el Toast */}
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='toast'>
                                <i className='bi bi-x-lg' />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ButtonDelete;
