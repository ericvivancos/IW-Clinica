import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        contrasena: "",
        rol: "CLIENTE"
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            setError(""); // Limpiar errores previos
            alert("Usuario registrado exitosamente.");
            navigate("/login"); // Redirigir tras registro exitoso
        } catch (error) {
            if (error.response && error.response.data) {
                if (typeof error.response.data === "object") {
                    // Procesar mensajes de error de validación
                    const errores = Object.values(error.response.data).join(" ");
                    setError(errores);
                } else {
                    // Manejar mensajes generales
                    setError(error.response.data.message || "Error desconocido.");
                }
            } else {
                setError("Ocurrió un error al registrar el usuario. Por favor, inténtelo de nuevo.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-4">Registro</h1>
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
                        placeholder="Ingresa tu nombre"
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
                        placeholder="example@correo.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="contrasena" className="block font-semibold mb-1">Contraseña</label>
                    <input
                        type="password"
                        id="contrasena"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                        placeholder="Ingresa tu contraseña"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Register;
