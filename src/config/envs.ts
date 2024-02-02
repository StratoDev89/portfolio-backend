import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").asPortNumber(),
  DB_URL: get("DB_URL").required().asString(),
  DB_NAME: get("DB_NAME").required().asString(),
  ADMIN_PASSWORD: get("ADMIN_PASSWORD").required().asString(),
  HOST: get("HOST").required().asString(),
  CLOUD_NAME: get("CLOUD_NAME").required().asString(),
  CLOUD_API_KEY: get("CLOUD_API_KEY").required().asString(),
  CLOUD_API_SECRET: get("CLOUD_API_SECRET").required().asString(),
};
