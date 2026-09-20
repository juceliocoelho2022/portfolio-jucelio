package com.jucelio.portfolio.controller;

import com.jucelio.portfolio.dto.ContactRequest;
import com.jucelio.portfolio.model.Project;
import com.jucelio.portfolio.service.PortfolioService;
import com.jucelio.portfolio.service.ResumePdfService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(originPatterns = {"http://localhost:5173", "https://*.vercel.app"})
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final ResumePdfService resumePdfService;

    public PortfolioController(PortfolioService portfolioService, ResumePdfService resumePdfService) {
        this.portfolioService = portfolioService;
        this.resumePdfService = resumePdfService;
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "application", "portfolio-api",
                "timestamp", OffsetDateTime.now()
        );
    }

    @GetMapping("/projects")
    public List<Project> projects() {
        return portfolioService.getProjects();
    }

    @GetMapping(value = "/resume", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> resume() {
        byte[] pdf = resumePdfService.generateResume();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Curriculo_Jucelio_Coelho_Desenvolvedor_Java.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> contact(@Valid @RequestBody ContactRequest request) {
        return ResponseEntity.ok(Map.of(
                "message", "Mensagem recebida com sucesso.",
                "name", request.name()
        ));
    }
}
