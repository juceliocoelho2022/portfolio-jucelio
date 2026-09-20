package com.jucelio.portfolio.service;

import com.jucelio.portfolio.dto.ContactRequest;
import com.jucelio.portfolio.exception.ContactServiceUnavailableException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class ContactMailService {

    private final JavaMailSender mailSender;
    private final String toEmail;
    private final String fromEmail;

    public ContactMailService(
            JavaMailSender mailSender,
            @Value("${portfolio.contact.to:}") String toEmail,
            @Value("${portfolio.contact.from:}") String fromEmail
    ) {
        this.mailSender = mailSender;
        this.toEmail = toEmail;
        this.fromEmail = fromEmail;
    }

    public void send(ContactRequest request) {
        if (!StringUtils.hasText(toEmail) || !StringUtils.hasText(fromEmail)) {
            throw new ContactServiceUnavailableException("Configuração de e-mail incompleta no servidor.");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom(fromEmail);
        message.setReplyTo(request.email());
        message.setSubject("Portfolio - nova mensagem de " + sanitize(request.name()));
        message.setText(
                "Nova mensagem recebida pelo portfolio.\n\n" +
                "Nome: " + sanitize(request.name()) + "\n" +
                "E-mail: " + sanitize(request.email()) + "\n\n" +
                "Mensagem:\n" + request.message().trim()
        );

        mailSender.send(message);
    }

    private String sanitize(String value) {
        return value == null ? "" : value.replace("\\r", " ").replace("\\n", " ").trim();
    }
}
