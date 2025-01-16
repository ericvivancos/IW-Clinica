package com.clinica.clinic_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SalaResumenDTO {
    private String nombre;
    private boolean ocupada;
    private long reservasHoy;
}
