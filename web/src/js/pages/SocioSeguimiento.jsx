import CalendarSeguimientos from '@components/common/CalendarSeguimientos/CalendarSeguimientos';
import Crear from '@components/common/Crear/Crear';
import DashboardCabecera from '@components/common/DashboardCabecera/DashboardCabecera';

import ButtonDark from '@components/ui/ButtonDark/ButtonDark';

const SocioSeguimiento = () => {

    return (
        <main>
            <DashboardCabecera>
                Tu seguimiento
            </DashboardCabecera>

            <Crear>
                Crear seguimiento
            </Crear>

            <div className='row'>
                <div className='col-12 main'>
                    <ButtonDark >
                        <i className='bi bi-folder2-open' /> Ir a tus accesos
                    </ButtonDark>
                </div>
            </div>

            <CalendarSeguimientos />
        </main>
    );
}

export default SocioSeguimiento;
