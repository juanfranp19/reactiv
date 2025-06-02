const formatearFechaCorta = (fecha) => {

    // se crea un objeto Date para obtener por separado cada parte
    const fechaNueva = new Date(fecha);

    // se obtiene cada cosa de la fecha
    const anio = fechaNueva.getFullYear();
    const mes = String(fechaNueva.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaNueva.getDate()).padStart(2, '0');

    // se formatea
    const fechaFormateada = `${dia}-${mes}-${anio}`;

    return fechaFormateada;
}

export default formatearFechaCorta;
