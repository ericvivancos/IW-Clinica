package com.clinica.clinic_backend.controller;


import java.time.LocalDate;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinica.clinic_backend.model.Usuario;
import com.clinica.clinic_backend.repository.ReservaRepository;
import com.clinica.clinic_backend.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/estadisticas")
public class EstadisticasController {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

     @GetMapping("/generales")
    public ResponseEntity<Map<String, Object>> obtenerEstadisticasGenerales() {
        try {
            // Citas del día
            LocalDate hoy = LocalDate.now();
            long citasHoy = reservaRepository.countByFecha(hoy);
            long totalCitas = reservaRepository.count();
            long citasPendientesPago = reservaRepository.countByPagadaFalse();

            double tasaPendientes = totalCitas > 0
                ? (double) citasPendientesPago / totalCitas * 100
                : 0.0;
            // Doctores activos
            long doctoresActivos = usuarioRepository.countByRol(Usuario.Rol.PROFESIONAL);

            // Respuesta
            Map<String, Object> response = new HashMap<>();
            response.put("citasHoy", citasHoy);
            response.put("doctoresActivos", doctoresActivos);
            response.put("tasaPendientes", tasaPendientes);
            response.put("totalCitas", totalCitas);
            response.put("citasPendientesPago", citasPendientesPago);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                                 .body(Collections.singletonMap("error", "Error al calcular las estadísticas generales"));
        }
    }

   
}

