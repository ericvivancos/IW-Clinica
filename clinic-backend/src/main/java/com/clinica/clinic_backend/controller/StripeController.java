package com.clinica.clinic_backend.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.BalanceTransaction;
import com.stripe.model.BalanceTransactionCollection;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pagos")
public class StripeController {

    @PostMapping("/crear-intent")
    public ResponseEntity<?> crearIntentoPago(@RequestBody Map<String, Object> request) {
        try {
            Object valor = request.get("monto"); // Monto en euros
            Double montoEnEuros = valor instanceof Integer ? ((Integer) valor).doubleValue() : (Double) valor;
            Long montoEnCentavos = Math.round(montoEnEuros * 100); // Conversión a centavos

            // Crear intento de pago con `automaticPaymentMethods`
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setCurrency("eur")
                    .setAmount(montoEnCentavos) // Monto en centavos
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .build()
                    )
                    .setDescription("Pago de reserva en la clínica")
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            // Respuesta con el client secret para completar el pago en el frontend
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", intent.getClientSecret());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.status(500).body("Error al crear el intento de pago: " + e.getMessage());
        }
    }
   @GetMapping("/resumen")
public ResponseEntity<?> obtenerResumenIngresos() {
    try {
        // Parámetros para obtener las transacciones de balance
        Map<String, Object> params = new HashMap<>();
        params.put("limit", 100); // Ajusta el límite según lo necesario

        // Obtiene las transacciones de Stripe
        BalanceTransactionCollection transactions = BalanceTransaction.list(params);
        List<BalanceTransaction> listaTransacciones = transactions.getData();

        // Lista para enviar datos de transacciones
        List<Map<String, Object>> resumen = new ArrayList<>();

        for (BalanceTransaction tx : listaTransacciones) {
            // Convertir el timestamp de Stripe a un formato legible
            long timestamp = tx.getCreated() * 1000L; // Stripe devuelve en segundos
            Date fecha = new Date(timestamp);

            // Formato de fecha y hora
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            String fechaHora = sdf.format(fecha);

            // Crear un objeto con los datos necesarios
            Map<String, Object> datosTransaccion = new HashMap<>();
            datosTransaccion.put("timestamp", fechaHora); // Fecha y hora
            datosTransaccion.put("amount", tx.getAmount() / 100.0); // Monto en euros

            resumen.add(datosTransaccion);
        }

        return ResponseEntity.ok(resumen);
    } catch (StripeException e) {
        return ResponseEntity.status(500).body("Error al obtener el resumen de ingresos.");
    }
}


}
