import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getReservas } from "../../../services/api"; // Servicio para obtener reservas
import ModalCrearReserva from "../../Modals/ModalCrearReserva";
import esLocale from "@fullcalendar/core/locales/es";

const CalendarioCliente = () => {
    const [events, setEvents] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null); // Para nuevos slots
    const [selectedRange, setSelectedRange] = useState(null); // Para rangos de slots
    const [isCrearModalOpen, setIsCrearModalOpen] = useState(false); // Modal de crear reserva

    // Cargar reservas desde el backend
        const fetchReservas = async () => {
            try {
                const reservas = await getReservas();
                // Transformar las reservas en el formato requerido por FullCalendar
                const transformedEvents = reservas.map((reserva) => ({
                    id: reserva.id,
                    title: "Reservado",
                    start: `${reserva.fecha}T${reserva.horaInicio}`,
                    end: `${reserva.fecha}T${reserva.horaFin}`,
                    backgroundColor: "#D3D3D3", // Gris
                    borderColor: "#A9A9A9",
                    extendedProps: {
                        // Incluimos datos adicionales en caso de uso futuro
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
        setIsCrearModalOpen(true);
    };

    // Cerrar modales
    const handleCloseModal = () => {
        setIsCrearModalOpen(false);
        setSelectedSlot(null);
        setSelectedRange(null);
    };

    const handleSaveReserva = async () => {
        try {
            await fetchReservas();
        }
        catch(error){
            console.error("Error al actualizar las reservas después de guardar:", error);
        }
        handleCloseModal();
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
                    const now = new Date(); // Fecha actual
                    const start = selectInfo.start.getTime();
                    const end = selectInfo.end.getTime();

                    // No permitir selección antes de hoy
                    if (start < now.setHours(0, 0, 0, 0)) {
                        return false;
                    }

                    // Permitir selección solo si no cruza días
                    const startDay = selectInfo.start.getDate();
                    const endDay = selectInfo.end.getDate();
                    return startDay === endDay; // Permite solo si es el mismo día
                }}
                slotEventOverlap={false}
                eventContent={(eventInfo) => (
                    <div className="cursor-pointer">
                        {eventInfo.event.title}
                    </div>
                )}
            />

            {/* Modal para crear una reserva */}
            {isCrearModalOpen && (
                <ModalCrearReserva
                    onClose={handleCloseModal}
                    slot={selectedSlot || selectedRange} // Pasa slot único o rango
                    onSave={handleSaveReserva}
                    rol="CLIENTE"
                />
            )}
        </div>
    );
};

export default CalendarioCliente;
