package com.clinica.clinic_backend.controller;

import com.clinica.clinic_backend.dto.SalaResumenDTO;
import com.clinica.clinic_backend.model.Sala;
import com.clinica.clinic_backend.service.SalaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salas")
public class SalaController {

    private final SalaService salaService;

    public SalaController(SalaService salaService) {
        this.salaService = salaService;
    }

    @GetMapping
    public ResponseEntity<?> obtenerSalas() {
        try {
            List<Sala> salas = salaService.obtenerTodasLasSalas();
           
            return ResponseEntity.ok(salas);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al obtener la lista de salas.");
        }
    }
    @GetMapping("/resumen")
    public ResponseEntity<?> obtenerResumenSalas() {
        try {
            List<SalaResumenDTO> resumen = salaService.obtenerResumenSalas();
            return ResponseEntity.ok(resumen);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                                 .body("Error al obtener el resumen de salas.");
        }
    }
}
