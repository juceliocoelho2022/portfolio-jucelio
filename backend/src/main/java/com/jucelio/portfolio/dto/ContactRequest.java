package com.jucelio.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank(message = "Nome é obrigatório")
        String name,

        @NotBlank(message = "E-mail é obrigatório")
        @Email(message = "E-mail inválido")
        String email,

        @NotBlank(message = "Mensagem é obrigatória")
        @Size(min = 10, max = 2000, message = "A mensagem deve ter entre 10 e 2000 caracteres")
        String message
) {}
