package com.jucelio.portfolio.controller;

import com.jucelio.portfolio.dto.ContactRequest;
import com.jucelio.portfolio.model.Project;
import com.jucelio.portfolio.service.ContactMailService;
import com.jucelio.portfolio.service.PortfolioService;
import com.jucelio.portfolio.service.ResumePdfService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Tag(name = "Portfolio", description = "Endpoints públicos do portfólio")
public class PortfolioController {

    private static final Logger log = LoggerFactory.getLogger(PortfolioController.class);

    private final PortfolioService portfolioService;
    private final ResumePdfService resumePdfService;
    private final ContactMailService contactMailService;

    public PortfolioController(
            PortfolioService portfolioService,
            ResumePdfService resumePdfService,
            ContactMailService contactMailService
    ) {
        this.portfolioService = portfolioService;
        this.resumePdfService = resumePdfService;
        this.contactMailService = contactMailService;
    }

    @Operation(summary = "Health check", description = "Retorna o status atual da API.")
    @ApiResponse(
            responseCode = "200",
            description = "API disponível",
            content = @Content(
                    mediaType = "application/json",
                    examples = @ExampleObject(value = """
                            {
                              "status": "UP",
                              "application": "portfolio-api",
                              "timestamp": "2026-09-20T18:45:00-03:00"
                            }
                            """)
            )
    )
    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "application", "portfolio-api",
                "timestamp", OffsetDateTime.now()
        );
    }

    @Operation(summary = "Listar projetos", description = "Retorna os projetos profissionais persistidos no banco de dados.")
    @ApiResponse(
            responseCode = "200",
            description = "Projetos retornados com sucesso",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Project.class),
                    examples = @ExampleObject(value = """
                            [
                              {
                                "id": 1,
                                "name": "NexaPay",
                                "category": "Backend / Microsserviços",
                                "description": "Plataforma de pagamentos orientada a eventos.",
                                "technologies": ["Java 21", "Spring Boot", "Kafka", "PostgreSQL"],
                                "highlights": ["Idempotência", "DLT", "Observabilidade"],
                                "githubUrl": "https://github.com/juceliocoelho2022"
                              }
                            ]
                            """)
            )
    )
    @GetMapping("/projects")
    public List<Project> projects() {
        return portfolioService.getProjects();
    }

    @Operation(summary = "Baixar currículo", description = "Gera e retorna o currículo profissional em PDF.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Currículo PDF gerado com sucesso",
                    content = @Content(mediaType = "application/pdf")),
            @ApiResponse(responseCode = "500", description = "Falha ao gerar o currículo")
    })
    @GetMapping(value = "/resume", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> resume() {
        byte[] pdf = resumePdfService.generateResume();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Curriculo_Jucelio_Coelho_Desenvolvedor_Java.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @Operation(summary = "Enviar mensagem", description = "Valida os dados recebidos e envia uma mensagem pelo formulário de contato.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Mensagem enviada com sucesso",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "message": "Mensagem enviada com sucesso. Obrigado pelo contato!",
                                      "name": "Maria Silva"
                                    }
                                    """)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados inválidos",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "status": 400,
                                      "error": "Bad Request"
                                    }
                                    """)
                    )
            ),
            @ApiResponse(
                    responseCode = "503",
                    description = "Serviço de e-mail indisponível",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "message": "Não foi possível enviar o e-mail agora. Verifique a configuração do serviço de e-mail."
                                    }
                                    """)
                    )
            )
    })
    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> contact(
            @Valid
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "Dados da mensagem de contato",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ContactRequest.class),
                            examples = @ExampleObject(value = """
                                    {
                                      "name": "Maria Silva",
                                      "email": "maria.silva@example.com",
                                      "message": "Olá, gostaria de conversar sobre uma oportunidade Java Backend."
                                    }
                                    """)
                    )
            )
            @RequestBody ContactRequest request) {
        try {
            contactMailService.send(request);

            return ResponseEntity.ok(Map.of(
                    "message", "Mensagem enviada com sucesso. Obrigado pelo contato!",
                    "name", request.name()
            ));
        } catch (MailException | IllegalStateException ex) {
            log.error("Falha ao enviar mensagem do formulario de contato", ex);

            return ResponseEntity.status(503).body(Map.of(
                    "message", "Não foi possível enviar o e-mail agora. Verifique a configuração do serviço de e-mail."
            ));
        }
    }
}
