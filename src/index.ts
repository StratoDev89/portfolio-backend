import { envs } from "./config/envs";
import { MongoConnection } from "./data/mongo/connection";
import { AppRoutes, Server } from "./presentation";

(async () => {
  main();
})();

async function main() {
  await MongoConnection.connect({
    mongoURL: envs.DB_URL,
    dbName: envs.DB_NAME,
  });

  const server = new Server({
    port: envs.PORT || 3000,
    routes: AppRoutes.routes,
  });

  server.start();
}
