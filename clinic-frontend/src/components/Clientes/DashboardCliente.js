import React from "react";
import ProximaCita from "./ProximaCita";
import ResultadosRecientes from "./ProximaCita";
import MiPerfil from "./MiPerfil";

const DashboardCliente = () => {
    return (
        <div className="min-h-screen bg-gray-100">
         

            {/* Contenido principal */}
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Hola, Juan Pérez</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ProximaCita />
                    <ResultadosRecientes />
                    <MiPerfil />
                </div>
            </main>
        </div>
    );
};

export default DashboardCliente;
