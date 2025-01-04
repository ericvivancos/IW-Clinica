import React from "react";
import DashboardCliente from "../components/Clientes/DashboardCliente";
import PrivateRoute from "../components/PrivateRoute";
import DashboardAdmin from "../components/Administradores/DashboardAdmin";
// import DashboardAdministrador from "../components/DashboardAdministrador";

const Dashboard = () => {
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
                    <DashboardCliente />
                </PrivateRoute>
            );
        case "ADMINISTRADOR":
            return (
                <PrivateRoute requiredRole="ADMINISTRADOR">
                    <DashboardAdmin />
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

export default Dashboard;
