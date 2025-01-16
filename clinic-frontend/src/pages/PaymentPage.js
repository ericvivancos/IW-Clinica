import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Inicializa Stripe con tu clave pública
const stripePromise = loadStripe("pk_test_51QhgcJQFvfgoN0hftCISPMoCl1EEcISLzXaI6QKnwfFPrMEDzf0xZDFAAnLvrtftAp009aaUhGlLi8WQT1bb1A5W00A2LhfwJW");

const PaymentPage = () => {
    const clientSecret = new URLSearchParams(window.location.search).get("clientSecret");

    const options = {
        clientSecret,
        appearance: { theme: "flat" }, // Optional customization
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Realizar Pago</h1>
            {clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default PaymentPage;
