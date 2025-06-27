# unicollab 🚀

[![Status do Workflow de Linting](https://github.com/BFGui/unicollab/actions/workflows/linting.yaml/badge.svg)](https://github.com/BFGui/unicollab/actions/workflows/linting.yaml)
[![Status do Workflow de Teste](https://github.com/BFGui/unicollab/actions/workflows/test.yaml/badge.svg)](https://github.com/BFGui/unicollab/actions/workflows/test.yaml)
[![Licença: MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js: LTS Hydrogen (v18)](https://img.shields.io/badge/Node.js-LTS%20Hydrogen%20(v18)-blue.svg)](https://nodejs.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Prettier](https://img.shields.io/badge/code_style-Prettier-ff69b4.svg)](https://prettier.io)
[![ESLint](https://img.shields.io/badge/linting-ESLint-4B32C3.svg)](https://eslint.org)

Projeto de colaboração com Next.js, PostgreSQL e Docker, focado em boas práticas de desenvolvimento e automação. ✨

## 📜 Sumário

- [✨ Visão Geral](#-visão-geral)
- [📋 Requisitos](#-requisitos)
- [🚀 Configuração do Ambiente](#-configuração-do-ambiente)
- [⚙️ Comandos Principais](#️-comandos-principais)
- [🧪 Testes](#-testes)
- [🏗️ Estrutura do Projeto](#️-estrutura-do-projeto)
- [📡 API](#-api)
- [🔄 Migrations](#-migrations)
- [🐳 Docker](#-docker)

## ✨ Visão Geral

Este projeto utiliza Next.js para o frontend e backend (API), PostgreSQL como banco de dados e Docker para orquestração de serviços de desenvolvimento. Inclui suporte a migrações de banco de dados e testes automatizados para garantir a qualidade e a evolução contínua do sistema.

## 📋 Requisitos

- Node.js (versão definida em [.nvmrc](.nvmrc))
- Docker e Docker Compose
- PostgreSQL (via Docker)

## 🚀 Configuração do Ambiente

1.  **Instale as dependências:**
    ```sh
    npm install
    ```
2.  **Configure o arquivo `.env`:**
    Copie o arquivo `.env.example` (se existir) para `.env` e preencha as variáveis de ambiente necessárias.
    ```sh
    cp .env.example .env
    ```
3.  **Inicie os serviços com Docker Compose:**
    Isso geralmente inclui o banco de dados PostgreSQL.
    ```sh
    docker-compose -f infra/compose.yaml up -d
    ```
    *(Verifique o `package.json` por scripts como `npm run services:up` que podem simplificar este comando)*
4.  **Acesse o aplicativo:**
    Após iniciar o servidor de desenvolvimento (`npm run dev`), acesse `http://localhost:3000`.

## ⚙️ Comandos Principais

-   **Rodar em modo de desenvolvimento:**
    ```sh
    npm run dev
    ```
-   **Criar uma nova migração:**
    ```sh
    npm run migrate:create -- nome_da_migracao
    ```
-   **Rodar as migrações:**
    ```sh
    npm run migrate:up
    ```
-   **Reverter a última migração:**
    ```sh
    npm run migrate:down
    ```
-   **Rodar os testes:**
    ```sh
    npm test
    ```

## 🧪 Testes

Os testes são implementados com Jest e estão localizados principalmente na pasta `tests/`. O projeto inclui testes de integração para a API.

-   **Para executar todos os testes:**
    ```sh
    npm test
    ```
-   **Para adicionar um novo teste:**
    Crie um arquivo com sufixo `.test.js` ou `.spec.js`, preferencialmente próximo ao módulo que está sendo testado ou dentro da estrutura de pastas em `tests/`.

## 🏗️ Estrutura do Projeto

A estrutura de pastas principal do projeto é:

-   📁 **`pages/`**: Contém as páginas da aplicação Next.js e os endpoints da API.
    -   📁 **`pages/api/`**: Arquivos aqui definem as rotas da API (ex: `pages/api/v1/status/index.js` corresponde a `/api/v1/status`).
-   📁 **`infra/`**: Contém arquivos relacionados à infraestrutura do projeto.
    -   📄 **`infra/compose.yaml`**: Arquivo Docker Compose para configurar serviços (ex: PostgreSQL).
    -   📄 **`infra/database.js`**: Módulo para interagir com o banco de dados.
    -   📁 **`infra/migrations/`**: Scripts de migração do banco de dados (`node-pg-migrate`).
    -   📁 **`infra/scripts/`**: Scripts auxiliares (ex: `wait-for-postgres.js`).
-   📁 **`tests/`**: Arquivos de teste automatizados (Jest).
    -   📁 **`tests/integration/`**: Testes de integração da API.
    -   📄 **`tests/orchestrator.js`**: Script auxiliar para o ambiente de teste.
-   📁 **`.github/`**: Configurações do GitHub Actions (workflows de CI/CD).
-   📁 **`public/`**: Arquivos estáticos servidos publicamente.
-   📄 **Outros arquivos de configuração**: `.eslintrc.json`, `eslint.config.mjs`, `prettier.config.js`, `commitlint.config.js`, `jest.config.js`, etc.

## 📡 API

A API é construída utilizando o sistema de roteamento baseado em arquivos do Next.js, localizado em `pages/api/`.

**Exemplo de Endpoint (`GET /api/v1/status`):**
O arquivo `pages/api/v1/status/index.js` implementa este endpoint.
```javascript
// pages/api/v1/status/index.js
import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  // ... lógica para buscar dados do banco ...
  response.status(200).json({ updated_at: updatedAt, /* ... outros dados ... */ });
}

export default status;
```
ℹ️ _Recomenda-se seguir os padrões RESTful ao criar novos endpoints._

## 🔄 Migrations

As migrações de banco de dados são gerenciadas pela biblioteca `node-pg-migrate`.

-   **Criar migração:** `npm run migrate:create -- nome_da_migracao`
-   **Aplicar migrações:** `npm run migrate:up`
-   **Reverter última migração:** `npm run migrate:down`

⚠️ _Os endpoints `GET /api/v1/migrations` e `POST /api/v1/migrations` existem mas devem ser usados com cautela e protegidos em produção._

## 🐳 Docker

O projeto utiliza Docker para o ambiente de desenvolvimento, principalmente para o PostgreSQL.

-   **Configuração:** `infra/compose.yaml`
-   **Iniciar container:** `docker-compose -f infra/compose.yaml up -d` (ou via script npm)

💡 **Considerações para Produção:**
O setup atual é para desenvolvimento. Para produção:
1.  Crie um `Dockerfile` para a aplicação Next.js.
2.  Adapte o Docker Compose para incluir a aplicação e configurar volumes para persistência de dados do PostgreSQL.
