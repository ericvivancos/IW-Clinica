import React, { useEffect, useState } from "react";
import { obtenerEstadisticasGenerales } from "../../../services/api";

const EstadisticasGenerales = () => {
    const [estadisticas, setEstadisticas] = useState({
        citasHoy: 0,
        pacientesNuevosSemana: 0,
        doctoresActivos: 0,
        tasaPendientes: 0,
        totalCitas: 0,
        citasPendientesPago: 0,
    });

    useEffect(() => {
        const fetchEstadisticas = async () => {
            try {
                const generales = await obtenerEstadisticasGenerales();
                setEstadisticas((prev) => ({ ...prev, ...generales }));
            } catch (error) {
                console.error("Error al cargar las estadísticas generales:", error);
            }
        };

        fetchEstadisticas();
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">📊 Estadísticas Generales</h3>
            <p className="text-gray-600">Citas hoy: {estadisticas.citasHoy}</p>
            <p className="text-gray-600">Doctores activos: {estadisticas.doctoresActivos}</p>
            <p className="text-gray-600">Tasa de Pagos Pendientes: {estadisticas.tasaPendientes.toFixed(2)}%</p>
            <p className="text-gray-600">
                Citas Pendientes de Pago: {estadisticas.citasPendientesPago} /{" "}
                {estadisticas.totalCitas}
            </p>
            
        </div>
    );
};

export default EstadisticasGenerales;
