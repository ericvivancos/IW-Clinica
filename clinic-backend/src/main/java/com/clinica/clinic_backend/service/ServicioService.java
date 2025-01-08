package com.clinica.clinic_backend.service;

import com.clinica.clinic_backend.model.Servicio;
import com.clinica.clinic_backend.repository.ServicioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public ServicioService(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public List<Servicio> obtenerTodosLosServicios() {
        return servicioRepository.findAll();
    }
}
