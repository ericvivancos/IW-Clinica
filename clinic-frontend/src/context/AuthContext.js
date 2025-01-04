import React, { createContext, useState, useEffect } from "react";
import { isAuthenticated as checkAuth, getUserRole as fetchRole } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(checkAuth());
    const [role, setRole] = useState(fetchRole());

    const login = (token, userRole) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        setAuthenticated(true);
        setRole(userRole);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuthenticated(false);
        setRole(null);
    };

    useEffect(() => {
        setAuthenticated(checkAuth());
        setRole(fetchRole());
    }, []);

    return (
        <AuthContext.Provider value={{ authenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
