import React, { useState, useEffect } from "react";

const ModalEditarUsuario = ({ mostrar, usuario, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        rol: "CLIENTE",
        activo: true, // Campo para el estado
    });

    useEffect(() => {
        if (usuario) {
            setFormData({
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                activo: usuario.activo, // Inicializa el estado del usuario
            });
        }
    }, [usuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "activo" ? value === "true" : value, // Convierte el valor a booleano
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(usuario.id, formData); // Llama al callback con los datos actualizados
    };

    if (!mostrar) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block font-semibold mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rol" className="block font-semibold mb-1">
                            Rol
                        </label>
                        <select
                            id="rol"
                            name="rol"
                            value={formData.rol}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        >
                            <option value="ADMINISTRADOR">Administrador</option>
                            <option value="RECEPCIONISTA">Recepcionista</option>
                            <option value="PROFESIONAL">Profesional</option>
                            <option value="CLIENTE">Cliente</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="activo" className="block font-semibold mb-1">
                            Estado
                        </label>
                        <select
                            id="activo"
                            name="activo"
                            value={formData.activo.toString()}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        >
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Cancelar
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

export default ModalEditarUsuario;
