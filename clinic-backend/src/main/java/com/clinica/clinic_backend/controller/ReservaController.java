

package com.clinica.clinic_backend.controller;

import com.clinica.clinic_backend.dto.CrearReservaDTO;
import com.clinica.clinic_backend.model.Reserva;
import com.clinica.clinic_backend.service.ReservaService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    /**
     * Endpoint para crear una nueva reserva.
     * @param datosReserva JSON con los datos de la reserva.
     * @return Reserva creada o mensaje de error.
     */
    @PostMapping("/crear")
    public ResponseEntity<?> crearReserva(@Valid @RequestBody CrearReservaDTO datosReserva) {
        try {
            // Delegar la creación al servicio
            Reserva nuevaReserva = reservaService.crearReserva(datosReserva);
            return ResponseEntity.ok(nuevaReserva);
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            // Manejar errores de validación
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            System.err.println(e.getMessage());
            // Manejar otros errores inesperados
            return ResponseEntity.status(500).body("Error al crear la reserva: " + e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<?> obtenerReservas() {
        try {
            List<Reserva> reservas = reservaService.obtenerTodasReservas();
            return ResponseEntity.ok(reservas);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener las reservas: " + e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
public ResponseEntity<?> eliminarReserva(@PathVariable Long id) {
    try {
        reservaService.eliminarReserva(id);
        return ResponseEntity.ok("Reserva eliminada correctamente");
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error al eliminar la reserva");
    }
}

    @PutMapping("/{id}/pagar")
    public ResponseEntity<?> pagarReserva(@PathVariable Long id) {
        try {
            Reserva reservaActualizada = reservaService.pagarReserva(id);
            return ResponseEntity.ok(reservaActualizada);
         } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al marcar la reserva como pagada");
        }
    }
    
}
