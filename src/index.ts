import { envs } from "./config/envs";
import { MongoConnection, seed } from "./data/mongo";
import { AppRoutes, Server } from "./presentation";

(async () => {
  main();
})();

async function main() {
  await seed();

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
