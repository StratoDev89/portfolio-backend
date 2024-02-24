import { DataSource } from "typeorm";
import { envs } from "../../config";
import { SqlProjectEntity } from "./entities/project.entity";
import { SqlUserEntity } from "./entities/user.entity";
import { SqlCertificationEntity } from "./entities/certification.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: envs.MYSQL_HOST,
  username: envs.MYSQL_USERNAME,
  password: envs.MYSQL_PASSWORD,
  port: envs.MYSQL_PORT,
  database: envs.MYSQL_DATABASE,
  entities: [SqlProjectEntity, SqlUserEntity, SqlCertificationEntity],
  synchronize: true,
  // migrationsRun: true,
  // migrations: [__dirname + "../../../migrations/*{.ts,.js}"],
});

export class SqlDatabaseConnection {
  static async connect() {
    try {
      await AppDataSource.initialize();
      console.log("*** MYSQL_DB CONNECTED ***");
    } catch (error) {
      console.log({ error });
    }
  }

  static async disconnect() {
    await AppDataSource.destroy();
    console.log("*** MYSQL_DB DISCONNECTED ***");
  }
}
