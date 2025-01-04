import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", contrasena: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData); // Envía los datos al backend
            setError(""); // Limpia cualquier error previo
            // Actualiza el contexto con el token y rol
            login(response.token, response.role);
            navigate("/dashboard"); // Redirige al usuario al dashboard
        } catch (error) {
            if (error.response && error.response.data) {
                // Extrae el mensaje de error del backend
                const errorMessage = typeof error.response.data === "string"
                    ? error.response.data
                    : error.response.data.message || "Error desconocido";
                setError(errorMessage);
            } else {
                setError("Ocurrió un error inesperado. Por favor, inténtelo de nuevo.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-blue-500 mb-4">Iniciar Sesión</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email" // Asegúrate de incluir el atributo "name"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Introduce tu correo"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="contrasena" className="block text-gray-700 font-bold mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="contrasena"
                        name="contrasena" // Asegúrate de incluir el atributo "name"
                        value={formData.contrasena}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Introduce tu contraseña"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default Login;
