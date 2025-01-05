import React, { useState, useEffect } from "react";
import { getUsuarios, registerUser, editarUsuario , eliminarUsuario, enviarCorreoRestablecimiento} from "../../../services/api";
import ModalCrearUsuario from "../../Modals/ModalCrearUsuario"
import ModalEditarUsuario from "../../Modals/ModalEditarUsuario";

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
    const [filtroRol, setFiltroRol] = useState(""); // Filtro por rol
    const [filtroEstado, setFiltroEstado] = useState(""); // Filtro por estado
    const [busqueda, setBusqueda] = useState(""); // Campo de búsqueda
    const [cargando, setCargando] = useState(true); // Indicador de carga
    const [error, setError] = useState(""); // Manejo de errores
    const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios(); // Llama al servicio de la API
                setUsuarios(data);
                setCargando(false);
            } catch (error) {
                setError("Error al cargar los usuarios.");
                setCargando(false);
            }
        };

        fetchUsuarios();
    }, []);
    const handleCrearUsuario = async (formData) => {
        try {
            await registerUser(formData); // Llama al servicio para crear un usuario
            const data = await getUsuarios(); // Recarga la lista de usuarios
            setUsuarios(data);
            setMostrarModalCrear(false); // Cierra el modal
        } catch (error) {
            console.error("Error al crear el usuario:", error.response.data.errors[0].defaultMessage);
            alert("Error al crear el usuario.", error.response.data.errors[0].defaultMessage);
        }
    };
    const handleEditarUsuario = async (id, formData) => {
        try {
            await editarUsuario(id, formData); // Llama al servicio para editar el usuario
            const data = await getUsuarios(); // Recarga la lista de usuarios
            setUsuarios(data);
            setMostrarModalEditar(false);
            alert("Usuario actualizado exitosamente.");
        } catch (error) {
            console.error("Error al editar el usuario:", error.response.data.errors[0].defaultMessage);
            alert("Error al editar el usuario.", error.response.data.errors[0].defaultMessage);
        }
    };
    const handleEliminarUsuario = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (!confirmacion) return;
    
        try {
            await eliminarUsuario(id); // Llama al servicio para eliminar el usuario
            const data = await getUsuarios(); // Recarga la lista de usuarios
            setUsuarios(data);
            alert("Usuario eliminado exitosamente.");
        } catch (error) {
            console.error("Error al eliminar el usuario:", error.message);
            alert(error.response?.data || "Error al eliminar el usuario.");
        }
    };
    const handleRestablecerContrasena = async (email) => {
        const confirmacion = window.confirm(
            `¿Estás seguro de que deseas restablecer la contraseña de ${email}?`
        );
        if (!confirmacion) return;
    
        try {
            await enviarCorreoRestablecimiento(email); // Llama al servicio para generar el enlace
            alert("Correo de restablecimiento enviado exitosamente.");
        } catch (error) {
            console.error("Error al restablecer la contraseña:", error.message);
            alert(error.response?.data || "Error al restablecer la contraseña.");
        }
    };
    
    // Filtrar usuarios por búsqueda, rol y estado
    const usuariosFiltrados = usuarios.filter((usuario) => {
        const coincideBusqueda =
            usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.email.toLowerCase().includes(busqueda.toLowerCase());
        const coincideRol = filtroRol ? usuario.rol === filtroRol : true;
        const coincideEstado = filtroEstado ? usuario.activo === (filtroEstado === "Activo") : true;
        return coincideBusqueda && coincideRol && coincideEstado;
    });

    return (
        <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
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
            

            {/* Filtros */}
            <div className="flex space-x-4 mb-4">
                <select
                    value={filtroRol}
                    onChange={(e) => setFiltroRol(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                >
                    <option value="">Todos los Roles</option>
                    <option value="ADMINISTRADOR">Administrador</option>
                    <option value="RECEPCIONISTA">Recepcionista</option>
                    <option value="PROFESIONAL">Profesional</option>
                    <option value="CLIENTE">Cliente</option>
                </select>

                <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                >
                    <option value="">Todos los Estados</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </div>

            {/* Tabla de Usuarios */}
            {cargando ? (
                <p>Cargando usuarios...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Nombre</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Rol</th>
                            <th className="border border-gray-300 p-2">Estado</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.map((usuario) => (
                            <tr c key={usuario.id}>
                                <td className="border border-gray-300 p-2 ">{usuario.nombre}</td>
                                <td className="border border-gray-300 p-2">{usuario.email}</td>
                                <td className="border border-gray-300 p-2">{usuario.rol}</td>
                                <td className="border border-gray-300 p-2">
                                    {usuario.activo ? "Activo" : "Inactivo"}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <button onClick={() => {setUsuarioSeleccionado(usuario); setMostrarModalEditar(true)}} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                                        Editar
                                    </button>
                                    <button  onClick={() => handleEliminarUsuario(usuario.id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2">
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => handleRestablecerContrasena(usuario.email)}
                                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 ml-2"
                                    >
                                        Restablecer Contraseña
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

export default ListaUsuarios;
