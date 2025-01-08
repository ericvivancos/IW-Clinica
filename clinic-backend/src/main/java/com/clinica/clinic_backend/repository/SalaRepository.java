package com.clinica.clinic_backend.repository;

import com.clinica.clinic_backend.model.Sala;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalaRepository extends JpaRepository<Sala, Long> {
    // Métodos personalizados (si los necesitas) pueden ir aquí
}
