import React from "react";

const InformesDocumentos = () => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">📄 Informes y Documentos</h3>
            <p className="text-gray-600">Informes pendientes: 5</p>
            <p className="text-gray-600">Documentos por revisar: 3</p>
            <button className="bg-black text-white py-2 px-4 mt-4 rounded hover:bg-gray-800">
                Gestionar Documentos
            </button>
        </div>
    );
};

export default InformesDocumentos;
