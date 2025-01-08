package com.clinica.clinic_backend.controller;

import com.clinica.clinic_backend.model.Servicio;
import com.clinica.clinic_backend.service.ServicioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
public class ServicioController {

    private final ServicioService servicioService;

    public ServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @GetMapping
    public ResponseEntity<?> obtenerServicios() {
        try {
            List<Servicio> servicios = servicioService.obtenerTodosLosServicios();
            return ResponseEntity.ok(servicios);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener la lista de servicios.");
        }
    }
}
