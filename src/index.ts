import { envs } from "./config/envs";
import { SqlDatabaseConnection, seed } from "./data";
import { AppRoutes, Server } from "./presentation";

(async () => {
  main();
})();

async function main() {
  await seed();

  // CONNECTION FOR SQL DATABASE
  await SqlDatabaseConnection.connect();

  const server = new Server({
    port: envs.PORT || 3000,
    routes: AppRoutes.routes,
  });

  server.start();
}
