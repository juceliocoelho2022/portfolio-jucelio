CREATE TABLE projects (
    id BIGINT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    category VARCHAR(120) NOT NULL,
    description VARCHAR(2000) NOT NULL,
    github_url VARCHAR(500) NOT NULL
);

CREATE TABLE project_technologies (
    project_id BIGINT NOT NULL,
    position INTEGER NOT NULL,
    technology VARCHAR(120) NOT NULL,
    PRIMARY KEY (project_id, position),
    CONSTRAINT fk_project_technologies_project
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE project_highlights (
    project_id BIGINT NOT NULL,
    position INTEGER NOT NULL,
    highlight VARCHAR(180) NOT NULL,
    PRIMARY KEY (project_id, position),
    CONSTRAINT fk_project_highlights_project
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

INSERT INTO projects (id, name, category, description, github_url) VALUES
(1, 'NexaPay', 'Backend / Microsserviços',
 'Plataforma de pagamentos orientada a eventos com foco em resiliência, segurança e observabilidade.',
 'https://github.com/juceliocoelho2022/nexapay-event-driven-payments'),
(2, 'InnovationHub', 'Backend Corporativo',
 'Sistema de gestão de projetos de PD&I usando arquitetura modular e boas práticas de APIs REST.',
 'https://github.com/juceliocoelho2022/innovationhub'),
(3, 'SentinelFraud Platform', 'Fraude / Eventos',
 'Plataforma de análise de risco e prevenção a fraudes com eventos e transactional outbox.',
 'https://github.com/juceliocoelho2022/sentinelfraud-platform'),
(4, 'TenantGuard Cloud', 'SaaS / Multi-Tenant',
 'SaaS multi-tenant com isolamento por tenant e segurança baseada em JWT.',
 'https://github.com/juceliocoelho2022/tenantguard-java'),
(5, 'FraudShield AI', 'IA / Backend',
 'Solução com backend Java e serviço de Machine Learning em Python para análise de fraude.',
 'https://github.com/juceliocoelho2022'),
(6, 'RotaCerta', 'Mobile',
 'Aplicativo Android para apoio a entregas e fluxo de rotas.',
 'https://github.com/juceliocoelho2022/rotacerta');

INSERT INTO project_technologies (project_id, position, technology) VALUES
(1,0,'Java 21'),(1,1,'Spring Boot'),(1,2,'Kafka'),(1,3,'PostgreSQL'),(1,4,'Redis'),(1,5,'Docker'),
(2,0,'Java 21'),(2,1,'Spring Boot'),(2,2,'JPA'),(2,3,'Flyway'),(2,4,'OpenAPI'),(2,5,'PostgreSQL'),
(3,0,'Java'),(3,1,'Spring Boot'),(3,2,'Kafka'),(3,3,'Redis'),(3,4,'PostgreSQL'),
(4,0,'Spring Boot'),(4,1,'PostgreSQL'),(4,2,'RLS'),(4,3,'JWT'),(4,4,'Docker'),
(5,0,'Spring Boot'),(5,1,'FastAPI'),(5,2,'Python'),(5,3,'PostgreSQL'),
(6,0,'Kotlin'),(6,1,'Jetpack Compose'),(6,2,'Android');

INSERT INTO project_highlights (project_id, position, highlight) VALUES
(1,0,'Idempotency Key'),(1,1,'DLT'),(1,2,'JWT'),(1,3,'API Gateway'),(1,4,'Prometheus'),(1,5,'Grafana'),(1,6,'Tempo'),(1,7,'Loki'),
(2,0,'ProblemDetail'),(2,1,'Bean Validation'),(2,2,'Versionamento otimista'),(2,3,'Testes automatizados'),
(3,0,'Risk Score'),(3,1,'Transactional Outbox'),(3,2,'Eventos'),(3,3,'Resiliência'),
(4,0,'Multi-tenancy'),(4,1,'Row Level Security'),(4,2,'JWT'),(4,3,'Docker'),
(5,0,'CRISP-DM'),(5,1,'REST'),(5,2,'Integração Java/Python'),(5,3,'ML Service'),
(6,0,'Rotas'),(6,1,'QR Code'),(6,2,'UI moderna');
