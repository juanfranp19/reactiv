import { Notyf } from 'notyf';

const useNotyf = () => {

    // instancia de la clase
    const notyf = new Notyf({
        duration: 4000, // 4 segundos
        position: {
            x: 'center',
            y: 'top',
        },
    });

    // mensaje de error
    const notifyError = (msg) => {
        notyf.error(msg);
    }

    // mensaje de correcto
    const notifySuccess = (msg) => {
        notyf.success(msg);
    }

    return ({ notifyError, notifySuccess });
}

export default useNotyf;
