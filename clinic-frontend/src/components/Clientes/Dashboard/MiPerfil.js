import React from "react";
import { useNavigate } from "react-router-dom";

const MiPerfil = () => {
    const navigate = useNavigate();
    const handlePerfil = () => {
        navigate("/perfil"); // Navegar a la página de agendar citas
    };
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">Mi Perfil</h3>
            <p className="text-gray-600 mb-4">Actualiza tu información personal.</p>
            <button onClick={handlePerfil} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Editar Perfil
            </button>
        </div>
    );
};

export default MiPerfil;
