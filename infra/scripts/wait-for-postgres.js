const { exec } = require("node:child_process");
const { stdout } = require("node:process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isredy --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n 🟢 Postgres aceitando conexões! \n");
  }
}

process.stdout.write("\n\n 🔴 Aguardando Postgres aceitar conexões");
checkPostgres();
