import React from "react";
import ProximaCita from "./Dashboard/ProximaCita";
import MiPerfil from "./Dashboard/MiPerfil";

const DashboardCliente = () => {
    return (
        <div className="min-h-screen bg-gray-100">
         

            {/* Contenido principal */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ProximaCita />
                    <MiPerfil />
                </div>
            </main>
        </div>
    );
};

export default DashboardCliente;
