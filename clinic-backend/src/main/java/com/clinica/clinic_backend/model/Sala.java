package com.clinica.clinic_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "salas")
@Data
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sala")
    private Long id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;
}
