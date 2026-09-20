package com.jucelio.portfolio.service;

import com.jucelio.portfolio.model.Project;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    public List<Project> getProjects() {
        return List.of(
            new Project(
                1L,
                "NexaPay",
                "Backend / Microsserviços",
                "Plataforma de pagamentos orientada a eventos com foco em resiliência, segurança e observabilidade.",
                List.of("Java 21", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Docker"),
                List.of("Idempotency Key", "DLT", "JWT", "API Gateway", "Prometheus", "Grafana", "Tempo", "Loki"),
                "https://github.com/juceliocoelho2022/nexapay-event-driven-payments"
            ),
            new Project(
                2L,
                "InnovationHub",
                "Backend Corporativo",
                "Sistema de gestão de projetos de PD&I usando arquitetura modular e boas práticas de APIs REST.",
                List.of("Java 21", "Spring Boot", "JPA", "Flyway", "OpenAPI", "PostgreSQL"),
                List.of("ProblemDetail", "Bean Validation", "Versionamento otimista", "Testes automatizados"),
                "https://github.com/juceliocoelho2022/innovationhub"
            ),
            new Project(
                3L,
                "SentinelFraud Platform",
                "Fraude / Eventos",
                "Plataforma de análise de risco e prevenção a fraudes com eventos e transactional outbox.",
                List.of("Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL"),
                List.of("Risk Score", "Transactional Outbox", "Eventos", "Resiliência"),
                "https://github.com/juceliocoelho2022/sentinelfraud-platform"
            ),
            new Project(
                4L,
                "TenantGuard Cloud",
                "SaaS / Multi-Tenant",
                "SaaS multi-tenant com isolamento por tenant e segurança baseada em JWT.",
                List.of("Spring Boot", "PostgreSQL", "RLS", "JWT", "Docker"),
                List.of("Multi-tenancy", "Row Level Security", "JWT", "Docker"),
                "https://github.com/juceliocoelho2022/tenantguard-java"
            ),
            new Project(
                5L,
                "FraudShield AI",
                "IA / Backend",
                "Solução com backend Java e serviço de Machine Learning em Python para análise de fraude.",
                List.of("Spring Boot", "FastAPI", "Python", "PostgreSQL"),
                List.of("CRISP-DM", "REST", "Integração Java/Python", "ML Service"),
                "https://github.com/juceliocoelho2022"
            ),
            new Project(
                6L,
                "RotaCerta",
                "Mobile",
                "Aplicativo Android para apoio a entregas e fluxo de rotas.",
                List.of("Kotlin", "Jetpack Compose", "Android"),
                List.of("Rotas", "QR Code", "UI moderna"),
                "https://github.com/juceliocoelho2022/rotacerta"
            )
        );
    }
}
