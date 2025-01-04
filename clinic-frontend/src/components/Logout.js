import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout(); // Llama al servicio para eliminar el token
        navigate("/login"); // Redirige al inicio de sesión
    }, [navigate]);

    return null; // No se necesita renderizar nada
};

export default Logout;
