package com.clinica.clinic_backend.config;


import org.springframework.context.annotation.Configuration;

@Configuration
public class EmailConfig {

    private String apiKey = "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";

    public String getApiKey() {
        return apiKey;
    }
}

