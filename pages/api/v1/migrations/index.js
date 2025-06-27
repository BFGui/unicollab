// pages/api/v1/migrations/index.js
// Este endpoint gerencia as migrações do banco de dados.
// Suporta o método GET para listar migrações pendentes (dry run)
// e o método POST para aplicar as migrações pendentes.

import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

/**
 * Handler para os endpoints GET e POST /api/v1/migrations.
 * GET: Lista as migrações pendentes (dry run).
 * POST: Executa as migrações pendentes.
 *
 * @param {object} request - O objeto de requisição do Next.js.
 * @param {object} response - O objeto de resposta do Next.js.
 */
export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigrationsOptions = {
      dbClient: dbClient,
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
      await dbClient.end();
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      });

      await dbClient.end();

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
