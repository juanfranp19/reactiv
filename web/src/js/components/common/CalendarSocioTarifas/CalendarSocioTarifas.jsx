import { createViewMonthGrid } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';

import { useEffect } from 'react';

const CalendarSocioTarifas = ({ cargando, socioTarifas }) => {

    console.log(socioTarifas);

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

        if (!calendar || !calendar.events) return;

        if (socioTarifas) {

            // valores de events del calendar
            const events = (
                socioTarifas
                    ?.map(tarifa => ({
                        id: tarifa.id,
                        start: tarifa.pivot.fecha_inicio,
                        end: tarifa.pivot.fecha_fin,
                        title: tarifa.nombre,
                        description: tarifa.descripcion,
                    }))
            );

            // se actualizan los eventos del calendar
            calendar.events.set(events);
        }
    }, [calendar, socioTarifas]);

    // customComponents de Schedule-X
    const customComponents = {

        // ventana con detalles

        eventModal: ({ calendarEvent }) => {
            return (
                <div className='row event-modal'>
                    <div className='col-12'>
                        <span className='destacado'>Tarifa: </span>{calendarEvent.title}
                    </div>
                    <div className='col-12'>
                        <span className='destacado'>Descripción: </span>{calendarEvent.description}
                    </div>
                    <div className='col-12'>
                        <span className='destacado'>Inicio: </span><span className='reloj'>{calendarEvent.start}</span>
                    </div>
                    <div className='col-12'>
                        <span className='destacado'>Fin: </span><span className='reloj'>{calendarEvent.end}</span>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className='row'>
            <div className='col-12 sx-calendar sx-calendar-tarifas'>
                {
                    cargando
                        ? 'Cargando calendario...'
                        : (
                            // calendar

                            <ScheduleXCalendar
                                calendarApp={calendar}
                                customComponents={customComponents}
                            />
                        )
                }
            </div>
        </div>
    );
}

export default CalendarSocioTarifas;
