import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { authenticated, role, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        window.location.href = "/login"; // Redirige al login tras cerrar sesión
    };

    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">
                    <Link to="/">Clínica Ejemplo</Link>
                </h1>
                <ul className="flex space-x-4">
                    {/* Elementos comunes para todos */}
                    <li>
                        <Link to="/contact">Contacto</Link>
                    </li>

                    {authenticated ? (
                        <>
                            {/* Elementos para usuarios autenticados */}
                            {role === "CLIENTE" && (
                                <>
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/perfil">Mi Perfil</Link>
                                    </li>
                                </>
                            )}
                            {role === "ADMINISTRADOR" && (
                                <>
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    
                                    <li>
                                        <Link to="/usuarios">Usuarios</Link>
                                    </li>

                                </>
                            )}
                            {role === "RECEPCIONISTA" && (
                                <>
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    
                                    <li>
                                        <Link to="/clientes">Clientes</Link>
                                    </li>

                                </>
                            )}
                            <li>
                                <button onClick={handleLogout} className="text-red-300 hover:text-red-500">
                                    Cerrar Sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* Elementos para usuarios no autenticados */}
                            <li>
                                <Link to="/login">Iniciar Sesión</Link>
                            </li>
                            <li>
                                <Link to="/register">Registrarse</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
