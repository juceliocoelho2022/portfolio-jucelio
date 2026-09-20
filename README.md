<div align="center">

# Jucelio Coelho — Portfolio Full Stack

### Java Backend • Spring Boot • APIs REST • Kafka • PostgreSQL • React

Portfólio profissional com foco em **engenharia backend, arquitetura, dados, qualidade de software e deploy em produção**.

[![CI](https://github.com/juceliocoelho2022/portfolio-jucelio/actions/workflows/ci.yml/badge.svg)](https://github.com/juceliocoelho2022/portfolio-jucelio/actions)
![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.5-6DB33F?logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Production-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)

[**Ver portfólio**](https://portfolio-jucelio-o7jm.vercel.app) •
[**API**](https://portfolio-jucelio-api.onrender.com/api/health) •
[**LinkedIn**](https://www.linkedin.com/in/jucelio-desenvolvedor-sistema) •
[**GitHub**](https://github.com/juceliocoelho2022)

</div>

---

## Visão geral

Este projeto foi construído para demonstrar, em uma aplicação real publicada, competências de **Desenvolvedor Java Backend**.

O frontend é desenvolvido em React e consome uma API Spring Boot responsável pelos projetos, currículo e contato. Os projetos são persistidos em PostgreSQL com JPA/Hibernate e versionamento de banco com Flyway.

### Em produção

| Camada | Tecnologia | Hospedagem |
|---|---|---|
| Frontend | React 19 + Vite | Vercel |
| Backend | Java 21 + Spring Boot 3.5.5 | Render |
| Banco | PostgreSQL | Render |
| CI | GitHub Actions | GitHub |
| Container | Docker | Render |

---

## Principais recursos

- API REST com Java 21 e Spring Boot
- Persistência com Spring Data JPA + Hibernate
- PostgreSQL em produção
- Migrations com Flyway
- Frontend React integrado à API
- Currículo PDF gerado pelo backend
- Formulário de contato com envio por SMTP
- Bean Validation
- CORS configurado
- Docker
- GitHub Actions
- Testes automatizados com JUnit 5 e MockMvc
- JaCoCo para cobertura de testes
- Layout responsivo
- Deploy contínuo

---

## Stack técnica

### Backend

```text
Java 21
Spring Boot 3.5.5
Spring Web
Spring Data JPA
Hibernate
Flyway
PostgreSQL
Bean Validation
Spring Mail
Apache PDFBox
Maven
JUnit 5
Mockito
MockMvc
JaCoCo
```

### Frontend

```text
React 19
Vite
Lucide React
Fetch API
CSS responsivo
```

### Infraestrutura e DevOps

```text
Git
GitHub
GitHub Actions
Docker
Render
Vercel
PostgreSQL
Variáveis de ambiente
```

---

## Arquitetura do portfólio

```text
                    ┌──────────────────────┐
                    │       Usuário        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React + Vite       │
                    │      Vercel          │
                    └──────────┬───────────┘
                               │ HTTPS / JSON
                               ▼
                    ┌──────────────────────┐
                    │ Spring Boot REST API │
                    │       Render         │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
      PortfolioService   ContactMailService  ResumePdfService
              │                │                │
              ▼                ▼                ▼
        PostgreSQL         Gmail SMTP          PDFBox
        JPA/Flyway
```

---

## Projetos em destaque

| Projeto | Foco | Tecnologias |
|---|---|---|
| **NexaPay** | Pagamentos event-driven | Java 21, Spring Boot, Kafka, PostgreSQL, Redis |
| **InnovationHub** | Gestão corporativa de PD&I | Java 21, Spring Boot, JPA, Flyway, OpenAPI |
| **SentinelFraud Platform** | Prevenção a fraudes | Spring Boot, Kafka, Redis, PostgreSQL |
| **TenantGuard Cloud** | SaaS multi-tenant | Spring Boot, PostgreSQL, RLS, JWT |
| **FraudShield AI** | IA aplicada a fraude | Spring Boot, FastAPI, Python, PostgreSQL |
| **RotaCerta** | Aplicativo mobile | Kotlin, Jetpack Compose, Android |

Os cards no portfólio possuem links diretos para os repositórios correspondentes.

---

## Arquitetura em destaque — NexaPay

```text
Cliente / Frontend
        │
        ▼
   API Gateway
        │
        ▼
 Payment Service
        │
        ▼
  Apache Kafka
     ┌──┴──┐
     ▼     ▼
PostgreSQL Redis
     │
     ▼
Prometheus • Grafana • Loki • Tempo
```

### Conceitos aplicados

`Event-Driven` • `Idempotência` • `Retry` • `DLT` • `Resiliência` • `Logs` • `Métricas` • `Tracing`

---

## Persistência

Os projetos não ficam hardcoded no serviço Java.

A API utiliza:

```text
ProjectEntity
     │
     ▼
ProjectRepository
     │
     ▼
Spring Data JPA
     │
     ▼
Hibernate
     │
     ▼
PostgreSQL
```

O Flyway cria e versiona:

```text
projects
project_technologies
project_highlights
```

Para desenvolvimento e testes, o projeto também possui suporte a H2 em memória.

---

## Qualidade e testes

A API possui testes automatizados com **JUnit 5, Mockito e MockMvc**.

Cenários cobertos incluem:

- health check;
- consulta de projetos;
- download do currículo;
- envio de contato;
- validação de payload inválido;
- tratamento de indisponibilidade do serviço de e-mail;
- inicialização do contexto com banco de testes;
- execução das migrations Flyway.

O JaCoCo é executado durante:

```bash
mvn clean verify
```

---

## CI com GitHub Actions

A pipeline é executada em cada `push` e `pull request` para `main`.

```text
Push / Pull Request
        │
        ├── Backend
        │    ├── Java 21
        │    ├── Maven Verify
        │    ├── JUnit / MockMvc
        │    ├── JaCoCo
        │    └── Docker Build
        │
        └── Frontend
             ├── Node.js
             ├── npm ci
             └── Vite Build
```

Workflow:

```text
.github/workflows/ci.yml
```

---

## API

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/projects` | Lista projetos |
| `GET` | `/api/resume` | Gera currículo em PDF |
| `POST` | `/api/contact` | Envia mensagem de contato |

### Health check

```http
GET https://portfolio-jucelio-api.onrender.com/api/health
```

---

## Executando localmente

### Backend

```bash
cd backend
mvn spring-boot:run
```

API:

```text
http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação:

```text
http://localhost:5173
```

---

## Variáveis de ambiente

### Frontend

```env
VITE_API_URL=https://portfolio-jucelio-api.onrender.com/api
```

### Backend

```env
DATABASE_URL=jdbc:postgresql://host:5432/database
DATABASE_USERNAME=usuario
DATABASE_PASSWORD=senha
DATABASE_DRIVER=org.postgresql.Driver

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu-email@gmail.com
MAIL_PASSWORD=sua-senha-de-app
CONTACT_TO_EMAIL=seu-email@gmail.com
CONTACT_FROM_EMAIL=seu-email@gmail.com
```

> Credenciais reais nunca devem ser versionadas. Em produção, são configuradas como Environment Variables.

---

## Estrutura principal

```text
portfolio-jucelio/
│
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/jucelio/portfolio/
│       │   │   ├── config/
│       │   │   ├── controller/
│       │   │   ├── dto/
│       │   │   ├── model/
│       │   │   ├── persistence/
│       │   │   └── service/
│       │   └── resources/
│       │       └── db/migration/
│       └── test/
│
├── frontend/
│   ├── public/projects/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
│
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Próximas evoluções

- Painel administrativo
- CRUD de projetos
- Rate limiting no formulário
- Observabilidade do backend
- Domínio próprio
- Testes de integração com PostgreSQL via Testcontainers

---

<div align="center">

### Jucelio Farias Coelho

**Java Backend Developer • Spring Boot • APIs • Kafka • PostgreSQL**

[LinkedIn](https://www.linkedin.com/in/jucelio-desenvolvedor-sistema) •
[GitHub](https://github.com/juceliocoelho2022) •
[Portfólio](https://portfolio-jucelio-o7jm.vercel.app)

Desenvolvido com **Java 21, Spring Boot e React**.

</div>
