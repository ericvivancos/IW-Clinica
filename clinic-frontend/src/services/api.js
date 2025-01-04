import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const registerUser = async (userData) => {
    return await axios.post(`${API_BASE_URL}/usuarios/registro`, userData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/usuarios/login`, credentials);
    const { token, role } = response.data;
    console.log(response.data);
    // Guardar token y rol en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    return response.data;
};

export const apiWithToken = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

// Obtener lista de usuarios
export const getUsuarios = async () => {
    const response = await axios.get(`${API_BASE_URL}/usuarios/list`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Añade el token si usas autenticación con JWT
        },
    });
    return response.data;
};
// Buscar usuario por nombre o email
export const searchUsuarios = async (query) => {
    const response = await axios.get(`${API_BASE_URL}/usuarios/search`, {
        params: { query },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
// Editar Usuario
export const editarUsuario = async (id, usuario) => {
    const response = await axios.put(`${API_BASE_URL}/usuarios/${id}`, usuario, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
// Eliminar Usuario
export const eliminarUsuario = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/usuarios/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};


