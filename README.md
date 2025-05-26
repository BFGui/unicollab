# unicollab

Projeto de colaboração com Next.js, PostgreSQL e Docker.

## Sumário

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Comandos Principais](#comandos-principais)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API](#api)
- [Migrations](#migrations)

## Visão Geral

Este projeto utiliza Next.js para o frontend/backend, PostgreSQL como banco de dados e Docker para orquestração dos serviços. Inclui suporte a migrações de banco e testes automatizados.

## Requisitos

- Node.js (versão definida em [.nvmrc](.nvmrc))
- Docker e Docker Compose
- PostgreSQL (via Docker)

## Configuração do Ambiente

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Configure o arquivo `.env` com base no `.env.example`.
3. Inicie os serviços com Docker Compose:
   ```sh
   docker-compose up -d
   ```
4. Acesse o aplicativo em `http://localhost:3000`.

## Comandos Principais

- Para rodar o projeto em modo de desenvolvimento:
  ```sh
  npm run dev
  ```
- Para criar uma nova migração:
  ```sh
  npm run migrate:create -- nome_da_migracao
  ```
- Para rodar as migrações:
  ```sh
  npm run migrate:up
  ```
- Para reverter a última migração:
  ```sh
  npm run migrate:down
  ```
- Para rodar os testes:
  ```sh
  npm test
  ```

## Testes

Os testes estão configurados para rodar com Jest. Para adicionar um novo teste, crie um arquivo `.test.js` na mesma pasta do arquivo que deseja testar.

## Estrutura do Projeto

- `pages/`: Contém as páginas do Next.js.
- `components/`: Componentes reutilizáveis da interface.
- `lib/`: Funções e configurações de biblioteca, como conexão com o banco de dados.
- `migrations/`: Scripts de migração do banco de dados.

## API

A API está integrada às rotas do Next.js, utilizando o sistema de arquivos para definir os endpoints. Veja a pasta `pages/api` para mais detalhes.

## Migrations

As migrações são gerenciadas pelo pacote `pg-migrate`. Consulte a documentação para mais informações sobre como criar e aplicar migrações.
