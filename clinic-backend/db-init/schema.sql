-- Tabla Usuarios
CREATE TABLE usuarios (
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
contrasena VARCHAR(255) NOT NULL,
rol ENUM('administrador', 'recepcionista', 'profesional', 'cliente') 
NOT NULL,
activo BOOLEAN DEFAULT TRUE
);