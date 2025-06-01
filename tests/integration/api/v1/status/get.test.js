import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody.updated_at).toBeDefined();

      const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdateAt);

      //teste da versão do DB
      expect(responseBody.dependencies.database.version).toEqual("16.0");

      //teste de conexões
      expect(responseBody.dependencies.database.max_connections).toEqual(100);

      //teste de conexões abertas
      expect(responseBody.dependencies.database.opened_connections).toEqual(1);
    });
  });
});
