package com.clinica.clinic_backend.dto;
import lombok.Data;

@Data
public class RestablecerContraseñaRequestDTO {
    private String destinatario;
    private String token;
}
