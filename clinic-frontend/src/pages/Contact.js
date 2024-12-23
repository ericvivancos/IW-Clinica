import React from "react";

const Contact = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-blue-500 mb-4">Contacto</h1>
            <p className="text-lg text-gray-700 mb-2">Teléfono: +34 123 456 789</p>
            <p className="text-lg text-gray-700 mb-2">Email: contacto@clinicademo.com</p>
            <p className="text-lg text-gray-700">Dirección: Calle Salud, 123, Madrid</p>
        </div>
    );
};

export default Contact;
