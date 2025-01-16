package com.clinica.clinic_backend.service;

import com.clinica.clinic_backend.dto.CrearReservaDTO;
import com.clinica.clinic_backend.model.Reserva;
import com.clinica.clinic_backend.model.Usuario;
import com.clinica.clinic_backend.model.Sala;
import com.clinica.clinic_backend.model.Servicio;
import com.clinica.clinic_backend.repository.ReservaRepository;
import com.clinica.clinic_backend.repository.UsuarioRepository;
import com.clinica.clinic_backend.repository.SalaRepository;
import com.clinica.clinic_backend.repository.ServicioRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReservaService {

        private final ReservaRepository reservaRepository;
        private final UsuarioRepository usuarioRepository;
        private final SalaRepository salaRepository;
        private final ServicioRepository servicioRepository;

        public ReservaService(
                        ReservaRepository reservaRepository,
                        UsuarioRepository usuarioRepository,
                        SalaRepository salaRepository,
                        ServicioRepository servicioRepository) {
                this.reservaRepository = reservaRepository;
                this.usuarioRepository = usuarioRepository;
                this.salaRepository = salaRepository;
                this.servicioRepository = servicioRepository;
        }

        public Reserva crearReserva(CrearReservaDTO datosReserva) {
                System.out.println(datosReserva);
                // Validamos cliente
                Usuario cliente = usuarioRepository.findById(datosReserva.getIdCliente())
                                .orElseThrow(() -> new IllegalArgumentException("Cliente no enconrado"));

                // Validamos profesional
                Usuario profesional = usuarioRepository.findById(datosReserva.getIdProfesional())
                                .orElseThrow(() -> new IllegalArgumentException("Profesional no encontrado"));

                // Validamos sala
                Sala sala = salaRepository.findById(datosReserva.getIdSala())
                                .orElseThrow(() -> new IllegalArgumentException("Sala no encontrada"));

                // Validar servicio
                Servicio servicio = servicioRepository.findById(datosReserva.getIdServicio())
                                .orElseThrow(() -> new IllegalArgumentException("Servicio no encontrado"));
                // Validamos fecha y hora
                LocalDate fecha = LocalDate.parse(datosReserva.getFecha());
                LocalTime horaInicio = LocalTime.parse(datosReserva.getHoraInicio());
                LocalTime horaFin = LocalTime.parse(datosReserva.getHoraFin());

                // Validamos solapamiento de reservas
                validarSolapamiento(fecha, horaInicio, horaFin, sala);

                // Calculamos el precio total
                Duration duration = Duration.between(horaInicio, horaFin);
                Double horas = duration.toMinutes() / 60.0;
                Double precioTotal = Math.ceil(horas * 2 / 2 * servicio.getPrecioPorHora());

                // Creamos la reserva
                Reserva reserva = new Reserva();
                reserva.setCliente(cliente);
                reserva.setProfesional(profesional);
                reserva.setSala(sala);
                reserva.setServicio(servicio);
                reserva.setFecha(fecha);
                reserva.setHoraInicio(horaInicio);
                reserva.setHoraFin(horaFin);
                reserva.setEstado(Reserva.EstadoReserva.PENDIENTE);
                reserva.setPagada(false);
                reserva.setPrecioTotal(precioTotal);

                return reservaRepository.save(reserva);
        }

        private void validarSolapamiento(LocalDate fecha, LocalTime horaInicio, LocalTime horaFin, Sala sala) {
                boolean solapamiento = reservaRepository.existsByFechaAndSalaAndHoraInicioLessThanAndHoraFinGreaterThan(
                                fecha, sala, horaFin, horaInicio);
                if (solapamiento) {
                        throw new IllegalArgumentException(
                                        "Ya existe una reserva en la sala seleccionada para este horario.");
                }
        }

        public List<Reserva> obtenerTodasReservas() {
                return reservaRepository.findAll();
        }
        public Reserva pagarReserva(Long idReserva) {
                // Buscar la reserva por ID
                Reserva reserva = reservaRepository.findById(idReserva)
                        .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada"));
        
                // Validar si ya está pagada
                if (reserva.getPagada()) {
                    throw new IllegalArgumentException("La reserva ya está pagada");
                }
        
                // Marcar la reserva como pagada
                reserva.setPagada(true);
        
                // Guardar la reserva actualizada
                return reservaRepository.save(reserva);
            }
            public void eliminarReserva(Long idReserva) {
                Reserva reserva = reservaRepository.findById(idReserva)
                        .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada"));
                reservaRepository.delete(reserva);
            }
            public List<Reserva> obtenerProximasCitasDelDia() {
                LocalDate hoy = LocalDate.now();
                LocalTime ahora = LocalTime.now();
        
                return reservaRepository.findByFechaAndHoraInicioAfterOrderByHoraInicio(
                    hoy, ahora
                );
            }
            public List<Reserva> obtenerReservasPendientesDePago() {
                return reservaRepository.findByPagadaFalse();
            }
            
}
