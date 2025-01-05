import React, { useState, useEffect } from "react";
import { obtenerPerfil, actualizarPerfil, enviarCorreoRestablecimiento } from "../services/api";

const PerfilUsuario = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: ""
    });
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const data = await obtenerPerfil();
                console.log(data);
                setFormData(data);
            } catch (err) {
                setError("Error al cargar el perfil.");
            }
        };

        cargarPerfil();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actualizarPerfil(formData);
            setMensaje("Perfil actualizado exitosamente.");
        } catch (err) {
            setError("Error al actualizar el perfil.");
        }
    };

    const handleSolicitarCambioContrasena = async () => {
        try {
            await enviarCorreoRestablecimiento(formData.email);
            alert("Correo para restablecer contraseña enviado exitosamente.");
        } catch (err) {
            alert("Error al solicitar cambio de contraseña.");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
            {mensaje && <p className="text-green-500">{mensaje}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nombre" className="block font-semibold mb-1">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block font-semibold mb-1">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Guardar Cambios
                </button>
            </form>
            <button
                onClick={handleSolicitarCambioContrasena}
                className="mt-4 w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
            >
                Solicitar Cambio de Contraseña
            </button>
        </div>
    );
};

export default PerfilUsuario;
