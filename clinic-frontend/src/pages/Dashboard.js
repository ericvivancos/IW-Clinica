import React from "react";
import DashboardCliente from "../components/Clientes/DashboardCliente";
import DashboardAdmin from "../components/Administradores/DashboardAdmin";
import DashboardRecepcionista from "../components/Recepcionista/DashboardRecepcionista";
import SaludoUsuario from "../utils/SaludoUsuario";
import PrivateRoute from "../components/PrivateRoute";

const Dashboard = () => {
    const userRole = localStorage.getItem("role"); // Obtén el rol del usuario
    console.log(userRole);
    if (!userRole) {
        return <PrivateRoute><h1>Redirigiendo...</h1></PrivateRoute>;
    }

    return (
        <PrivateRoute requiredRole={userRole}>
            <div className="min-h-screen bg-gray-100">
                {/* Contenido común del dashboard */}
                <div className="container mx-auto px-4 py-8">
                    <SaludoUsuario />
                    {/* Renderiza el dashboard específico */}
                    {userRole === "CLIENTE" && <DashboardCliente />}
                    {userRole === "ADMINISTRADOR" && <DashboardAdmin />}
                    {userRole === "RECEPCIONISTA" && <DashboardRecepcionista />}
                </div>
            </div>
        </PrivateRoute>
    );
};

export default Dashboard;
