import React from "react";

const ResultadosRecientes = () => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">Resultados Recientes</h3>
            <p className="text-gray-600 mb-4">No hay resultados recientes.</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Ver Historial Médico
            </button>
        </div>
    );
};

export default ResultadosRecientes;
