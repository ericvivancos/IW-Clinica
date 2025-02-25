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
  const response = await axios.post(
    `${API_BASE_URL}/usuarios/login`,
    credentials
  );
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
export const enviarCorreoRestablecimiento = async (email) => {
  console.log(email);
  const response = await axios.post(
    `${API_BASE_URL}/emails/restablecer-contrasena`,
    {
      destinatario: email,
    }
  );
  return response.data;
};
// Eliminar Usuario
export const validarToken = async (token) => {
  const response = await axios.post(
    `${API_BASE_URL}/usuarios/validar-token`,
    null,
    {
      params: { token },
    }
  );
  return response.data;
};
export const restablecerContrasena = async (token, nuevaContrasena) => {
  const response = await axios.post(
    `${API_BASE_URL}/usuarios/restablecer-contrasena`,
    {
      token,
      nuevaContrasena,
    }
  );
  return response.data;
};
export const obtenerPerfil = async () => {
  const response = await axios.get(`${API_BASE_URL}/usuarios/perfil`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
export const actualizarPerfil = async (formData) => {
  const response = await axios.post(
    `${API_BASE_URL}/usuarios/perfil`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
export const getClientes = async () => {
  const response = await axios.get(`${API_BASE_URL}/usuarios/clientes`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
export const getProfesionales = async () => {
  const response = await axios.get(`${API_BASE_URL}/usuarios/profesionales`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
export const crearReserva = async (reservaData) => {
  const response = await axios.post(
    `${API_BASE_URL}/reservas/crear`,
    reservaData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
export const getSalas = async () => {
  const response = await axios.get(`${API_BASE_URL}/salas`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(response.data);
  return response.data;
};
export const getServicios = async () => {
    const response = await axios.get(`${API_BASE_URL}/servicios`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
export const getReservas = async () => {
  const response = await axios.get(`${API_BASE_URL}/reservas`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
  return response.data;
};

export const pagarReserva = async (idReserva) => {
  try {
      const response = await axios.put(`${API_BASE_URL}/reservas/${idReserva}/pagar`, null, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error("Error al pagar la reserva:", error);
      throw error.response?.data || "Error desconocido al pagar la reserva.";
  }
};

export const eliminarReserva = async (idReserva) => {
  try {
      const response = await axios.delete(`${API_BASE_URL}/reservas/${idReserva}`, null, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error("Error al pagar la reserva:", error);
      throw error.response?.data || "Error desconocido al pagar la reserva.";
  }
};
export const crearIntentoPago = async (monto) => {
  const response = await axios.post(`${API_BASE_URL}/pagos/crear-intent`, { monto }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
  return response.data;
};

export const obtenerProximaCita = async () => {
  const response = await axios.get(`${API_BASE_URL}/usuarios/proxima-cita`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
  return response.data;
};
export const getProximasCitas = async () => {
  const response = await axios.get(`${API_BASE_URL}/reservas/proximas`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
  return response.data;
};

export const obtenerCitasPendientesPago = async () => {
  const response = await axios.get(`${API_BASE_URL}/reservas/pendientes-pago`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
  return response.data;
};

export const obtenerResumenSalas = async () => {
  const response = await axios.get(`${API_BASE_URL}/salas/resumen`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
  return response.data;
};
export const obtenerEstadisticasGenerales = async () => {
  const response = await axios.get(`${API_BASE_URL}/estadisticas/generales`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
  return response.data;
};

export const obtenerResumenIngresos = async () => {
  const response = await axios.get(`${API_BASE_URL}/pagos/resumen`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
  return response.data;
};
