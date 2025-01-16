import React from "react";
import PrivateRoute from "../components/PrivateRoute";
import CalendarioReservas from "../components/Recepcionista/Reservas/CalendarioReservas";
import CalendarioCliente from "../components/Clientes/Reservas/CalendarioCliente";


const Reserva= () => {
    const userRole = localStorage.getItem("role"); // Obtén el rol del usuario

    // Verifica si el usuario está autenticado antes de procesar el rol
    if (!userRole) {
        return <PrivateRoute><h1>Redirigiendo...</h1></PrivateRoute>;
    }

    // Renderiza el dashboard correspondiente según el rol
    switch (userRole) {
        case "CLIENTE":
            return (
                <PrivateRoute requiredRole="CLIENTE">
                    <CalendarioCliente />
                </PrivateRoute>
            );
        case "RECEPCIONISTA":
            return (
                <PrivateRoute requiredRole="RECEPCIONISTA">
                    <CalendarioReservas/>
                </PrivateRoute>
            );
        default:
            return (
                <PrivateRoute>
                    <h1>Rol no reconocido</h1>
                </PrivateRoute>
            );
    }
};

export default Reserva;
