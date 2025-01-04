import React from "react";

const GestionUsuarios = () => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">👥 Gestión de Usuarios</h3>
            <p className="text-gray-600">Total de usuarios: 500</p>
            <p className="text-gray-600">Pacientes: 450</p>
            <p className="text-gray-600">Personal médico: 50</p>
            <button className="bg-black text-white py-2 px-4 mt-4 rounded hover:bg-gray-800">
                Gestionar Usuarios
            </button>
        </div>
    );
};

export default GestionUsuarios;
