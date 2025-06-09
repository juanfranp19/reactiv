import RutinaCard from '@components/ui/RutinaCard/RutinaCard';

const ListaRutinas = ({ socioData, cargando }) => {

    const obtenerListado = () => {

        // si no hay propiedad de rutinas en socioData, o no hay rutinas en el array, lo muestra
        if (!socioData?.rutinas || socioData?.rutinas.length <= 0) return (
            <div className='row'>
                No hay rutinas
            </div>
        );

        // crea un componente por cada rutina que tenga el socio
        return socioData.rutinas.map((rutina) => (
            <RutinaCard key={rutina.id} id={rutina.id} nombre={rutina.nombre} descripcion={rutina.descripcion} />
        ));
    }

    if (cargando) return <div className='row'>cargando</div>

    return (
        <div className='row'>
            {obtenerListado()}
        </div>
    );
}

export default ListaRutinas;
