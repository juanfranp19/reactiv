import { createViewMonthGrid } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';

import { useEffect } from 'react';

const CalendarSocioProductos = ({ cargando, socioProductos }) => {

    // inicializa el hook del calendar
    const calendar = useCalendarApp({

        // vista solo del mes
        views: [createViewMonthGrid()],
        // array vacío porque en el useEffect se le da los valores
        events: [],
        // plugin para que al hacer click salga el cuadro con detalles
        plugins: [createEventModalPlugin()],
    });

    useEffect(() => {

        // evita que se llenen los datos antes de que se haya inicializado el calendar
        if (!calendar || !calendar.events) return;

        if (socioProductos) {

            // valores de events del calendar
            const events = (
                socioProductos
                    ?.map(producto => ({
                        id: producto.id,
                        start: producto.pivot.fecha_compra,
                        end: producto.pivot.fecha_compra,
                        title: producto.nombre,
                        description: producto.descripcion,
                    }))
            );

            // se actualizan los eventos del calendar
            calendar.events.set(events);
        }

    }, [calendar, socioProductos]);

    // customComponents de Schedule-X
    const customComponents = {

        // ventana con detalles

        eventModal: ({ calendarEvent }) => {
            return (
                <div className='row event-modal'>
                    <div className='col-12'>
                        <span className='destacado'>Producto: </span>{calendarEvent.title}
                    </div>
                    <div className='col-12'>
                        <span className='destacado'>Descripción: </span>{calendarEvent.description}
                    </div>
                    <div className='col-12'>
                        <span className='destacado'>Fehca de compra: </span><span className='reloj'>{calendarEvent.start}</span>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className='row'>
            <div className='col-12 sx-calendar sx-calendar-socio-productos'>
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

export default CalendarSocioProductos;
