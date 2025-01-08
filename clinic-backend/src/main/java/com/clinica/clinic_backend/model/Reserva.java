package com.clinica.clinic_backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "reservas")
@Data
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_reserva")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Usuario cliente; // Cliente que realiza la reserva

    @ManyToOne
    @JoinColumn(name = "id_profesional", nullable = false)
    private Usuario profesional; // Profesional asignado

    @ManyToOne
    @JoinColumn(name = "id_sala", nullable = false)
    private Sala sala; // Sala donde se realiza la reserva

    @ManyToOne
    @JoinColumn(name = "id_servicio", nullable = false)
    private Servicio servicio; // Servicio asociado a la reserva

    @Column(nullable = false)
    private LocalDate fecha; // Fecha de la reserva

    @Column(nullable = false)
    private LocalTime horaInicio; // Hora de inicio de la reserva

    @Column(nullable = false)
    private LocalTime horaFin; // Hora de fin de la reserva

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoReserva estado = EstadoReserva.PENDIENTE; // Estado de la reserva

    @Column(nullable = false)
    private Boolean pagada = false; // Indica si la reserva está pagada

    @Column(nullable = false)
    private Double precioTotal; // Precio total del servicio reservado

    public enum EstadoReserva {
        PENDIENTE,
        CANCELADA,
        REALIZADA
    }
}
