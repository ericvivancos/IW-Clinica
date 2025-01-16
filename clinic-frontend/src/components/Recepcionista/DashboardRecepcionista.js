import React from "react";
import ProximasCitas from "./Dashboard/ProximasCitas";
import CitasPendientesPago from "./Dashboard/CitasPendientesPago";
import ResumenSalas from "./Dashboard/ResumenSalas";

const DashboardRecepcionista = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ProximasCitas />
                    <CitasPendientesPago />
                    <ResumenSalas /> 
                </div>
            </main>
        </div>
    );
};

export default DashboardRecepcionista;
