# Usa una imagen base de Maven con Java 17
FROM maven:3.9.5-eclipse-temurin-17

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de Maven primero (para aprovechar la caché)
COPY pom.xml .
COPY src ./src

# Exponer el puerto de la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["mvn", "spring-boot:run"]
