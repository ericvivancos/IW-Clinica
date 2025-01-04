import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ListaUsuarios from "./components/Administradores/Usuarios/ListaUsuarios";

const App = () => {
    return (
        <AuthProvider>
        <Router>
            <Navbar />
            <div className="min-h-[calc(100vh-100px)]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/usuarios" element={<PrivateRoute requiredRole="ADMINISTRADOR"><ListaUsuarios/></PrivateRoute>}/>
                </Routes>
            </div>
            <Footer />
        </Router>
        </AuthProvider>
    );
};

export default App;
