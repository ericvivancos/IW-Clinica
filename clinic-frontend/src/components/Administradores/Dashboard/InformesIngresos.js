import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { obtenerResumenIngresos } from "../../../services/api";

// Registrar los componentes de Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const InformesIngresosLinea = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchIngresos = async () => {
            try {
                const resumen = await obtenerResumenIngresos();

                // Procesar datos para el gráfico
                const labels = resumen.map((item) =>
                    new Date(item.timestamp).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
                );
                const valores = resumen.map((item) => item.amount);

                // Configuración de datos para Chart.js
                setData({
                    labels, // Eje X: Tiempo
                    datasets: [
                        {
                            label: "Ingresos (€)",
                            data: valores, // Eje Y: Monto
                            borderColor: "#36A2EB", // Color de la línea
                            backgroundColor: "rgba(54, 162, 235, 0.2)", // Relleno
                            pointBackgroundColor: "#36A2EB",
                            pointBorderColor: "#fff",
                            tension: 0.4, // Suavizado de la línea
                        },
                    ],
                });
            } catch (error) {
                console.error("Error al obtener los ingresos:", error);
            }
        };

        fetchIngresos();
    }, []);

    if (!data) {
        return <p>Cargando ingresos...</p>;
    }

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">📈 Ingresos </h3>
            <Line data={data} />
        </div>
    );
};

export default InformesIngresosLinea;
