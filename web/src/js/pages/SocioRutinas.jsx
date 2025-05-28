import CrearRutina from '@components/common/CrearRutina/CrearRutina';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';
import ListaRutinas from '@components/common/ListaRutinas/ListaRutinas';

const SocioRutinas = () => {

    return (
        <main>
            <DashboardCabecera>
                Tus rutinas
            </DashboardCabecera>

            <CrearRutina />

            <ListaRutinas />
        </main>
    );
}

export default SocioRutinas;
