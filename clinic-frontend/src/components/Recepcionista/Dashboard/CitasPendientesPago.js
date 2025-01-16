import React, { useState, useEffect } from "react";
import { obtenerCitasPendientesPago, pagarReserva } from "../../../services/api";

const CitasPendientesPago = () => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Función para cargar las citas pendientes
    const fetchCitasPendientes = async () => {
        try {
            const data = await obtenerCitasPendientesPago();
            setCitas(data);
            setLoading(false);
        } catch (error) {
            setError("Error al cargar las citas pendientes de pago.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCitasPendientes(); // Cargar las citas al montar el componente
    }, []);

    const handlePagar = async (idReserva) => {
        try {
            await pagarReserva(idReserva); // Llama al servicio para pagar la reserva
            alert("Pago realizado con éxito.");
            fetchCitasPendientes(); // Recargar las citas pendientes
        } catch (error) {
            console.error("Error al procesar el pago:", error);
            alert("No se pudo procesar el pago.");
        }
    };

    if (loading) return <p>Cargando citas pendientes de pago...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Citas Pendientes de Pago</h3>
            {citas.length > 0 ? (
                <ul className="space-y-4">
                    {citas.map((cita, index) => (
                        <li key={cita.idReserva} className="border-b pb-4 mb-4 last:border-none">
                            <div>
                                <span className="block text-gray-700 font-semibold">
                                    Cliente: {cita.cliente.nombre}
                                </span>
                                <span className="block text-gray-600">
                                    Servicio: {cita.servicio.nombre}
                                </span>
                                <span className="block text-gray-600">
                                    Fecha: {cita.fecha} - {cita.horaInicio}
                                </span>
                                <span className="block text-gray-600">
                                    Total: {cita.precioTotal.toFixed(2)} €
                                </span>
                            </div>
                            <button
                                onClick={() => handlePagar(cita.id)}
                                className="mt-2 bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                            >
                                Pagar
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay citas pendientes de pago.</p>
            )}
        </div>
    );
};

export default CitasPendientesPago;
