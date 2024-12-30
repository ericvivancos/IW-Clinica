package com.clinica.clinic_backend.service;

import com.clinica.clinic_backend.dto.RegistroUsuarioDTO;
import com.clinica.clinic_backend.model.Usuario;
import com.clinica.clinic_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(RegistroUsuarioDTO registroUsuarioDTO) {
        if (usuarioRepository.existsByEmail(registroUsuarioDTO.getEmail())) {
            throw new IllegalArgumentException("El email ya está en uso");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(registroUsuarioDTO.getNombre());
        usuario.setEmail(registroUsuarioDTO.getEmail());
        
        // Hashear la contraseña
        String hashedPassword = passwordEncoder.encode(registroUsuarioDTO.getContrasena());
        usuario.setContrasena(hashedPassword);

        return usuarioRepository.save(usuario);
    }
}
