import React, { useState, useEffect } from "react";
import { crearReserva,getClientes,getProfesionales,getSalas,getServicios,obtenerPerfil,crearIntentoPago } from "../../services/api"; // Servicio para interactuar con el backend

const ModalCrearReserva = ({ onClose, slot, onSave, rol }) => {
    const [formData, setFormData] = useState({
        idCliente: "", // Cliente preseleccionado si aplica
        idProfesional: "",
        idSala: "",
        idServicio: "",
        fecha: slot ? slot.start.split("T")[0] : "",
        horaInicio: slot ? slot.start.split("T")[1].slice(0, 5) : "",
        horaFin: slot ? slot.end.split("T")[1].slice(0, 5) : "",
    });

    const [clientes, setClientes] = useState([]);
    const [profesionales, setProfesionales] = useState([]);
    const [salas, setSalas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Cargar opciones de clientes, profesionales, salas y servicios
       
            const fetchOptions = async () => {
                try {
                    const [clientesData, profesionalesData, salasData, serviciosData] = await Promise.all([
                        getClientes(),
                        getProfesionales(),
                        getSalas(),
                        getServicios(),
                    ]);
                    setClientes(clientesData);
                    setProfesionales(profesionalesData);
                    setSalas(salasData);
                    setServicios(serviciosData);
                } catch (error) {
                    console.error("Error al cargar las opciones:", error);
                }
            };
            fetchOptions();
        
        

        if(rol === "CLIENTE") {
            const fetchPerfil = async () => {
                try {
                    const perfil = await obtenerPerfil();
                setFormData((prevFormData) => ({
                        ...prevFormData,
                        idCliente: perfil.id.toString(), // Asegúrate de que el perfil devuelve el id del cliente
                    }));
                } catch (error) {
                    console.error("Error al obtener el perfil del cliente:", error);
                }
            }
            fetchPerfil();
        }
    }, [rol]);

    useEffect(() => {
        // Actualizar el total dinámicamente
        const calcularTotal = () => {
            const servicioSeleccionado = servicios.find(
                (servicio) => servicio.id.toString() === formData.idServicio
            );
            if (!servicioSeleccionado || !formData.horaInicio || !formData.horaFin) return;

            // Convertir horas a formato Date para calcular duración
            const horaInicio = new Date(`1970-01-01T${formData.horaInicio}:00`);
            const horaFin = new Date(`1970-01-01T${formData.horaFin}:00`);
            const duracionEnHoras = (horaFin - horaInicio) / (1000 * 60 * 60);

            // Redondear a medias horas y calcular total
            const duracionRedondeada = Math.ceil(duracionEnHoras * 2) / 2; // Ejemplo: 1.25 -> 1.5
            setTotal(duracionRedondeada * servicioSeleccionado.precioPorHora);
        };

        calcularTotal();
    }, [formData.idServicio, formData.horaInicio, formData.horaFin, servicios]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Campo cambiado: ${name}, Valor: ${value}`); // Agregar este log
        setFormData({ ...formData, [name]: value });
    };

    const handleGuardarReserva = async (e) => {
        e.preventDefault();
        try {
            const nuevaReserva = await crearReserva(formData); // Llama al backend
            onSave(nuevaReserva); // Actualiza el calendario con la nueva reserva
            // Mostrar el mensaje de éxito en un alert
            alert("¡Reserva añadida correctamente!");
            // Cerrar el modal después del éxito
            onClose();
        } catch (error) {
            console.error("Error al crear la reserva:", error);
            alert("No se pudo crear la reserva. Por favor, revisa los datos.");
        }
    };
    const handlePagarReserva = async () => {
        setLoading(true);
        try {
            const response = await crearIntentoPago(total); // Total amount to be paid
            const { clientSecret } = response;
    
            if (clientSecret) {
                localStorage.setItem("reservaTemporal", JSON.stringify(formData));
                window.location.href = `/payment?clientSecret=${encodeURIComponent(clientSecret)}`;
            } else {
                throw new Error("No se pudo generar el intento de pago.");
            }
        } catch (error) {
            console.error("Error al generar el intento de pago:", error);
            alert("No se pudo procesar el pago. Inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };
    
    
    
    
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Crear Reserva</h2>
                <form  className="space-y-4">
                    {/* Cliente */}
                   {rol === "RECEPCIONISTA" && (
                     <div>
                     <label htmlFor="idCliente" className="block text-gray-700 font-bold mb-2">
                         Cliente
                     </label>
                     <select
                         id="idCliente"
                         name="idCliente"
                         value={formData.idCliente}
                         onChange={handleChange}
                         className="w-full border border-gray-300 p-2 rounded"
                         required
                     >
                         <option value="">Selecciona un cliente</option>
                         {clientes.map((cliente) => (
                             <option key={cliente.id} value={cliente.id}>
                                 {cliente.nombre}
                             </option>
                         ))}
                     </select>
                 </div>
                   )}

                    {/* Servicio */}
                    <div>
                        <label htmlFor="idServicio" className="block text-gray-700 font-bold mb-2">
                            Servicio
                        </label>
                        <select
                            id="idServicio"
                            name="idServicio"
                            value={formData.idServicio}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        >
                            <option value="">Selecciona un servicio</option>
                            {servicios.map((servicio) => (
                                <option key={servicio.id} value={servicio.id}>
                                    {servicio.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Profesional */}
                    <div>
                        <label htmlFor="idProfesional" className="block text-gray-700 font-bold mb-2">
                            Profesional
                        </label>
                        <select
                            id="idProfesional"
                            name="idProfesional"
                            value={formData.idProfesional}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        >
                            <option value="">Selecciona un profesional</option>
                            {profesionales.map((profesional) => (
                                <option key={profesional.id} value={profesional.id}>
                                    {profesional.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sala */}
                    <div>
                        <label htmlFor="idSala" className="block text-gray-700 font-bold mb-2">
                            Sala
                        </label>
                        <select
                            id="idSala"
                            name="idSala"
                            value={formData.idSala}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        >
                            <option value="">Selecciona una sala</option>
                            {salas.map((sala) => (
                                <option key={sala.id} value={sala.id}>
                                    {sala.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha */}
                    <div>
                        <label htmlFor="fecha" className="block text-gray-700 font-bold mb-2">
                            Fecha
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={formData.fecha}
                            readOnly
                            className="w-full border border-gray-300 p-2 rounded bg-gray-100 cursor-not-allowed"
                            required
                        />
                    </div>

                    {/* Hora Inicio */}
                    <div>
                        <label htmlFor="horaInicio" className="block text-gray-700 font-bold mb-2">
                            Hora de Inicio
                        </label>
                        <input
                            type="time"
                            id="horaInicio"
                            name="horaInicio"
                            value={formData.horaInicio}
                            readOnly
                            className="w-full border border-gray-300 p-2 rounded bg-gray-100 cursor-not-allowed"
                            required
                        />
                    </div>

                    {/* Hora Fin */}
                    <div>
                        <label htmlFor="horaFin" className="block text-gray-700 font-bold mb-2">
                            Hora de Fin
                        </label>
                        <input
                            type="time"
                            id="horaFin"
                            name="horaFin"
                            value={formData.horaFin}
                            readOnly
                            className="w-full border border-gray-300 p-2 rounded bg-gray-100 cursor-not-allowed"
                            required
                        />
                    </div>
                    {/* Mostrar el Total */}
                    <div>
                        <p className="text-gray-700 font-bold">Total: {total.toFixed(2)} €</p>
                    </div>
                    {/* Botones */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Cerrar
                        </button>
                        {rol === "RECEPCIONISTA" ? (
                            <button
                                type="submit"
                                onClick={handleGuardarReserva}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Guardar
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handlePagarReserva}
                                className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${
                                    loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                disabled={loading}
                            >
                                {loading ? "Procesando..." : "Pagar"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCrearReserva;
