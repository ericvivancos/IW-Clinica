package com.clinica.clinic_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.clinica.clinic_backend.dto.RestablecerContraseñaRequestDTO;
import com.clinica.clinic_backend.service.EmailService;
import com.clinica.clinic_backend.service.UsuarioService;

@RestController
@RequestMapping("/api/emails")
public class EmailController {

    private final EmailService emailService;
    private final UsuarioService usuarioService;

    public EmailController(EmailService emailService, UsuarioService usuarioService) {
        this.emailService = emailService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("/restablecer-contrasena")
    public ResponseEntity<?> enviarRestablecimiento(@RequestBody RestablecerContraseñaRequestDTO request) {
        try {
            // Generar y asociar el token al usuario
            String token = usuarioService.generarTokenRestablecimiento(request.getDestinatario());

            // Crear el contenido del correo
            String contenido = generarContenidoCorreo(token);
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
