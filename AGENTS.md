# Diretrizes para Agentes de IA (Jules)

Bem-vindo ao projeto Unicollab! Este arquivo fornece algumas diretrizes para ajudá-lo a colaborar efetivamente com este codebase.

## Contexto do Projeto

*   **Propósito:** Unicollab é um projeto de colaboração construído com Next.js (React) para o frontend e backend (API), PostgreSQL como banco de dados e Docker para orquestração de serviços de desenvolvimento.
*   **README:** Para uma visão geral completa do projeto, requisitos, configuração e comandos principais, por favor, consulte o arquivo [README.md](README.md). É crucial que você o leia antes de começar qualquer tarefa.

## Padrões de Codificação e Qualidade

*   **Linting e Formatação:** O projeto utiliza ESLint e Prettier para manter a consistência e a qualidade do código.
    *   As configurações do ESLint podem ser encontradas em `.eslintrc.json` e/ou `eslint.config.mjs`.
    *   Certifique-se de que seu código esteja em conformidade com essas regras. Você pode tentar rodar `npm run lint` ou `npm run format` (se disponíveis nos scripts do `package.json`) para verificar e corrigir problemas.
*   **Estilo de Código:** Siga o estilo de código existente. Mantenha a clareza, a legibilidade e adicione comentários quando a lógica não for óbvia.
*   **Testes:**
    *   Os testes são escritos com Jest e estão localizados na pasta `tests/`.
    *   Para rodar os testes, use o comando: `npm test`.
    *   Ao implementar novas funcionalidades ou corrigir bugs, por favor, adicione ou atualize os testes correspondentes. Testes de integração para endpoints da API são particularmente importantes.
*   **Mensagens de Commit:**
    *   O projeto utiliza Conventional Commits. Certifique-se de que suas mensagens de commit sigam este padrão (ex: `feat: adiciona nova funcionalidade X`, `fix: corrige bug Y na funcionalidade Z`).
    *   O Commitlint está configurado para ajudar a impor esse padrão.

## Interagindo com o Código

*   **Estrutura do Projeto:** Familiarize-se com a estrutura do projeto detalhada no `README.md`, especialmente as pastas `pages/` (para frontend e API), `infra/` (para configurações de banco de dados, Docker e migrações) e `tests/`.
*   **Migrações de Banco de Dados:**
    *   As migrações são gerenciadas por `node-pg-migrate` e os scripts estão em `infra/migrations/`.
    *   Comandos: `npm run migrate:create -- nome_da_migracao`, `npm run migrate:up`, `npm run migrate:down`.
*   **Variáveis de Ambiente:** O projeto utiliza variáveis de ambiente para configuração (ex: conexão com o banco de dados). Um arquivo `.env.development` (ou similar, baseado no `.env.example`) é esperado. Não faça commit de arquivos `.env` contendo segredos.

## Ao Pedir Ajuda ou Feedback

*   Seja específico sobre o problema que você está tentando resolver ou a tarefa que está realizando.
*   Forneça links para os arquivos relevantes que você está modificando ou analisando.
*   Se você encontrar erros, forneça o log de erro completo.

Obrigado por sua colaboração!
