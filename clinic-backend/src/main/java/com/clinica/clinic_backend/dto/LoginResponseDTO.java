package com.clinica.clinic_backend.dto;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private String token;
    private String role;
}
