package com.jucelio.portfolio.controller;

import com.jucelio.portfolio.model.Project;
import com.jucelio.portfolio.service.ContactMailService;
import com.jucelio.portfolio.service.PortfolioService;
import com.jucelio.portfolio.service.ResumePdfService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.mail.MailSendException;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PortfolioController.class)
class PortfolioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PortfolioService portfolioService;

    @MockitoBean
    private ResumePdfService resumePdfService;

    @MockitoBean
    private ContactMailService contactMailService;

    @Test
    void shouldReturnHealthStatus() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.application").value("portfolio-api"))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    void shouldReturnProjectsFromService() throws Exception {
        Project project = new Project(
                1L,
                "NexaPay",
                "Backend / Microsserviços",
                "Plataforma de pagamentos orientada a eventos.",
                List.of("Java 21", "Spring Boot", "Kafka"),
                List.of("Idempotency Key", "DLT"),
                "https://github.com/juceliocoelho2022/nexapay-event-driven-payments"
        );

        when(portfolioService.getProjects()).thenReturn(List.of(project));

        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("NexaPay"))
                .andExpect(jsonPath("$[0].technologies[0]").value("Java 21"))
                .andExpect(jsonPath("$[0].highlights[0]").value("Idempotency Key"));
    }

    @Test
    void shouldDownloadResumeAsPdf() throws Exception {
        byte[] pdf = "%PDF-1.7 test".getBytes();
        when(resumePdfService.generateResume()).thenReturn(pdf);

        mockMvc.perform(get("/api/resume"))
                .andExpect(status().isOk())
                .andExpect(header().string(
                        "Content-Disposition",
                        "attachment; filename=Curriculo_Jucelio_Coelho_Desenvolvedor_Java.pdf"
                ))
                .andExpect(content().contentType("application/pdf"))
                .andExpect(content().bytes(pdf));
    }

    @Test
    void shouldSendValidContactMessage() throws Exception {
        String body = """
                {
                  "name": "Recrutador",
                  "email": "recrutador@example.com",
                  "message": "Gostaria de conversar sobre uma oportunidade Java Backend."
                }
                """;

        mockMvc.perform(post("/api/contact")
                        .contentType("application/json")
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message")
                        .value("Mensagem enviada com sucesso. Obrigado pelo contato!"))
                .andExpect(jsonPath("$.name").value("Recrutador"));

        verify(contactMailService).send(any());
    }

    @Test
    void shouldRejectInvalidContactPayload() throws Exception {
        String body = """
                {
                  "name": "",
                  "email": "email-invalido",
                  "message": "curta"
                }
                """;

        mockMvc.perform(post("/api/contact")
                        .contentType("application/json")
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturnServiceUnavailableWhenEmailFails() throws Exception {
        doThrow(new MailSendException("SMTP indisponível"))
                .when(contactMailService)
                .send(any());

        String body = """
                {
                  "name": "Recrutador",
                  "email": "recrutador@example.com",
                  "message": "Mensagem válida para testar uma falha de SMTP."
                }
                """;

        mockMvc.perform(post("/api/contact")
                        .contentType("application/json")
                        .content(body))
                .andExpect(status().isServiceUnavailable())
                .andExpect(jsonPath("$.message")
                        .value("Não foi possível enviar o e-mail agora. Verifique a configuração do serviço de e-mail."));
    }
}
