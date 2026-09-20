package com.jucelio.portfolio.controller;

import com.jucelio.portfolio.dto.ContactRequest;
import com.jucelio.portfolio.model.Project;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Compatibility layer for clients still using the original /api routes.
 *
 * @deprecated Use /api/v1 instead.
 */
@Deprecated(since = "1.0", forRemoval = false)
@Hidden
@RestController
@RequestMapping("/api")
public class LegacyPortfolioController {

    private final PortfolioController portfolioController;

    public LegacyPortfolioController(PortfolioController portfolioController) {
        this.portfolioController = portfolioController;
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return portfolioController.health();
    }

    @GetMapping("/projects")
    public List<Project> projects() {
        return portfolioController.projects();
    }

    @GetMapping("/resume")
    public ResponseEntity<byte[]> resume() {
        return portfolioController.resume();
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> contact(@Valid @RequestBody ContactRequest request) {
        return portfolioController.contact(request);
    }
}
