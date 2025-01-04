import React from "react";
import EstadisticasGenerales from "./Dashboard/EstadisticasGenerales";
import GestionUsuarios from "./Dashboard/GestionUsuarios";
import AgendaDelDia from "./Dashboard/AgendaDelDia";
import InformesDocumentos from "./Dashboard/InformesDocumentos";

const DashboardAdmin = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-2">Bienvenido, Ana Rodríguez</h1>
            <p className="text-gray-600 mb-6">Panel de Administración</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EstadisticasGenerales />
                <GestionUsuarios />
                <AgendaDelDia />
                <InformesDocumentos />
            </div>
        </div>
    );
};

export default DashboardAdmin;
