import React from "react";

const DondeEstamos = () => {
    return (
        <div className="py-12 px-4 bg-gray-100">
            <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">
                📍 Dónde Estamos
            </h2>
            <div className="flex justify-center">
                <div className="bg-white p-6 rounded shadow max-w-4xl w-full">
                    <iframe
                        title="Mapa de ubicación"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24310.013700614547!2d-3.7037902593740483!3d40.416775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzAwLjQiTiAzwrA0MicwMS43Ilc!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <p className="text-gray-600 mt-4 text-center">
                        Encuéntranos en nuestra clínica en el centro de Madrid.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DondeEstamos;
