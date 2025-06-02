const formatearFechaLarga = (fecha) => {

    // se crea un objeto Date para obtener por separado cada parte
    const fechaNueva = new Date(fecha);

    // array con todos los meses
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];

    // se obtiene cada cosa de la fecha
    const anio = fechaNueva.getFullYear();
    const mes = fechaNueva.getMonth();
    const dia = fechaNueva.getDate();

    // se formatea
    const fechaFormateada = `${dia} de ${meses[mes]} de ${anio}`;

    return fechaFormateada;
}

export default formatearFechaLarga;
