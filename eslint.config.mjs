import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Configuração combinada para arquivos JS/JSX
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],

    // Começa com as regras recomendadas de JavaScript do ESLint
    // Isso substitui o antigo `plugins: { js }` e `extends: ["js/recommended"]`
    ...js.configs.recommended,

    // Adiciona as configurações recomendadas do plugin React
    // Isso inclui regras e configurações do parser para React/JSX
    ...pluginReact.configs.flat.recommended,

    // Define as opções de linguagem
    languageOptions: {
      globals: {
        ...globals.browser, // Habilita variáveis globais do navegador (window, document, etc.)
        // Você pode querer adicionar outros globais se necessário, ex: globals.node para projetos Node.js
      },
      // `ecmaVersion` e `sourceType` são frequentemente tratados por `js.configs.recommended`
      // e `pluginReact.configs.flat.recommended`, mas você pode especificá-los se necessário:
      // ecmaVersion: 'latest', // Ou um ano específico como 2022
      // sourceType: 'module', // Se você estiver usando módulos ES
    },

    // Você pode adicionar ou sobrescrever regras específicas aqui:
    // rules: {
    //   "react/react-in-jsx-scope": "off", // Exemplo: Não é necessário com a nova transformação JSX
    //   "no-unused-vars": "warn", // Exemplo: Avisar sobre variáveis não utilizadas
    //   "indent": ["error", 2], // Exemplo: Forçar indentação de 2 espaços
    //   // Adicione quaisquer outras sobrescritas ou adições de regras
    // },

    // Configurações para plugins também podem ser definidas aqui se necessário,
    // embora `pluginReact.configs.flat.recommended` geralmente lide com as configurações do React.
    // settings: {
    //   react: {
    //     version: "detect", // Detecta automaticamente a versão do React
    //   },
    // },
  },

  // Você pode adicionar mais objetos de configuração se tiver necessidades específicas
  // para diferentes conjuntos de arquivos (ex: arquivos de teste, arquivos de configuração).
  // Exemplo para arquivos de teste:
  // {
  //   files: ["**/*.test.{js,jsx}", "**/*.spec.{js,jsx}"],
  //   languageOptions: {
  //     globals: {
  //       ...globals.browser,
  //       ...globals.jest, // Ou globals.mocha, etc.
  //     }
  //   },
  //   rules: {
  //     // Regras específicas para arquivos de teste
  //   }
  // }
]);
