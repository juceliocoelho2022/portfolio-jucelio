package com.jucelio.portfolio.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ResumePdfService {

    private static final float MARGIN = 48f;
    private static final float LINE_HEIGHT = 14f;
    private static final float SECTION_GAP = 10f;

    private final PDFont regular = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
    private final PDFont bold = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);

    public byte[] generateResume() {
        try (PDDocument document = new PDDocument();
             ByteArrayOutputStream output = new ByteArrayOutputStream()) {

            PageWriter writer = new PageWriter(document);
            writer.heading("JUCELIO FARIAS COELHO", 18);
            writer.text("DESENVOLVEDOR JAVA BACKEND | SPRING BOOT | KAFKA | OBSERVABILIDADE", 10, bold);
            writer.text("Sao Paulo - SP | (11) 98120-4164 | juceliocoelho2010@gmail.com", 9, regular);
            writer.text("LinkedIn: linkedin.com/in/jucelio-desenvolvedor-sistema | GitHub: github.com/juceliocoelho2022", 9, regular);

            writer.section("OBJETIVO");
            writer.paragraph("Desenvolvedor Java Backend - Squad de Sustentacao / Meios de Pagamento. Atuacao com desenvolvimento e sustentacao de aplicacoes Back-end, troubleshooting, observabilidade, analise de causa raiz, estabilidade e performance de sistemas distribuidos e fluxos criticos de pagamentos.");

            writer.section("RESUMO PROFISSIONAL");
            writer.paragraph("Profissional de Tecnologia com formacao em Desenvolvimento de Sistemas e pos-graduacao na area de Dados, com foco em Java Back-end. Experiencia pratica em projetos com Java 21, Spring Boot, APIs REST, microsservicos, PostgreSQL, Oracle, Apache Kafka, Docker, Redis, AWS e arquitetura orientada a eventos.");
            writer.paragraph("Desenvolve projetos de portfolio voltados ao setor financeiro, incluindo processamento de Pix, orquestracao de pagamentos e prevencao a fraudes, aplicando idempotencia, retry, Dead Letter Topic/Queue, resiliencia, mensageria e observabilidade.");

            writer.section("COMPETENCIAS TECNICAS");
            writer.bullet("Back-end: Java 21, Spring Boot, Spring Data JPA, Hibernate, APIs REST, Microsservicos, Maven, Spring Security, JWT, Resilience4j");
            writer.bullet("Mensageria / Event-Driven: Apache Kafka, Producer/Consumer, Publisher/Subscriber, topicos, filas, retry, DLT/DLQ, idempotencia e processamento assincrono");
            writer.bullet("Observabilidade: Prometheus, Grafana, Loki, Tempo, Datadog, metricas, logs, traces, dashboards, APM e troubleshooting");
            writer.bullet("Bancos de Dados: PostgreSQL, Oracle Database, PL/SQL, MySQL, SQL Server, SQL, modelagem de dados e fundamentos de MongoDB/NoSQL");
            writer.bullet("Cloud / DevOps: AWS (EC2, VPC, S3, IAM, ECR, ECS), Docker, Docker Compose, Git, GitHub, GitHub Actions, CI/CD e Flyway");
            writer.bullet("Testes: JUnit 5, Mockito, MockMvc, testes unitarios, testes de integracao e JaCoCo");

            writer.section("EXPERIENCIA PROFISSIONAL");
            writer.subheading("Professor Tecnico - Desenvolvimento de Sistemas | Governo do Estado de Sao Paulo");
            writer.text("02/2025 - Atual | Sao Paulo - SP", 9, regular);
            writer.bullet("Ensino tecnico de programacao, desenvolvimento Back-end, logica, banco de dados e desenvolvimento de aplicacoes.");
            writer.bullet("Orientacao de atividades praticas envolvendo Java, APIs, SQL, modelagem de dados, Git, testes e boas praticas.");
            writer.bullet("Apoio na analise e resolucao de problemas tecnicos durante o desenvolvimento e execucao de projetos.");
            writer.bullet("Orientacao de projetos com metodologias ageis, organizacao de tarefas e documentacao tecnica.");

            writer.subheading("Empresa Brasileira de Correios e Telegrafos - ECT");
            writer.text("11 anos", 9, regular);
            writer.paragraph("Atuacao em operacoes, logistica e atendimento, com experiencia em processos, cumprimento de procedimentos, organizacao, resolucao de problemas, trabalho em equipe e responsabilidade operacional.");

            writer.section("PROJETOS TECNICOS RELEVANTES");
            writer.subheading("NexaPay - Event-Driven Payments");
            writer.text("Java 21 | Spring Boot | Kafka | PostgreSQL | Redis | Resilience4j | Docker | Prometheus | Grafana | Loki | Tempo", 9, regular);
            writer.bullet("Plataforma distribuida de pagamentos com fluxo de Pix e arquitetura de microsservicos.");
            writer.bullet("Uso de idempotency key para prevencao de processamento duplicado e Kafka para comunicacao assincrona.");
            writer.bullet("Mecanismos de resiliencia e observabilidade com metricas, logs, traces e dashboards.");

            writer.subheading("SentinelFraud Platform - Plataforma Antifraude");
            writer.text("Java | Spring Boot | Microsservicos | Kafka | Docker", 9, regular);
            writer.bullet("Projeto voltado a eventos de operacoes financeiras, prevencao a fraudes, rastreabilidade e processamento distribuido.");
            writer.bullet("Mensageria entre servicos e estrutura preparada para monitoramento e observabilidade.");

            writer.subheading("PixGuard Orchestrator");
            writer.text("Java 21 | Spring Boot | REST | Microsservicos | Docker", 9, regular);
            writer.bullet("Ecossistema para processamento e controle de operacoes Pix com API Gateway, Pix Orchestrator, Account Ledger, Risk Service, BCB Simulator e Contracts/Events.");
            writer.bullet("Aplicacao de conceitos de orquestracao, integracao entre servicos, risco e movimentacao financeira.");

            writer.subheading("OracleBank Enterprise");
            writer.text("Oracle Database | SQL | PL/SQL | Docker | Performance", 9, regular);
            writer.bullet("Projeto financeiro com procedures, packages, triggers, auditoria, regras de transferencia e validacao de saldo.");
            writer.bullet("Processamento de mais de 50 mil transacoes em laboratorio, analise de planos de execucao, indices e DBMS_XPLAN.");

            writer.section("TROUBLESHOOTING E OBSERVABILIDADE");
            writer.bullet("Investigacao de falhas em APIs e microsservicos por logs, metricas e distributed tracing.");
            writer.bullet("Diagnostico de integracoes entre servicos, Kafka e bancos de dados; analise de queries e performance SQL.");
            writer.bullet("Monitoramento com Prometheus/Grafana, logs com Loki, tracing com Tempo e conceitos de APM com Datadog.");
            writer.bullet("Analise de causa raiz e proposicao de correcoes para reduzir recorrencia de falhas.");

            writer.section("FORMACAO ACADEMICA");
            writer.bullet("Tecnologia em Analise e Desenvolvimento de Sistemas - Anhanguera | Concluido em 2023");
            writer.bullet("Pos-graduacao em Ciencia de Dados e Big Data Analytics | Concluida");
            writer.bullet("Pos-graduacao em Arquitetura e Governanca de Dados | Concluida");

            writer.section("FORMACAO COMPLEMENTAR");
            writer.paragraph("Java / Back-end | Spring Boot e APIs REST | Oracle Database / DBA | Oracle Multitenant 21c | PL/SQL | Big Data e Engenharia de Dados | AWS | Docker | Datadog e Observabilidade | Scrum e Kanban | Git e GitHub");

            writer.section("IDIOMAS");
            writer.paragraph("Portugues: Nativo | Ingles: Em desenvolvimento, com foco em comunicacao e vocabulario tecnico de Tecnologia.");

            writer.close();
            document.save(output);
            return output.toByteArray();

        } catch (IOException e) {
            throw new IllegalStateException("Nao foi possivel gerar o curriculo em PDF.", e);
        }
    }

    private class PageWriter {
        private final PDDocument document;
        private PDPage page;
        private PDPageContentStream stream;
        private float y;

        PageWriter(PDDocument document) throws IOException {
            this.document = document;
            newPage();
        }

        void newPage() throws IOException {
            if (stream != null) {
                stream.close();
            }
            page = new PDPage(PDRectangle.A4);
            document.addPage(page);
            stream = new PDPageContentStream(document, page);
            y = page.getMediaBox().getHeight() - MARGIN;
        }

        void ensure(float needed) throws IOException {
            if (y - needed < MARGIN) {
                newPage();
            }
        }

        void heading(String value, float size) throws IOException {
            ensure(size + 12);
            line(value, size, bold, 0);
            y -= 4;
        }

        void section(String value) throws IOException {
            ensure(28);
            y -= SECTION_GAP;
            line(value, 11, bold, 0);
            y -= 2;
        }

        void subheading(String value) throws IOException {
            ensure(22);
            line(value, 10, bold, 0);
        }

        void paragraph(String value) throws IOException {
            wrapped(value, 9, regular, 0);
            y -= 4;
        }

        void bullet(String value) throws IOException {
            wrapped("- " + value, 9, regular, 10);
        }

        void text(String value, float size, PDFont font) throws IOException {
            wrapped(value, size, font, 0);
        }

        void wrapped(String value, float size, PDFont font, float indent) throws IOException {
            float maxWidth = page.getMediaBox().getWidth() - (2 * MARGIN) - indent;
            for (String part : wrap(value, font, size, maxWidth)) {
                ensure(LINE_HEIGHT);
                line(part, size, font, indent);
            }
        }

        void line(String value, float size, PDFont font, float indent) throws IOException {
            stream.beginText();
            stream.setFont(font, size);
            stream.newLineAtOffset(MARGIN + indent, y);
            stream.showText(value);
            stream.endText();
            y -= LINE_HEIGHT;
        }

        void close() throws IOException {
            if (stream != null) {
                stream.close();
                stream = null;
            }
        }
    }

    private List<String> wrap(String text, PDFont font, float fontSize, float maxWidth) throws IOException {
        List<String> lines = new ArrayList<>();
        String[] words = text.split("\\s+");
        StringBuilder current = new StringBuilder();

        for (String word : words) {
            String candidate = current.isEmpty() ? word : current + " " + word;
            float width = font.getStringWidth(candidate) / 1000f * fontSize;

            if (width > maxWidth && !current.isEmpty()) {
                lines.add(current.toString());
                current = new StringBuilder(word);
            } else {
                current = new StringBuilder(candidate);
            }
        }

        if (!current.isEmpty()) {
            lines.add(current.toString());
        }

        return lines;
    }
}
