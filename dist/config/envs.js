"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)("PORT").asPortNumber(),
    DB_URL: (0, env_var_1.get)("DB_URL").required().asString(),
    DB_NAME: (0, env_var_1.get)("DB_NAME").required().asString(),
    ADMIN_PASSWORD: (0, env_var_1.get)("ADMIN_PASSWORD").required().asString(),
    HOST: (0, env_var_1.get)("HOST").required().asString(),
};
