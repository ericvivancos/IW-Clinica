import React from "react";

const ServiciosDestacados = () => {
    const servicios = [
        {
            img: "https://www.vivomisalud.com/content/images/2023/03/Cuida-tu-salud---consulta-siempre-con-tu-m-dico.JPG", // Reemplazar con la URL
            titulo: "Consulta Médica",
            descripcion: "Asesoramiento y atención personalizada por nuestros médicos expertos.",
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQctjxcHaFXYzsthuTUX1tFA354g99H11dG9wkTFEKJkhl3NPcLGooronzU6IRyAyOYe_I&usqp=CAU", // Reemplazar con la URL
            titulo: "Diagnósticos Avanzados",
            descripcion: "Equipamiento moderno para análisis clínicos rápidos y efectivos.",
        },
        {
            img: "https://s1.ppllstatics.com/todoalicante/www/multimedia/2024/09/06/rehabilitacion-denia-kJEG-U2201162205022w9G-1200x840@TodoAlicante.jpg", // Reemplazar con la URL
            titulo: "Terapias Personalizadas",
            descripcion: "Recupérate con tratamientos adaptados a tus necesidades.",
        },
    ];

    return (
        <div className="py-12 px-4 bg-gray-100">
            <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">
                Nuestros Servicios Destacados
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
                {servicios.map((servicio, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded shadow text-center max-w-sm"
                    >
                        {/* Imagen del servicio */}
                        <img
                            src={servicio.img}
                            alt={servicio.titulo}
                            className="w-full h-40 object-cover rounded mb-4"
                        />
                        <h3 className="text-lg font-bold">{servicio.titulo}</h3>
                        <p className="text-gray-600">{servicio.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiciosDestacados;
