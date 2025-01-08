import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getReservas } from "../../services/api"; // Servicio para obtener reservas
import ModalCrearReserva from "../Modals/ModalCrearReserva";
import ModalVerReserva from "../Modals/ModalVerReserva";
import esLocale from "@fullcalendar/core/locales/es";

const CalendarioReservas = () => {
    const [events, setEvents] = useState([]); // Eventos para el calendario
    const [selectedSlot, setSelectedSlot] = useState(null); // Para nuevos slots
    const [selectedRange, setSelectedRange] = useState(null); // Para rangos de slots
    const [selectedEvent, setSelectedEvent] = useState(null); // Para eventos existentes
    const [isCrearModalOpen, setIsCrearModalOpen] = useState(false); // Modal de crear reserva
    const [isVerModalOpen, setIsVerModalOpen] = useState(false); // Modal de ver reserva


        const fetchReservas = async () => {
            try {
                const reservas = await getReservas();
                // Transformar las reservas en el formato requerido por FullCalendar
                const transformedEvents = reservas.map((reserva) => ({
                    id: reserva.id,
                    title: reserva.servicio.nombre,
                    start: `${reserva.fecha}T${reserva.horaInicio}`,
                    end: `${reserva.fecha}T${reserva.horaFin}`,
                    extendedProps: {
                        cliente: reserva.cliente.nombre,
                        profesional: reserva.profesional.nombre,
                        sala: reserva.sala.nombre,
                        estado: reserva.estado,
                        pagada: reserva.pagada,
                    },
                }));
                setEvents(transformedEvents);
            } catch (error) {
                console.error("Error al cargar las reservas:", error);
            }
        };
    
    useEffect( () => {
        fetchReservas();
    });

    // Seleccionar un rango de slots
    const handleSelectRange = (info) => {
        setSelectedRange({
            start: info.startStr,
            end: info.endStr,
        });
        setSelectedSlot(null); // Limpia selección única
        setSelectedEvent(null); // Limpia selección de eventos
        setIsCrearModalOpen(true);
    };

    // Clic en un evento existente
    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setIsVerModalOpen(true);
    };

    // Cerrar modales
    const handleCloseModal = () => {
        setIsCrearModalOpen(false);
        setIsVerModalOpen(false);
        setSelectedSlot(null);
        setSelectedRange(null);
        setSelectedEvent(null);
    };

    // Guardar nueva reserva desde el modal
    const handleSaveReserva = async () => {
        try {
            await fetchReservas();
        }
        catch(error){
            console.error("Error al actualizar las reservas después de guardar:", error);
        }
        handleCloseModal();
    };
    const handleBorrarReserva = async () => {
        try {
            await fetchReservas(); // Recargar las reservas desde el backend
        } catch (error) {
            console.error("Error al recargar las reservas después de borrar:", error);
        }
    };
    return (
        <div className="p-4 max-w-5xl mx-auto bg-gray-50">
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                locale={esLocale}
                allDaySlot={false}
                slotMinTime="09:00:00"
                slotMaxTime="14:00:00"
                selectable={true}
                hiddenDays={[0, 6]}
                events={events}
                select={handleSelectRange} // Para seleccionar slots
                eventClick={handleEventClick} // Para clic en eventos
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "timeGridWeek,timeGridDay",
                }}
                slotLabelFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }}
                selectAllow={(selectInfo) => {
                    const now = new Date();
                    const start = selectInfo.start.getTime();
                    const end = selectInfo.end.getTime();

                    // No permitimos seleccion antes de hoy
                    if (start < now.setHours(0,0,0,0)) {
                        return false;
                    }

                    // Verificar si el rango seleccionado se solapa con eventos existentes
                    for (let reserva of events) {
                        const reservaStart = new Date(reserva.start).getTime();
                        const reservaEnd = new Date(reserva.end).getTime();

                        if (
                            (start >= reservaStart && start < reservaEnd) || // Inicio dentro de un evento
                            (end > reservaStart && end <= reservaEnd) || // Fin dentro de un evento
                            (start <= reservaStart && end >= reservaEnd) // Evento contenido
                        ) {
                            return false;
                        }
                    }

                    const startDay = selectInfo.start.getDate();
                    const endDay = selectInfo.end.getDate();
                    return startDay === endDay; // Permite solo si es el mismo día
                }}
                slotEventOverlap={false}
                eventContent={(eventInfo) => (
                    <div className="cursor-pointer">
                        <b>{eventInfo.timeText}</b> - {eventInfo.event.title}
                    </div>
                )}
            />

            {/* Modal para crear una reserva */}
            {isCrearModalOpen && (
                <ModalCrearReserva
                    onClose={handleCloseModal}
                    slot={selectedSlot || selectedRange} // Pasa slot único o rango
                    onSave={handleSaveReserva}
                />
            )}

            {/* Modal para ver detalles de una reserva */}
            {isVerModalOpen && (
                <ModalVerReserva
                    onClose={handleCloseModal}
                    event={selectedEvent} // Pasa el evento seleccionado
                    onPagar={handleSaveReserva}
                    onBorrar={handleBorrarReserva}
                />
            )}
        </div>
    );
};

export default CalendarioReservas;
