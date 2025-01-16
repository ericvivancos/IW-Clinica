import React from "react";


const HeroSection = () => {
    return (
        <div className="relative bg-gray-100">
            {/* Imagen superior */}
            <div className="w-full h-64">
                <img
                    src="https://img.freepik.com/fotos-premium/abstracto-borroso-clinica-hospital-interior-medico-fondo-foto-archivo-oficina-fondos-clinica-medica-hospital-desenfocado_1028938-482131.jpg"
                    alt="Clínica"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Hero content */}
            <div className="relative bg-blue-500 text-white text-center py-16 px-4">
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-6">Bienvenido a Nuestra Clínica</h1>
                    <p className="text-lg mb-8">
                        Comprometidos con tu salud y bienestar. ¡Conócenos y cuida tu futuro!
                    </p>
                    <button className="bg-white text-blue-500 font-semibold py-2 px-6 rounded hover:bg-gray-100 flex items-center justify-center mx-auto">
                        Explorar Servicios
                    </button>

                    {/* Iconos destacados */}
                    <div className="flex justify-center items-center mt-12 gap-8">
                        <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                            <p className="font-semibold">Atención Confiable</p>
                        </div>
                        <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

                            <p className="font-semibold">Cuidados Personalizados</p>
                        </div>
                        <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
</svg>

                            <p className="font-semibold">Soporte 24/7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
