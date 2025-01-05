package com.clinica.clinic_backend.service;

import com.clinica.clinic_backend.dto.EditarUsuarioDTO;
import com.clinica.clinic_backend.dto.LoginRequestDTO;
import com.clinica.clinic_backend.dto.LoginResponseDTO;
import com.clinica.clinic_backend.dto.RegistroUsuarioDTO;
import com.clinica.clinic_backend.model.Usuario;
import com.clinica.clinic_backend.repository.UsuarioRepository;
import com.clinica.clinic_backend.security.JwtUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtils jwtUtils;

    public Usuario registrarUsuario(RegistroUsuarioDTO registroUsuarioDTO) {
        if (usuarioRepository.existsByEmail(registroUsuarioDTO.getEmail())) {
            throw new IllegalArgumentException("El email ya está en uso");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(registroUsuarioDTO.getNombre());
        usuario.setEmail(registroUsuarioDTO.getEmail());
        
         // Asignar el rol
        try {
            Usuario.Rol rol = Usuario.Rol.valueOf(registroUsuarioDTO.getRol().toUpperCase());
            usuario.setRol(rol);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Rol no válido: " + registroUsuarioDTO.getRol());
        }
        // Hashear la contraseña
        String hashedPassword = passwordEncoder.encode(registroUsuarioDTO.getContrasena());
        usuario.setContrasena(hashedPassword);

        return usuarioRepository.save(usuario);
    }
    public LoginResponseDTO login(LoginRequestDTO loginRequest) {

        Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Credenciales incorrectas"));
        if (!passwordEncoder.matches(loginRequest.getContrasena(), usuario.getContrasena())){
            throw new IllegalArgumentException("Credenciales incorrectas");
        }
        String token = jwtUtils.generateToken(usuario.getEmail(), usuario.getRol().name().toUpperCase());
        
        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        response.setRole(usuario.getRol().name());
        return response;
    }
    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }
    public List<Usuario> buscarUsuariosPorNombreOEmail(String query) {
        return usuarioRepository.findByNombreContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query);
    }
    public Usuario editarUsuario(Long id, EditarUsuarioDTO usuarioDTO) {
        // Verificar si el usuario existe
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El usuario no existe."));
    
        // Bloquear edición si el usuario está inactivo
        if (!usuario.getActivo()) {
            throw new IllegalArgumentException("No se puede editar un usuario inactivo.");
        }
    
        // Validar que el email no esté en uso por otro usuario
        if (!usuario.getEmail().equals(usuarioDTO.getEmail()) &&
                usuarioRepository.existsByEmail(usuarioDTO.getEmail())) {
            throw new IllegalArgumentException("El email ya está en uso por otro usuario.");
        }
    
        // Actualizar datos del usuario
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setRol(Usuario.Rol.valueOf(usuarioDTO.getRol().toUpperCase()));
        usuario.setActivo(usuarioDTO.getActivo());
    
        return usuarioRepository.save(usuario);
    }
    public void eliminarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El usuario no existe."));
    
        // Verificar si el usuario está inactivo
        if (usuario.getActivo()) {
            throw new IllegalArgumentException("Solo se pueden eliminar usuarios inactivos.");
        }
    
        // Eliminar el usuario
        usuarioRepository.delete(usuario);
    }
    public String generarTokenRestablecimiento(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));

        String token = UUID.randomUUID().toString();
        usuario.setTokenRestablecimiento(token);
        usuario.setTokenExpiracion(LocalDateTime.now().plusHours(24));

        usuarioRepository.save(usuario);
        return token;
    }
    public void validarTokenRestablecimiento(String token) {
        Usuario usuario = usuarioRepository.findByTokenRestablecimiento(token)
                .orElseThrow(() -> new IllegalArgumentException("Token inválido o expirado."));

        if (usuario.getTokenExpiracion().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("El token ha expirado.");
        }
    }
    public void restablecerContrasena(String token, String nuevaContrasena) {
        Usuario usuario = usuarioRepository.findByTokenRestablecimiento(token)
                .orElseThrow(() -> new IllegalArgumentException("Token inválido o expirado."));
    
        if (usuario.getTokenExpiracion().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("El token ha expirado.");
        }
    
        usuario.setContrasena(passwordEncoder.encode(nuevaContrasena));
        usuario.setTokenRestablecimiento(null);
        usuario.setTokenExpiracion(null);
    
        usuarioRepository.save(usuario);
    }
    public Usuario editarPerfil(String email, EditarUsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
    
        // Actualizar solo los campos permitidos
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setEmail(usuarioDTO.getEmail());
    
        return usuarioRepository.save(usuario);
    }
    public Usuario obtenerPerfil(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
    }
    public List<Usuario> obtenerClientes() {
        return usuarioRepository.findByRol(Usuario.Rol.CLIENTE);
    }
    
}
