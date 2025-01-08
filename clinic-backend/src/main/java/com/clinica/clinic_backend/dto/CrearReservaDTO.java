package com.clinica.clinic_backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CrearReservaDTO {
    @NotNull(message = "El ID del cliente es obligatorio")
    private Long idCliente;

    @NotNull(message = "El ID del Profesional es obligatorio")
    private Long idProfesional;

    @NotNull(message = "El ID de la sala es obligatorio")
    private Long idSala;

    @NotNull(message = "El ID del servicio es obligatorio")
    private Long idServicio;

    @NotNull(message = "La fecha es obligatoria")
    private String fecha;

    @NotNull(message = "La hora de inicio es obligatoria")
    private String horaInicio;

    @NotNull(message = "La hora de fin es obligatoria")
    private String horaFin;
}
