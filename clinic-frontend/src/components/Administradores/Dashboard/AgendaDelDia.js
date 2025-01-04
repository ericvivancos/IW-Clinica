import React from "react";

const AgendaDelDia = () => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">📅 Agenda del Día</h3>
            <p className="text-gray-600">Citas programadas: 30</p>
            <p className="text-gray-600">Salas ocupadas: 5/8</p>
            <p className="text-gray-600">Próxima cita: 10:30 AM</p>
            <button className="bg-black text-white py-2 px-4 mt-4 rounded hover:bg-gray-800">
                Ver Agenda Completa
            </button>
        </div>
    );
};

export default AgendaDelDia;
