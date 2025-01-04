import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos
        return decodedToken.exp > currentTime; // Verifica si el token no ha expirado
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem("token"); // Elimina el token
    localStorage.removeItem("role"); // Elimina el rol si lo estás almacenando
};

export const getUserRole = () => {
    return localStorage.getItem("role");
};

