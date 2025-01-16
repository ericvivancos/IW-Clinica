-- Tabla Usuarios actualizada
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'recepcionista', 'profesional', 'cliente') NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    token_restablecimiento VARCHAR(255),
    token_expiracion DATETIME
);

-- Tabla Salas
CREATE TABLE salas (
    id_sala INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla Servicios
CREATE TABLE servicios (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_por_hora DECIMAL(10,2) NOT NULL
);

-- Tabla Reservas
CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_profesional INT NOT NULL,
    id_sala INT NOT NULL,
    id_servicio INT NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado ENUM('PENDIENTE', 'CANCELADA', 'REALIZADA') DEFAULT 'PENDIENTE',
    pagada BOOLEAN DEFAULT FALSE,
    precio_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_profesional) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_sala) REFERENCES salas(id_sala) ON DELETE CASCADE,
    FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio) ON DELETE CASCADE
);

-- Inserta un administrador
INSERT INTO usuarios (nombre, email, contrasena, rol, activo)
VALUES ('Administrador', 'admin@clinica.com', '$2a$10$z9J04wxfw8/QbgFOGuaa2O0CvbSAVWLEZb7YZRQU/m7EOw7IdVhHe', 'ADMINISTRADOR', true);
-- Contraseña: admin123 (encriptada con BCrypt)

-- Inserta clientes
INSERT INTO usuarios (nombre, email, contrasena, rol, activo)
VALUES 
('Cliente 1', 'cliente1@correo.com', '$2a$10$NI9sUp0sedoiA3L0HYaXtObnZw.2Ue9d8/bZ4olcTQLvLRqmyhSGi', 'CLIENTE', true),
('Cliente 2', 'cliente2@correo.com', '$2a$10$NI9sUp0sedoiA3L0HYaXtObnZw.2Ue9d8/bZ4olcTQLvLRqmyhSGi', 'CLIENTE', true);

-- Inserta profesionales
INSERT INTO usuarios (nombre, email, contrasena, rol, activo)
VALUES 
('Profesional 1', 'profesional1@correo.com', '$2a$10$NI9sUp0sedoiA3L0HYaXtObnZw.2Ue9d8/bZ4olcTQLvLRqmyhSGi', 'PROFESIONAL', true),
('Profesional 2', 'profesional2@correo.com', '$2a$10$NI9sUp0sedoiA3L0HYaXtObnZw.2Ue9d8/bZ4olcTQLvLRqmyhSGi', 'PROFESIONAL', true);

-- Inserta recepcionistas
INSERT INTO usuarios (nombre, email, contrasena, rol, activo)
VALUES 
('Recepcionista 1', 'recepcionista1@correo.com', '$2a$10$NI9sUp0sedoiA3L0HYaXtObnZw.2Ue9d8/bZ4olcTQLvLRqmyhSGi', 'RECEPCIONISTA', true),
('Recepcionista 2', 'recepcionista2@correo.com', '$2a$10$NI9sUp0sedoiA3L0HYaXtObnZw.2Ue9d8/bZ4olcTQLvLRqmyhSGi', 'RECEPCIONISTA', true);

-- Inserta servicios
INSERT INTO servicios (nombre, descripcion, precio_por_hora)
VALUES 
('Consulta Médica', 'Consulta general con médico especialista.', 50.00),
('Revisión Dental', 'Procedimientos dentales básicos.', 30.00),
('Fisioterapia', 'Sesión de fisioterapia.', 40.00);

-- Inserta salas
INSERT INTO salas (nombre, descripcion)
VALUES 
('Sala 1', 'Sala para consultas generales.'),
('Sala 2', 'Sala para procedimientos dentales.'),
('Sala 3', 'Sala para fisioterapia.');


