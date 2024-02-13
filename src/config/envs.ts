import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").asPortNumber(),
  DB_URL: get("DB_URL").required().asString(),
  DB_NAME: get("DB_NAME").required().asString(),
  BACKEND_HOST: get("BACKEND_HOST").required().asString(),
  FRONTEND_HOST: get("FRONTEND_HOST").required().asString(),
  CLOUD_NAME: get("CLOUD_NAME").required().asString(),
  CLOUD_API_KEY: get("CLOUD_API_KEY").required().asString(),
  CLOUD_API_SECRET: get("CLOUD_API_SECRET").required().asString(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  CLIENT_EMAIL: get("CLIENT_EMAIL").required().asString(),
  JWT_SECRET_KEY: get("JWT_SECRET_KEY").required().asString(),
};
