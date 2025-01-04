package com.clinica.clinic_backend.controller;

import com.clinica.clinic_backend.dto.EditarUsuarioDTO;
import com.clinica.clinic_backend.dto.LoginRequestDTO;
import com.clinica.clinic_backend.dto.LoginResponseDTO;
import com.clinica.clinic_backend.dto.RegistroUsuarioDTO;
import com.clinica.clinic_backend.model.Usuario;
import com.clinica.clinic_backend.service.UsuarioService;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            LoginResponseDTO response = usuarioService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(500).body( "Ocurrió un error inesperado. Por favor, inténtelo más tarde.");
        }
    }
    @GetMapping("/list")
    public ResponseEntity<?> obtenerUsuarios() {
        try {
            // Llama al servicio para obtener la lista de usuarios
            List<Usuario> usuarios = usuarioService.obtenerTodosLosUsuarios();
            return ResponseEntity.ok(usuarios);
        } catch (Exception e) {
            // Registra el error en la consola para debugging
            System.err.println("Error al obtener usuarios: " + e.getMessage());
            e.printStackTrace(); // Muestra el stack trace del error

            // Devuelve una respuesta de error genérica al cliente
            return ResponseEntity.status(500)
                                 .body("Ocurrió un error al obtener la lista de usuarios. Por favor, inténtelo más tarde.");
        }
    }
    @GetMapping("/search")
    public ResponseEntity<?> buscarUsuarios(@RequestParam(value = "query", required = false) String query) {
        try {
            // Si no hay query, devuelve todos los usuarios
            if (query == null || query.isEmpty()) {
                List<Usuario> usuarios = usuarioService.obtenerTodosLosUsuarios();
                return ResponseEntity.ok(usuarios);
            }
        
            // Busca usuarios por nombre o email
            List<Usuario> usuarios = usuarioService.buscarUsuariosPorNombreOEmail(query);
            return ResponseEntity.ok(usuarios);
        } catch (Exception e) {
            System.err.println("Error al buscar usuarios: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Ocurrió un error al buscar los usuarios.");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> editarUsuario(@PathVariable Long id, @Valid @RequestBody EditarUsuarioDTO usuarioDTO) {
        try {
            Usuario usuario = usuarioService.editarUsuario(id, usuarioDTO);
            return ResponseEntity.ok(usuario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Ocurrió un error al editar el usuario.");
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        try {
            usuarioService.eliminarUsuario(id);
            return ResponseEntity.ok("Usuario eliminado exitosamente.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Ocurrió un error al eliminar el usuario.");
        }
    }


}
