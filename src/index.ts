import { envs } from "./config/envs";
import { seed } from "./data/mongo";
// import { MongoConnection, seed } from "./data/mongo";
import { SqlDatabaseConnection } from "./data/mysql";
import { AppRoutes, Server } from "./presentation";

(async () => {
  main();
})();

async function main() {
  await seed();

  // CONNECTION FOR MONGO DATABASE
  // await MongoConnection.connect({
  //   mongoURL: envs.DB_URL,
  //   dbName: envs.DB_NAME,
  // });

  // CONNECTION FOR SQL DATABASE

  await SqlDatabaseConnection.connect();

  const server = new Server({
    port: envs.PORT || 3000,
    routes: AppRoutes.routes,
  });

  server.start();
}
