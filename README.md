# Portfólio Full Stack — React + Java

Projeto profissional de portfólio usando:

## Frontend
- React 19
- Vite
- Lucide React
- CSS responsivo

## Backend
- Java 21
- Spring Boot 3.5.5
- API REST
- Bean Validation
- CORS

## Estrutura

portfolio-jucelio-fullstack/
├── backend/
│   ├── pom.xml
│   └── src/
└── frontend/
    ├── package.json
    └── src/

## Como rodar o Backend

Abra a pasta `backend` no IntelliJ.

No terminal:

```bash
mvn spring-boot:run
```

API:
- GET http://localhost:8080/api/health
- GET http://localhost:8080/api/projects
- POST http://localhost:8080/api/contact

## Como rodar o Frontend

Abra a pasta `frontend` no VS Code ou terminal:

```bash
npm install
npm run dev
```

Acesse:

http://localhost:5173

## Arquitetura

React
  |
  | HTTP/JSON
  v
Spring Boot REST API
  |
  +-- PortfolioController
  +-- PortfolioService
  +-- DTO / Validation
  +-- Project Model

## Próxima evolução recomendada

- PostgreSQL
- Spring Data JPA
- Flyway
- Persistência real dos projetos
- Envio de e-mail no formulário
- Download de currículo
- Autenticação para painel administrativo
- CRUD dos projetos
- Docker Compose
- Deploy frontend + backend
