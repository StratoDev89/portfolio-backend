import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").asPortNumber(),
  DB_URL: get("DB_URL").required().asString(),
  DB_NAME: get("DB_NAME").required().asString(),
  ADMIN_PASSWORD: get("ADMIN_PASSWORD").required().asString(),
  HOST: get("HOST").required().asString(),
};
