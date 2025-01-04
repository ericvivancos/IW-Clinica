package com.clinica.clinic_backend.service;

import com.clinica.clinic_backend.config.EmailConfig;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final String apiKey;

    public EmailService(EmailConfig emailConfig) {
        this.apiKey = emailConfig.getApiKey();
    }

    public void enviarCorreo(String destinatario, String asunto, String contenido) throws Exception {
        Email from = new Email("eric_vy@hotmail.com"); // Cambia por tu email registrado en SendGrid
        Email to = new Email(destinatario);
        Content content = new Content("text/html", contenido);
        Mail mail = new Mail(from, asunto, to, content);

        SendGrid sg = new SendGrid(apiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sg.api(request);
        } catch (Exception e) {
            throw new Exception("Error al enviar correo: " + e.getMessage());
        }
    }
}
