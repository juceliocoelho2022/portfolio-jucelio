# Jucelio Coelho — Portfólio Full Stack

Portfólio profissional desenvolvido com **React + Java 21 + Spring Boot**, com foco em demonstrar competências em **backend, APIs REST, microsserviços, mensageria, dados, testes, observabilidade e cloud**.

> Projeto publicado com frontend no Vercel e backend no Render.

## Destaques

- Java 21 + Spring Boot 3.5.5
- React 19 + Vite
- API REST integrada ao frontend
- Projetos carregados dinamicamente pelo backend
- Formulário de contato com envio real de e-mail via SMTP
- Download de currículo gerado pelo backend
- Bean Validation
- CORS configurado para frontend Vercel
- Layout responsivo com menu hambúrguer
- Deploy automatizado a partir da branch `main`

## Stack

### Backend

- Java 21
- Spring Boot 3.5.5
- Spring Web
- Bean Validation
- Spring Mail
- Apache PDFBox
- Maven
- API REST

### Frontend

- React 19
- Vite
- Lucide React
- CSS responsivo
- Fetch API

### Infraestrutura

- Git / GitHub
- Render
- Vercel
- Docker
- Variáveis de ambiente

## Arquitetura

```text
Usuário
  |
  v
React + Vite
Vercel
  |
  | HTTPS / JSON
  v
Spring Boot REST API
Render
  |
  +-- PortfolioController
  |
  +-- PortfolioService
  |     |
  |     +-- Projetos do portfólio
  |
  +-- ContactMailService
  |     |
  |     +-- Gmail SMTP
  |
  +-- ResumePdfService
        |
        +-- PDFBox
```

### Arquitetura NexaPay

O portfólio também apresenta uma visão visual da arquitetura do NexaPay:

```text
Cliente / Frontend
        |
        v
    API Gateway
        |
        v
  Payment Service
        |
        v
      Kafka
     /     \
    v       v
PostgreSQL Redis
        |
        v
Prometheus / Grafana / Loki / Tempo
```

A seção destaca princípios como **event-driven**, **idempotência**, **resiliência**, **retry/DLT** e **observabilidade distribuída**.

## Funcionalidades

### Projetos

O frontend consulta a API Java e renderiza os projetos profissionais dinamicamente.

Projetos atualmente destacados:

- NexaPay — Event-Driven Payments
- InnovationHub
- SentinelFraud Platform
- TenantGuard Cloud
- FraudShield AI
- RotaCerta

Os projetos possuem links para seus respectivos repositórios GitHub quando disponíveis.

### Formulário de contato

O visitante pode enviar uma mensagem diretamente pelo portfólio.

Fluxo:

```text
Formulário React
      |
      v
POST /api/contact
      |
      v
Bean Validation
      |
      v
ContactMailService
      |
      v
Gmail SMTP
      |
      v
E-mail do proprietário do portfólio
```

O backend utiliza `Reply-To` com o e-mail informado pelo visitante para facilitar a resposta.

### Download de currículo

O portfólio disponibiliza:

```http
GET /api/resume
```

O currículo é gerado dinamicamente pelo backend em formato PDF usando Apache PDFBox.

## Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/health` | Health check da aplicação |
| GET | `/api/projects` | Lista os projetos |
| GET | `/api/resume` | Gera e baixa o currículo em PDF |
| POST | `/api/contact` | Valida e envia mensagem de contato |

## Executando localmente

### Backend

Entre na pasta:

```bash
cd backend
```

Execute:

```bash
mvn spring-boot:run
```

O backend ficará disponível em:

```text
http://localhost:8080
```

Teste:

```text
http://localhost:8080/api/health
```

### Frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

## Variáveis de ambiente

### Frontend — Vercel

```env
VITE_API_URL=https://portfolio-jucelio-api.onrender.com/api
```

### Backend — Render

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu-email@gmail.com
MAIL_PASSWORD=sua-senha-de-app
CONTACT_TO_EMAIL=seu-email@gmail.com
CONTACT_FROM_EMAIL=seu-email@gmail.com
```

> Nunca versione senhas, tokens ou credenciais reais no GitHub. Use sempre os Secrets / Environment Variables da plataforma.

## Segurança do formulário

O backend já aplica:

- validação de nome obrigatório;
- validação de e-mail;
- mensagem obrigatória;
- tamanho da mensagem entre 10 e 2000 caracteres;
- credenciais SMTP fora do código-fonte;
- configuração CORS;
- tratamento de falha no envio de e-mail.

## Estrutura

```text
portfolio-jucelio/
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/jucelio/portfolio/
│       │   ├── config/
│       │   │   └── CorsConfig.java
│       │   ├── controller/
│       │   │   └── PortfolioController.java
│       │   ├── dto/
│       │   │   └── ContactRequest.java
│       │   ├── model/
│       │   │   └── Project.java
│       │   └── service/
│       │       ├── ContactMailService.java
│       │       ├── PortfolioService.java
│       │       └── ResumePdfService.java
│       └── resources/
│           └── application.properties
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
│
└── README.md
```

## Deploy

### Backend

Render:

```text
https://portfolio-jucelio-api.onrender.com
```

### Frontend

Vercel:

```text
https://portfolio-jucelio-o7jm.vercel.app
```

## Perfil profissional

**Jucelio Farias Coelho**

Desenvolvedor com foco em:

- Java Backend
- Spring Boot
- APIs REST
- Microsserviços
- Kafka
- PostgreSQL
- Redis
- Docker
- Testes automatizados
- Observabilidade
- Engenharia de Dados
- AWS / Azure

GitHub: https://github.com/juceliocoelho2022

LinkedIn: https://www.linkedin.com/in/jucelio-desenvolvedor-sistema

## Próximas evoluções

- Persistência dos projetos em PostgreSQL
- Spring Data JPA + Flyway
- Painel administrativo
- CRUD de projetos
- Proteção anti-spam / rate limiting no formulário
- Testes automatizados do fluxo de contato
- GitHub Actions para CI
- Domínio próprio
- Métricas e observabilidade do backend

---

Desenvolvido por **Jucelio Farias Coelho** com **React, Java 21 e Spring Boot**.
