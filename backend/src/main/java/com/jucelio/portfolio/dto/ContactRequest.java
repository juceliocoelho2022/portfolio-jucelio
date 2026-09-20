package com.jucelio.portfolio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dados enviados pelo formulário de contato")
public record ContactRequest(
        @Schema(description = "Nome do visitante", example = "Maria Silva")
        @NotBlank(message = "Nome é obrigatório")
        String name,

        @Schema(description = "E-mail válido para retorno", example = "maria.silva@example.com")
        @NotBlank(message = "E-mail é obrigatório")
        @Email(message = "E-mail inválido")
        String email,

        @Schema(
                description = "Mensagem enviada pelo visitante",
                example = "Olá, gostaria de conversar sobre uma oportunidade Java Backend.",
                minLength = 10,
                maxLength = 2000
        )
        @NotBlank(message = "Mensagem é obrigatória")
        @Size(min = 10, max = 2000, message = "A mensagem deve ter entre 10 e 2000 caracteres")
        String message
) {}
