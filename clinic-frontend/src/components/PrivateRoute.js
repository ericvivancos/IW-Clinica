import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../services/auth";

const PrivateRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    const userRole = getUserRole();

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" replace />; // Redirige si el rol no coincide
    }

    return children;
};

export default PrivateRoute;
