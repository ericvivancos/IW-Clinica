package com.clinica.clinic_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.clinica.clinic_backend.dto.RestablecerContraseñaRequestDTO;
import com.clinica.clinic_backend.service.EmailService;

@RestController
@RequestMapping("/api/emails")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/restablecer-contrasena")
    public ResponseEntity<?> enviarRestablecimiento(@RequestBody RestablecerContraseñaRequestDTO request) {
        try {
            String contenido = generarContenidoCorreo(request.getToken());
            emailService.enviarCorreo(request.getDestinatario(), "Restablecimiento de Contraseña", contenido);
            return ResponseEntity.ok("Correo enviado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al enviar correo: " + e.getMessage());
        }
    }

    private String generarContenidoCorreo(String token) {
        return "<p>Hola,</p>" +
               "<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>" +
               "<a href='http://localhost:3000/restablecer-contrasena?token=" + token + "'>Restablecer Contraseña</a>";
    }
}
