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
                {/* Logo y Nombre */}
                <div className="flex items-center">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/005/072/571/non_2x/modern-health-clinic-logo-vector.jpg"
                        alt="Logo FisioCom"
                        className="w-16 h-16 mr-3 rounded-full border-2 border-white"
                    />
                    <h1 className="text-xl font-bold">
                        <Link to="/">FisioCom</Link>
                    </h1>
                </div>

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
                                        <Link to="/reservas">Reservar</Link>
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

                                    <li>
                                    <Link to="/reservas">Calendario</Link>
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
