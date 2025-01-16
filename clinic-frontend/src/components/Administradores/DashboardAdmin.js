import React from "react";
import EstadisticasGenerales from "./Dashboard/EstadisticasGenerales";
import CitasPendientesPago from "../Recepcionista/Dashboard/CitasPendientesPago";
import GestionUsuarios from "./Dashboard/GestionUsuarios";
import ProximasCitas from "../Recepcionista/Dashboard/ProximasCitas";
import InformesIngresos from "./Dashboard/InformesIngresos";

const DashboardAdmin = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <p className="text-gray-600 mb-6">Panel de Administración</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EstadisticasGenerales />
                <CitasPendientesPago/>
                <GestionUsuarios />
                <ProximasCitas/>
                <InformesIngresos />
            </div>
        </div>
    );
};

export default DashboardAdmin;
