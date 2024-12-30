import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <ul className="flex space-x-4">
                <li><Link to="/" className="hover:underline">Inicio</Link></li>
                <li><Link to="/contact" className="hover:underline">Contacto</Link></li>
            </ul>
            <Link
                to="/register"
                className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
            >
                Registrarse
            </Link>
            <Link
                to="/login"
                className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
            >
                Iniciar Sesión
            </Link>
        </nav>
    );
};

export default Navbar;
