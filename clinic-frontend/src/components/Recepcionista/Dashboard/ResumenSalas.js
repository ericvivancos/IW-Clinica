import React, { useState, useEffect } from "react";
import { obtenerResumenSalas } from "../../../services/api";

const ResumenSalas = () => {
    const [salas, setSalas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSalas = async () => {
            try {
                const data = await obtenerResumenSalas();
                setSalas(data);
                setLoading(false);
            } catch (error) {
                setError("Error al cargar el resumen de salas.");
                setLoading(false);
            }
        };

        fetchSalas();
    }, []);

    if (loading) return <p>Cargando el resumen de salas...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Resumen de Salas</h3>
            {salas.length > 0 ? (
                <ul className="space-y-4">
                    {salas.map((sala, index) => (
                        <li key={index} className="border-b pb-4 mb-4 last:border-none">
                            <div>
                                <span className="block text-gray-700 font-semibold">
                                    Sala: {sala.nombre}
                                </span>
                                <span className="block text-gray-600">
                                    Estado: {sala.ocupada ? "Ocupada" : "Disponible"}
                                </span>
                                <span className="block text-gray-600">
                                    Reservas de Hoy: {sala.reservasHoy}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay salas registradas.</p>
            )}
        </div>
    );
};

export default ResumenSalas;
