import { createViewMonthGrid } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonDark from '@components/ui/ButtonDark/ButtonDark';

import { useObtenerSocio } from '@hooks/useSocio';
import useToken from '@hooks/useToken';

const CalendarAccesos = () => {

    const navigateTo = useNavigate();

    const { id } = useToken();
    const { socioData, cargando } = useObtenerSocio(id);

    // dirige a los detalles del seguimiento
    function irSeguimiento(seguimiento_id) {
        navigateTo(`/dashboard/seguimiento/${seguimiento_id}`);
    }

    // dirige a la página para crear seguimineto con fecha por defecto
    function irCrearSeguimiento(fecha) {
        navigateTo('/dashboard/seguimiento/crear', { state: { fechaAcceso: fecha } });
    }

    // inicializa el hook del calendar
    const calendar = useCalendarApp({

        // vista solo del mes
        views: [createViewMonthGrid()],
        // array vacío porque en el useEffect se le da los valores
        events: [],
        // plugin para que al hacer click salga el cuadro con detalles
        plugins: [createEventModalPlugin()],
    });

    // llena el calendario de datos
    useEffect(() => {

        if (socioData?.accesos) {

            // valores de events del calendar
            const events = (
                socioData.accesos
                    // no muestra los que aún no han salido
                    .filter(acc => acc.hora_salida !== null)
                    .map(acc => ({
                        id: acc.id,
                        start: acc.hora_entrada,
                        end: acc.hora_salida,
                    }))
            );

            // se actualizan los eventos del calendar
            calendar.events.set(events);
        }
    }, [calendar, socioData?.accesos]);

    // customComponents de Schedule-Xs
    const customComponents = {

        // ventana con detalles

        eventModal: ({ calendarEvent }) => {
            return (
                <div className='row event-modal'>
                    <div className='col-12'><span className='destacado'>Día: </span><span className='reloj'>{calendarEvent.start.slice(0, 10)}</span></div>
                    <div className='col-12'><span className='destacado'>Acceso: </span><span className='reloj'>{calendarEvent.start.slice(11, 16)}</span></div>
                    <div className='col-12'><span className='destacado'>Salida: </span><span className='reloj'>{calendarEvent.end.slice(11, 16)}</span></div>
                    {
                        // si hay un seguimiento con la misma fecha que el calendarEvent
                        socioData.seguimientos.find(seg => seg.fecha === calendarEvent.start.slice(0, 10))
                            ? (
                                // si tiene acceso asignado
                                <div className='col-12 detalles'>
                                    <ButtonDark
                                        onClick={() => irSeguimiento(
                                            socioData
                                                .seguimientos
                                                // seguimiento con la misma fecha que el calendarEvent
                                                .find(seg => seg.fecha === calendarEvent.start.slice(0, 10))
                                                .id
                                        )}
                                    >
                                        <i className='bi bi-search' /> Pulsa para ver detalles del seguimiento
                                    </ButtonDark>
                                </div>
                            ) : (
                                // si NO tiene acceso asignado
                                <div className='col-12 detalles'>
                                    <ButtonDark
                                        onClick={() => irCrearSeguimiento(calendarEvent.start.slice(0, 10))}
                                    >
                                        <i className='bi bi-calendar-plus' /> Crear un seguimiento de este día
                                    </ButtonDark>
                                </div>
                            )
                    }
                </div>
            );
        },
    }

    return (
        <div className='row'>
            <div className='col-12 sx-calendar'>
                {
                    cargando || !socioData?.accesos
                        ? 'Cargando calendario...'
                        : (
                            // calendar

                            <ScheduleXCalendar
                                customComponents={customComponents}
                                calendarApp={calendar}
                            />
                        )
                }
            </div>
        </div>
    );
}

export default CalendarAccesos;
