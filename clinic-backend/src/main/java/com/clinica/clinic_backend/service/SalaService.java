package com.clinica.clinic_backend.service;

import com.clinica.clinic_backend.model.Sala;
import com.clinica.clinic_backend.repository.SalaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaService {

    private final SalaRepository salaRepository;

    public SalaService(SalaRepository salaRepository) {
        this.salaRepository = salaRepository;
    }

    public List<Sala> obtenerTodasLasSalas() {
        return salaRepository.findAll();
    }
}
