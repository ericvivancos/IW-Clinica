import React, { useEffect, useState } from "react";
import { getUsuarios, getClientes,getProfesionales } from "../../../services/api";
import { useNavigate } from "react-router-dom";
const GestionUsuarios = () => {
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [totalClientes, setTotalClientes] = useState(0);
    const [totalProfesionales, setTotalProfesionales] = useState(0);
    const navigate = useNavigate();
    const handleUsers  = () => {
        navigate("/usuarios")
    }
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const usuarios = await getUsuarios(); // Llamada al API para obtener datos de usuarios
                const clientes = await getClientes();
                const profesionales = await getProfesionales();
                // Setear los datos en los estados
                setTotalUsuarios(usuarios.length);
                setTotalClientes(clientes.length);
                setTotalProfesionales(profesionales.length);
            } catch (error) {
                console.error("Error al obtener datos de usuarios:", error);
            }
        };

        fetchUsuarios();
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">👥 Gestión de Usuarios</h3>
            <p className="text-gray-600">Total de usuarios: {totalUsuarios}</p>
            <p className="text-gray-600">Pacientes: {totalClientes}</p>
            <p className="text-gray-600">Personal médico: {totalProfesionales}</p>
            <button onClick={handleUsers} className="bg-blue-600 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700">
                Gestionar Usuarios
            </button>
        </div>
    );
};

export default GestionUsuarios;
