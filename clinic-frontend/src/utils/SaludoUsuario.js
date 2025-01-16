import React, { useState, useEffect } from "react";
import { obtenerPerfil } from "../services/api";

const SaludoUsuario = () => {
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const perfil = await obtenerPerfil();
                setNombre(perfil.nombre || "Usuario"); // Usa el nombre del perfil o "Usuario" por defecto
            } catch (error) {
                console.error("Error al obtener el perfil:", error);
                setNombre("Usuario");
            }
        };
        fetchPerfil();
    }, []);

    return (
        <h2 className="text-2xl font-bold mb-6">
            Hola, {nombre}
        </h2>
    );
};

export default SaludoUsuario;
