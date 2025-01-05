import React, { useState, useEffect } from "react";
import { getClientes, registerUser, editarUsuario } from "../../../services/api";
import ModalCrearUsuario from "../../Modals/ModalCrearUsuario";
import ModalEditarUsuario from "../../Modals/ModalEditarUsuario";

const ListaClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [clientesFiltrados, setClientesFiltrados] = useState([]); // Estado para los resultados filtrados
    const [busqueda, setBusqueda] = useState(""); // Campo de búsqueda
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

    // Función para cargar los clientes
    const fetchClientes = async () => {
        try {
            const data = await getClientes(); // Llama al servicio de la API
            setClientes(data);
            setClientesFiltrados(data); // Inicializa los clientes filtrados
            setCargando(false);
        } catch (error) {
            setError("Error al cargar la lista de clientes.");
            setCargando(false);
        }
    };

    useEffect(() => {
        fetchClientes(); // Carga los clientes al montar el componente
    }, []);

    // Manejar la búsqueda
    useEffect(() => {
        if (busqueda.trim() === "") {
            setClientesFiltrados(clientes); // Si no hay búsqueda, muestra todos
        } else {
            const filtro = clientes.filter((cliente) =>
                cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                cliente.email.toLowerCase().includes(busqueda.toLowerCase())
            );
            setClientesFiltrados(filtro); // Actualiza los clientes filtrados
        }
    }, [busqueda, clientes]); // Se ejecuta cada vez que cambian busqueda o clientes

    const handleCrearUsuario = async (formData) => {
        try {
            await registerUser(formData); // Llama al servicio para crear un usuario
            await fetchClientes(); // Recarga la lista de clientes
            setMostrarModalCrear(false); // Cierra el modal
        } catch (error) {
            console.error("Error al crear el usuario:", error.response?.data?.errors?.[0]?.defaultMessage || error.message);
            alert("Error al crear el usuario.");
        }
    };

    const handleEditarUsuario = async (id, formData) => {
        try {
            await editarUsuario(id, formData); // Llama al servicio para editar el usuario
            await fetchClientes(); // Recarga la lista de clientes
            setMostrarModalEditar(false);
            alert("Usuario actualizado exitosamente.");
        } catch (error) {
            console.error("Error al editar el usuario:", error.response?.data?.errors?.[0]?.defaultMessage || error.message);
            alert("Error al editar el usuario.");
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
            <div className="flex justify-between items-center mb-4">
                {/* Barra de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar por nombre o email"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full mb-4"
                />
                {/* Botón de Añadir Usuario */}
                <button
                    onClick={() => setMostrarModalCrear(true)} // Abre el modal
                    className="bg-blue-500 text-white py-2 px-4 rounded ml-4 hover:bg-blue-600"
                >
                    Añadir Usuario
                </button>
            </div>
            {cargando ? (
                <p>Cargando clientes...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Nombre</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.map((cliente) => (
                            <tr key={cliente.id}>
                                <td className="border border-gray-300 p-2">{cliente.nombre}</td>
                                <td className="border border-gray-300 p-2">{cliente.email}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => {
                                            setUsuarioSeleccionado(cliente);
                                            setMostrarModalEditar(true);
                                        }}
                                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <ModalCrearUsuario
                mostrar={mostrarModalCrear}
                onClose={() => setMostrarModalCrear(false)}
                onSubmit={handleCrearUsuario}
            />
            <ModalEditarUsuario
                mostrar={mostrarModalEditar}
                usuario={usuarioSeleccionado}
                onClose={() => setMostrarModalEditar(false)}
                onSubmit={handleEditarUsuario}
            />
        </div>
    );
};

export default ListaClientes;
