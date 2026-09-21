package com.jucelio.portfolio.service;

import com.jucelio.portfolio.dto.ContactRequest;
import com.jucelio.portfolio.exception.ContactServiceUnavailableException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.List;
import java.util.Map;

@Service
public class ContactMailService {

    private final RestClient restClient;
    private final String apiKey;
    private final String toEmail;
    private final String fromEmail;

    public ContactMailService(
            RestClient.Builder restClientBuilder,
            @Value("${resend.api-key:}") String apiKey,
            @Value("${portfolio.contact.to:}") String toEmail,
            @Value("${portfolio.contact.from:Portfolio <onboarding@resend.dev>}") String fromEmail
    ) {
        this.restClient = restClientBuilder
                .baseUrl("https://api.resend.com")
                .build();
        this.apiKey = apiKey;
        this.toEmail = toEmail;
        this.fromEmail = fromEmail;
    }

    public void send(ContactRequest request) {
        if (!StringUtils.hasText(apiKey)
                || !StringUtils.hasText(toEmail)
                || !StringUtils.hasText(fromEmail)) {
            throw new ContactServiceUnavailableException(
                    "Configuração do Resend incompleta no servidor."
            );
        }

        Map<String, Object> payload = Map.of(
                "from", fromEmail,
                "to", List.of(toEmail),
                "reply_to", request.email(),
                "subject", "Portfolio - nova mensagem de " + sanitize(request.name()),
                "text", buildMessage(request)
        );

        try {
            restClient.post()
                    .uri("/emails")
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Bearer " + apiKey)
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientException ex) {
            throw new ContactServiceUnavailableException(
                    "Falha ao enviar mensagem pela API do Resend.",
                    ex
            );
        }
    }

    private String buildMessage(ContactRequest request) {
        return "Nova mensagem recebida pelo portfolio.\n\n"
                + "Nome: " + sanitize(request.name()) + "\n"
                + "E-mail: " + sanitize(request.email()) + "\n\n"
                + "Mensagem:\n" + request.message().trim();
    }

    private String sanitize(String value) {
        return value == null
                ? ""
                : value.replace("\r", " ").replace("\n", " ").trim();
    }
}
