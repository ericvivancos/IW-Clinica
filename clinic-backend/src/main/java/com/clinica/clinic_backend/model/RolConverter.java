package com.clinica.clinic_backend.model;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class RolConverter implements AttributeConverter<Usuario.Rol, String> {

    @Override
    public String convertToDatabaseColumn(Usuario.Rol rol) {
        // Almacenar en la base de datos en minúsculas
        return rol == null ? null : rol.name().toLowerCase();
    }

    @Override
    public Usuario.Rol convertToEntityAttribute(String dbData) {
        // Convertir desde la base de datos a enum en mayúsculas
        return dbData == null ? null : Usuario.Rol.valueOf(dbData.toUpperCase());
    }
}
