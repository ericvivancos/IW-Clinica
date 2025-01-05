import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { validarToken, restablecerContrasena } from "../services/api";

const RestablecerContrasena = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [tokenValido, setTokenValido] = useState(false);

    useEffect(() => {
        const validar = async () => {
            try {
                await validarToken(token); // Valida el token en el backend
                setTokenValido(true);
            } catch (err) {
                setError(err.response?.data || "Token inválido o expirado.");
            }
        };
        validar();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await restablecerContrasena(token, nuevaContrasena); // Envía la nueva contraseña
            setMensaje("Contraseña actualizada exitosamente. Ahora puedes iniciar sesión.");
        } catch (err) {
            setError(error.response?.data.errors[0].defaultMessage || "Error al restablecer la contraseña.");
        }
    };

    if (!tokenValido && !mensaje) {
        return <p>{error || "Validando token..."}</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Restablecer Contraseña</h1>
            {mensaje ? (
                <p className="text-green-500">{mensaje}</p>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                    <div className="mb-4">
                        <label htmlFor="nuevaContrasena" className="block font-semibold mb-1">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="nuevaContrasena"
                            value={nuevaContrasena}
                            onChange={(e) => setNuevaContrasena(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Restablecer Contraseña
                    </button>
                </form>
            )}
        </div>
    );
};

export default RestablecerContrasena;
