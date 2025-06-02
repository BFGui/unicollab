import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000, // Refresh every 2 seconds
  });

  let UpdatedAt = "Carregando...";

  if (!isLoading && data) {
    UpdatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Ultima atualização: {UpdatedAt}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000, // Refresh every 2 seconds
  });

  let databaseStatus = "Carregando...";

  if (!isLoading && data) {
    databaseStatus = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Máximo de conexões: {data.dependencies.database.max_connections}
        </div>
        <div>
          Conexões abertas: {data.dependencies.database.opened_connections}
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h2>Status do Banco de Dados</h2>
      </div>
      <div>{databaseStatus}</div>
    </>
  );
}
