import React, { useState } from "react";
import { enviarCorreoRestablecimiento } from "../services/api";

const RecuperarContrasena = () => {
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await enviarCorreoRestablecimiento(email); // Llama al servicio para enviar el correo
            setMensaje("Si el correo está registrado, se ha enviado un enlace para restablecer tu contraseña.");
            setError("");
        } catch (err) {
            setError("Error al procesar la solicitud. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-blue-500 mb-4">Recuperar Contraseña</h1>
            <p className="text-gray-600 mb-4 text-center">
                Ingresa tu correo electrónico registrado y te enviaremos un enlace para restablecer tu contraseña. 
                Si el correo no está registrado, no se enviará nada por motivos de seguridad.
            </p>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Introduce tu correo"
                        required
                    />
                </div>
                {mensaje && <p className="text-green-500 text-sm">{mensaje}</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Enviar Enlace
                </button>
            </form>
        </div>
    );
};

export default RecuperarContrasena;
