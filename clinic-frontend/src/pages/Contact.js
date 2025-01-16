import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
    return (
        <div className="relative">
            {/* Imagen de Fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://www.beedigital.es/wp-content/uploads/2020/09/datos-contacto-negocio-1.jpg')",
                }}
            ></div>

            {/* Overlay Oscuro */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Contenido del Hero */}
            <div className="relative text-white py-20 px-8 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-6">Contáctanos</h1>
                <p className="text-lg mb-4">
                    Estamos aquí para ayudarte. Puedes comunicarte con nosotros a través de los siguientes medios:
                </p>

                {/* Información de Contacto */}
                <div className="bg-white bg-opacity-90 text-gray-800 p-6 rounded shadow-md max-w-md">
                    <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">Información de Contacto</h2>
                    <p className="text-lg mb-2">
                        <span className="font-semibold">Teléfono:</span> +34 987 654 321
                    </p>
                    <p className="text-lg mb-2">
                        <span className="font-semibold">Email:</span> info@fisiocom.com
                    </p>
                    <p className="text-lg mb-2">
                        <span className="font-semibold">Dirección:</span> Calle Fisio, 45, Madrid
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">Horario:</span> Lunes a Viernes, 9:00 AM - 6:00 PM
                    </p>
                </div>

                {/* Redes Sociales */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">Síguenos en Redes Sociales</h2>
                    <div className="flex justify-center gap-6">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-900 text-3xl"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-600 text-3xl"
                        >
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 hover:text-pink-700 text-3xl"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-800 hover:text-blue-900 text-3xl"
                        >
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
