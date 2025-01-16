import React, { useState, useEffect } from "react";
import { getProximasCitas } from "../../../services/api";

const ProximasCitas = () => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const data = await getProximasCitas();
                setCitas(data);
            } catch (err) {
                setError("Error al cargar las próximas citas.");
            } finally {
                setLoading(false);
            }
        };
        fetchCitas();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Próximas Citas de Hoy</h3>
            {citas.length === 0 ? (
                <p className="text-gray-600">No hay citas programadas para hoy.</p>
            ) : (
                <ul className="space-y-2">
                    {citas.map((cita) => (
                        <li key={cita.idReserva} className="p-2 border-b border-gray-300">
                            <p>
                                <strong>Hora:</strong> {cita.horaInicio} - {cita.horaFin}
                            </p>
                            <p>
                                <strong>Cliente:</strong> {cita.cliente.nombre}
                            </p>
                            <p>
                                <strong>Servicio:</strong> {cita.servicio.nombre}
                            </p>
                            <p>
                                <strong>Sala:</strong> {cita.sala.nombre}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProximasCitas;
