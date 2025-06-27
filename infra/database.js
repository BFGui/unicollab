import { Client } from "pg";

/**
 * Executa uma query no banco de dados PostgreSQL.
 * Esta função obtém um novo cliente, executa a query e depois fecha a conexão.
 *
 * @param {object | string} queryObject - O objeto de query (com text e values) ou uma string de query.
 * @returns {Promise<object>} O resultado da query.
 * @throws {Error} Relança qualquer erro ocorrido durante a conexão ou execução da query.
 */
async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.log("\n Error dentro do catch do database.js:");
    console.error(error);
    throw error;
  } finally {
    // Garante que o cliente seja fechado mesmo se ocorrer um erro.
    await client?.end();
  }
}

/**
 * Cria e conecta um novo cliente PostgreSQL.
 * As configurações de conexão são obtidas de variáveis de ambiente.
 *
 * @returns {Promise<Client>} Uma instância do cliente PostgreSQL conectado.
 * @throws {Error} Relança qualquer erro ocorrido durante a tentativa de conexão.
 */
async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValue(),
  });

  await client.connect();
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;

function getSSLValue() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
