import React, { useState, useEffect } from "react";
import { crearReserva,getClientes,getProfesionales,getSalas,getServicios } from "../../services/api"; // Servicio para interactuar con el backend

const ModalCrearReserva = ({ onClose, slot, onSave }) => {
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
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Campo cambiado: ${name}, Valor: ${value}`); // Agregar este log
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Crear Reserva</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Cliente */}
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

                    {/* Botones */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Cerrar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCrearReserva;
