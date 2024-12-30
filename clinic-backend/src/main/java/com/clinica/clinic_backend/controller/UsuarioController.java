package com.clinica.clinic_backend.controller;

import com.clinica.clinic_backend.dto.RegistroUsuarioDTO;
import com.clinica.clinic_backend.model.Usuario;
import com.clinica.clinic_backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@Valid @RequestBody RegistroUsuarioDTO registroUsuarioDTO) {
        try {
            Usuario usuario = usuarioService.registrarUsuario(registroUsuarioDTO);
            return ResponseEntity.ok(usuario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Retorna el mensaje de error
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Ocurrió un error inesperado. Por favor, inténtelo más tarde.");
        }
    }
}
