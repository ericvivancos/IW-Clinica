import React from "react";
import HeroSection from "../components/HeroSection";
import ServiciosDestacados from "../components/ServiciosDestacados";
import DondeEstamos from "../components/DondeEstamos";
const Home = () => {
    return (
        <div className="bg-gray-100">
            <HeroSection />
            <ServiciosDestacados />
            <DondeEstamos/>
        </div>
    );
};

export default Home;
