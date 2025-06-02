import { createViewMonthGrid } from '@schedule-x/calendar';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const CalendarSeguimientos = () => {

    const navigateTo = useNavigate();
    const { id } = useToken();
    const { socioData, cargando } = useObtenerSocio(id);

    //console.log(socioData);

    function navigateSeguimientoDetalles(event) {
        console.log('event', event);

        // lleva a la página para ver detalles del seguimiento
        navigateTo(`${event.id}`);
    }

    //console.log(socioData?.seguimientos);

    // inicializa el hook del calendar
    const calendar = useCalendarApp({
        views: [createViewMonthGrid()],
        events: [], // vacío porque en el useEffect se le da los valores
        callbacks: {
            onEventClick(event) {
                navigateSeguimientoDetalles(event);
            },
        },
    });

    useEffect(() => {

        if (socioData?.seguimientos) {

            // valores de events del calendar
            const events = socioData.seguimientos.map(seg => ({
                id: seg.id,
                start: seg.fecha,
                end: seg.fecha,
            }));

            // se actualizan los eventos del calendar
            calendar.events.set(events);
        }
    }, [calendar, socioData?.seguimientos]);

    //console.log(events);

    return (
        <div className='row'>
            <div className='col-12 sx-calendar'>
                {
                    cargando || !socioData?.seguimientos
                        ? 'Cargando calendario...'
                        : <ScheduleXCalendar calendarApp={calendar} />
                }
            </div>
        </div>
    );
}

export default CalendarSeguimientos;
