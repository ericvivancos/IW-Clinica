package com.clinica.clinic_backend.repository;

import com.clinica.clinic_backend.model.Reserva;
import com.clinica.clinic_backend.model.Sala;
import com.clinica.clinic_backend.model.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    boolean existsByFechaAndSalaAndHoraInicioLessThanAndHoraFinGreaterThan(
            LocalDate fecha,
            Sala sala,
            LocalTime horaFin,
            LocalTime horaInicio
    );
    Optional<Reserva> findFirstByClienteAndFechaAfterOrderByFechaAscHoraInicioAsc(Usuario cliente, LocalDate fechaActual);
    List<Reserva> findByFechaAndHoraInicioAfterOrderByHoraInicio(LocalDate fecha, LocalTime horaInicio);
    List<Reserva> findByPagadaFalse();
    long countBySalaAndFecha(Sala sala, LocalDate fecha);
    long countByPagadaFalse();
    long countByFecha(LocalDate fecha);
}
