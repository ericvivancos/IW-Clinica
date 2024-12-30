import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
        // Aquí harás la petición al backend para autenticar al usuario
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
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Introduce tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
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
