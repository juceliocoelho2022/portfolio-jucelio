package com.jucelio.portfolio.model;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Projeto técnico exibido no portfólio")
public record Project(
        @Schema(example = "1")
        Long id,

        @Schema(example = "NexaPay")
        String name,

        @Schema(example = "Backend / Microsserviços")
        String category,

        @Schema(example = "Plataforma de pagamentos orientada a eventos.")
        String description,

        @Schema(example = "["Java 21", "Spring Boot", "Kafka", "PostgreSQL"]")
        List<String> technologies,

        @Schema(example = "["Idempotência", "DLT", "Observabilidade"]")
        List<String> highlights,

        @Schema(example = "https://github.com/juceliocoelho2022")
        String githubUrl
) {}
