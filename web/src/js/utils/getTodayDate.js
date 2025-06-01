const getTodayDate = () => {

    // obtiene toda la información de la fecha de hoy
    const date = new Date();

    // obtiene el año
    const anio = date.getFullYear();

    // padStart hace que los números sean de dos dígitos y que los huecos los rellene con un 0,
    // es decir, el día 1 lo pasa a 01

    // obtiene el mes, +1 porque los meses van de 0 a 11
    const mes = String(date.getMonth() + 1).padStart(2, '0');

    // obtiene el día
    const dia = String(date.getDate()).padStart(2, '0');

    // mismo formato que en la base de datos
    const fecha = `${anio}-${mes}-${dia}`;

    return fecha;
}

export default getTodayDate;
