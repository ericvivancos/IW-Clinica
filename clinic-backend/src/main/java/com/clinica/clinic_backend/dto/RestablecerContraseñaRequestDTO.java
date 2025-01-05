package com.clinica.clinic_backend.dto;

import lombok.Data;

@Data
public class RestablecerContraseñaRequestDTO {
    private String destinatario;     // Obligatorio para el correo
    private String token;            // Opcional
    private String nuevaContrasena;  // Opcional
}
