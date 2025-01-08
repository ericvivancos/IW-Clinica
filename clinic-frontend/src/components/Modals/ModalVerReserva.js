import React from "react";
import { pagarReserva, eliminarReserva } from "../../services/api";

const ModalVerReserva = ({ onClose, event, onPagar, onBorrar }) => {
    if (!event) return null;

    const { title, start, end, extendedProps } = event;

    // Convertir las fechas y horas usando `Date` nativo
    const startDate = new Date(start);
    const endDate = new Date(end);

    const formattedDate = startDate.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const formattedStartTime = startDate.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const formattedEndTime = endDate.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const handlePagar = async() => {
        try {
            console.log(event.id);
            await pagarReserva(event.id);
            alert(`${extendedProps.cliente} ha pagado la reserva.`);
            onPagar();
        } catch (error) {
            alert(error);
        }
    }
    const handleBorrar = async () => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas borrar esta reserva?");
        if (!confirmacion) return;

        try {
            await eliminarReserva(event.id); // Llama al servicio para eliminar la reserva
            alert("Reserva eliminada correctamente.");
            onBorrar(); // Refresca el calendario
        } catch (error) {
            console.error("Error al borrar la reserva:", error);
            alert(error.message || "Error desconocido al borrar la reserva.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Detalles de la Reserva</h2>
                <ul className="mb-4">
                    <li><strong>Cliente:</strong> {extendedProps.cliente}</li>
                    <li><strong>Profesional:</strong> {extendedProps.profesional}</li>
                    <li><strong>Servicio:</strong> {title}</li>
                    <li><strong>Sala:</strong> {extendedProps.sala}</li>
                    <li><strong>Estado:</strong> {extendedProps.estado}</li>
                    <li><strong>Pagada:</strong> {extendedProps.pagada ? "Sí" : "No"}</li>
                    <li><strong>Fecha:</strong> {formattedDate}</li>
                    <li><strong>Inicio:</strong> {formattedStartTime}</li>
                    <li><strong>Fin:</strong> {formattedEndTime}</li>
                </ul>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                        Cerrar
                    </button>
                    {!extendedProps.pagada && (
                        <button
                            onClick={handlePagar}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Pagar
                        </button>
                    )}
                    <button
                        onClick={handleBorrar}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Borrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalVerReserva;
