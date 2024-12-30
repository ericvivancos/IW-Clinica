import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="min-h-[calc(100vh-100px)]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
