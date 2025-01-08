package com.clinica.clinic_backend.repository;

import com.clinica.clinic_backend.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    // Métodos personalizados (si los necesitas) pueden ir aquí
}
