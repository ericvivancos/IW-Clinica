import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { crearReserva, pagarReserva } from "../services/api";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const reserva = JSON.parse(localStorage.getItem("reservaTemporal"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            alert("Stripe no está listo para procesar el pago. Inténtalo más tarde.");
            setIsProcessing(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Redirección en caso de éxito
                return_url: `${window.location.origin}/success`,
            },
            redirect: "if_required", // Manejo manual del flujo
        });

        if (error) {
            console.error("Error al procesar el pago:", error.message);
            alert("Error al procesar el pago: " + error.message);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                // Guardar la reserva en el backend
                const nuevaReserva = await crearReserva(reserva);
                console.log(nuevaReserva);
                await pagarReserva(nuevaReserva.id);
                alert("¡Reserva creada con éxito!");
                // Redirigir a la página de éxito
                window.location.href = `${window.location.origin}/success`;
            } catch (error) {
                console.error("Error al guardar la reserva:", error);
                alert("El pago fue exitoso, pero hubo un problema al guardar la reserva.");
            }
        } else {
            alert("Pago no completado. Por favor, inténtalo nuevamente.");
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className={`mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
                    isProcessing ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {isProcessing ? "Procesando..." : "Pagar"}
            </button>
        </form>
    );
};

export default CheckoutForm;
