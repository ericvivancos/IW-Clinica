package com.clinica.clinic_backend.repository;

import com.clinica.clinic_backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Usuario> findByNombreContainingIgnoreCaseOrEmailContainingIgnoreCase(String nombre, String email);
    Optional<Usuario> findByTokenRestablecimiento(String token);
    List<Usuario> findByRol(Usuario.Rol rol);


}
