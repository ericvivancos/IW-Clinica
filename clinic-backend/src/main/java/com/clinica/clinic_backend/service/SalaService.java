package com.clinica.clinic_backend.service;

import com.clinica.clinic_backend.dto.SalaResumenDTO;
import com.clinica.clinic_backend.model.Sala;
import com.clinica.clinic_backend.repository.ReservaRepository;
import com.clinica.clinic_backend.repository.SalaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalaService {

    private final SalaRepository salaRepository;

    private final ReservaRepository reservaRepository;

    public SalaService(SalaRepository salaRepository, ReservaRepository reservaRepository) {
        this.salaRepository = salaRepository;
        this.reservaRepository= reservaRepository;
    }

    public List<Sala> obtenerTodasLasSalas() {
        return salaRepository.findAll();
    }
    public List<SalaResumenDTO> obtenerResumenSalas() {
        List<Sala> salas = salaRepository.findAll();
        LocalDate hoy = LocalDate.now();

        return salas.stream().map(sala -> {
            // Buscar reservas asociadas a la sala para el día actual
            long reservasHoy = reservaRepository.countBySalaAndFecha(sala, hoy);
            boolean ocupada = reservasHoy > 0;

            return new SalaResumenDTO(sala.getNombre(), ocupada, reservasHoy);
        }).collect(Collectors.toList());
    }
}
