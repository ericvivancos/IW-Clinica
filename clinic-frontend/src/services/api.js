import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const registerUser = async (userData) => {
    return await axios.post(`${API_BASE_URL}/usuarios/registro`, userData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
