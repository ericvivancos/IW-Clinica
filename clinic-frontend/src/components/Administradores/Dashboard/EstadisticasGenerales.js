import React from "react";

const EstadisticasGenerales = () => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">📊 Estadísticas Generales</h3>
            <p className="text-gray-600">Citas hoy: 25</p>
            <p className="text-gray-600">Pacientes nuevos esta semana: 10</p>
            <p className="text-gray-600">Doctores activos: 8</p>
            <button className="bg-black text-white py-2 px-4 mt-4 rounded hover:bg-gray-800">
                Ver Reportes Detallados
            </button>
        </div>
    );
};

export default EstadisticasGenerales;
