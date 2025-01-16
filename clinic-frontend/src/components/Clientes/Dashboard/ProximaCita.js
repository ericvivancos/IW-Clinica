import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerProximaCita } from "../../../services/api";

const ProximaCita = () => {
    const [cita, setCita] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProximaCita = async () => {
            try {
                const data = await obtenerProximaCita(); // Llamada a la API para obtener la próxima cita
                setCita(data);
            } catch (err) {
                console.error("Error al obtener la próxima cita:", err);
                setError("No tienes citas programadas.");
            }
        };

        fetchProximaCita();
    }, []);

    const handleAgendarCita = () => {
        navigate("/reservas"); // Navegar a la página de agendar citas
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">Próxima Cita</h3>
            {cita ? (
                <div>
                    <p>
                        <strong>Fecha:</strong>{" "}
                        {new Date(cita.fecha).toLocaleDateString("es-ES")}
                    </p>
                    <p>
                        <strong>Hora:</strong> {cita.horaInicio} - {cita.horaFin}
                    </p>
                    <p>
                        <strong>Servicio:</strong> {cita.servicio.nombre}
                    </p>
                    <p>
                        <strong>Profesional:</strong> {cita.profesional.nombre}
                    </p>
                </div>
            ) : (
                <>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={handleAgendarCita}
                    >
                        Agendar Cita
                    </button>
                </>
            )}
        </div>
    );
};

export default ProximaCita;
