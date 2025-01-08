package com.clinica.clinic_backend.repository;

import com.clinica.clinic_backend.model.Reserva;
import com.clinica.clinic_backend.model.Sala;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    boolean existsByFechaAndSalaAndHoraInicioLessThanAndHoraFinGreaterThan(
            LocalDate fecha,
            Sala sala,
            LocalTime horaFin,
            LocalTime horaInicio
    );
}
